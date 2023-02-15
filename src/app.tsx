// import { RequestConfig } from '@umijs/max';
import { IBestAFSRoute } from '../config/routes';
import { getRoues, MenusDIC } from '@/utils';
import { authorityDIC } from '@/constants';
// import http from '@/utils/http';
// 模拟后台异步延迟接口
const testPromise = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // return resolve(Math.floor(Math.random() * 3 + 1));
      return resolve(3)
    }, 200)
  })
}

// 初始化状态管理 可用于储存用户数据
export type InitialState = {
  name: string;
  role: number;
  menusDIC: MenusDIC;
  menuData: IBestAFSRoute[];
}

// 全局初始化状态管理
export async function getInitialState(): Promise<InitialState> {
  // 获取权限信息 和 用户信息
  const res = await testPromise();

  // 获得扁平化的route数据
  const menusDIC = {};
  // 获取 不需要隐藏的route
  const menuData = getRoues(authorityDIC[res] || [], menusDIC);

  return {
    name: '@umijs/max',
    role: res as number,
    menusDIC,
    menuData,
  };
}

// 请求
// export const request: RequestConfig = http;