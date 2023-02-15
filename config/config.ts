import { defineConfig } from '@umijs/max';

import routes from './routes';

// 默认全局配置
export default defineConfig({
  // 使用antd
  antd: {},
  // 使用权限控制
  access: {},
  // 使用model管理全局状态
  model: {},
  // 使用全局出事状态
  initialState: {},
  // 使用内置的umi-request请求方案
  request: {},
  // 减小moment尺寸
  ignoreMomentLocale: true,
  favicons: ['https://cdn.is.motion.abb.com.cn/public/favicon.ico'],
  // 使用hash路由
  hash: true,
  routes,
  // 使用yarn的包管理方式
  npmClient: 'yarn',
});

