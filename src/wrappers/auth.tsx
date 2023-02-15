import { Navigate, Outlet, useLocation, useModel } from '@umijs/max'
import { removeAllPendingRequest } from '@/utils/http';

// 路由拦截
export default () => {
    const { initialState: { menusDIC, menuData } } = useModel('@@initialState');
    const { pathname } = useLocation();

    // 切换路由时 取消正在请求还没有返回的接口
    removeAllPendingRequest();

    // 如果是 / 重定向到 routes的第一个
    if (pathname === '/') {
        return <Navigate to={menuData[0]?.path || '/404'} />
    }

    // 当前menu数组中存在当前 url直接显示
    if (menusDIC[pathname]) {
        return <Outlet />;
    } else {
        // 不存在当前url 跳转到404页面
        return <Navigate to="/404" />;
    };
};