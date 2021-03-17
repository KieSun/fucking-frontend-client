import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  proxy: {
    '/api': {
      target: 'https://api.jsgodroad.com',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
});
