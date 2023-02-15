import { defineConfig } from '@umijs/max';

// dev测试会加载的配置
export default defineConfig({
    define: {
        BASE_URL: 'http://localhost:7001'
    }
});