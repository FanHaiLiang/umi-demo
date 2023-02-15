import { defineConfig } from '@umijs/max';

// 生产环境 和 build打包环境会使用的配置
export default defineConfig({
    define: {
        BASE_URL: 'https://dev.clouddrives.abb.com.cn'
    }
});