import axios from 'axios';
import { values } from 'lodash';
import qs from 'qs';
import { notification } from 'antd';

export const controller = new AbortController();
const service = axios.create({
    baseURL: BASE_URL,
    timeout: 60000,
    withCredentials: false,
    header: {
        'Content-Type': 'application/json;charset=UTF-8',
    },
});

// 保存有哪些正在请求的
const pendingRequest = new Map();
const addPendingRequest = (config) => {
    const requestKey = generateReqKey(config);
    config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
        if (!pendingRequest.has(requestKey)) {
            pendingRequest.set(requestKey, cancel)
        }
    });
}

// 停止请求的
const removePendingRequest = (config) => {
    const requestKey = generateReqKey(config);
    if (pendingRequest.has(requestKey)) {
        const cancelToken = pendingRequest.get(requestKey);
        cancelToken(requestKey);
        pendingRequest.delete(requestKey);
    }
};

// 停止所有正在请求的
export const removeAllPendingRequest = () => {
    if (pendingRequest.size > 0) {
        [...pendingRequest.keys()].forEach(requestKey => {
            const cancelToken = pendingRequest.get(requestKey);
            cancelToken(requestKey);
        });
        pendingRequest.clear();
    }
};

// 生成正在请求的数据
function generateReqKey(config) {
    const { method, url, params, data } = config;
    return [method, url, qs.stringify(params), qs.stringify(data)].join('&')
};

export const responseError = (error) => {
    removePendingRequest(error.config || {}); // 从 pendingRequest对象中移除请求
    let errorText = error?.response?.data?.message || values(error?.response?.data?.errors).join(' \n ');

    switch (error?.response?.status) {
        case 400:
            notification.error({
                description: errorText,
                placement: 'topRight',
            });
            break;
        case 403:
        case 401:
            notification.error({
                description: 'TOKEN失效，请重新登陆',
                placement: 'topRight',
            });

            removeAllPendingRequest();
            setTimeout(() => {
                window.location.href = "/#/login";
                // removeLocalStroage();
            }, 300)
            break;
        case 404:
            break
        case 500:
            notification.error({
                description: error?.response?.data?.message || error?.messages || '服务器错误',
                placement: 'topRight',
            });
            break;
        default:
    }

    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
        notification.error({
            description: error?.response?.data?.message || error.message || "请求超时",
            placement: 'topRight',
        });
    }

    return { isSuccess: false, data: null };
}

// 请求拦截器
service.interceptors.request.use((config) => {

    if (config.mock) {
        config.baseURL = ''
    }

    config.signal = controller.signal;
    removePendingRequest(config); // 检查是否存在重复请求
    addPendingRequest(config); // 将当前请求信息添加到 pendingRequest对象中
    return config;
}, error => {
    return null;
});

// 响应拦截器
service.interceptors.response.use(response => {
    if (200 <= response.data.code && response.data.code <= 304) {
        return response.data;
    }

    // 删除重复请求
    removePendingRequest(response.config);
    return { isSuccess: true, data: response.data }
}, responseError);

export default service;