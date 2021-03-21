import { defineConfig } from 'umi';

export default defineConfig({
  title: '干爆前端',
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  routes: [
    {
      exact: false,
      path: '/',
      component: '@/layouts/index',
      routes: [
        { exact: true, path: '/', component: '@/pages/home', title: '首页' },
        {
          exact: true,
          path: '/interview',
          component: '@/pages/interview',
          title: '前端面试资料',
        },
        {
          exact: true,
          path: '/questions',
          component: '@/pages/questions',
          title: '每日一道大厂真题',
        },
        {
          exact: true,
          path: '/questions/detail',
          component: '@/pages/questions/detail',
        },
        { exact: true, path: '/author', component: '@/pages/author' },
      ],
    },
  ],
  proxy: {
    '/api': {
      target: 'https://api.jsgodroad.com',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  ssr: {},
  exportStatic: {},
  externals: {
    react: 'window.React',
    'react-dom': 'window.ReactDOM',
  },
  headScripts: [
    'https://gw.alipayobjects.com/os/lib/react/16.13.1/umd/react.production.min.js',
    'https://gw.alipayobjects.com/os/lib/react-dom/16.13.1/umd/react-dom.production.min.js',
    `https://www.googletagmanager.com/gtag/js?id=G-RCYB8E74BD`,
    `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-RCYB8E74BD');`,
  ],
  chainWebpack(config: any) {
    config.merge({
      optimization: {
        splitChunks: {
          chunks: 'all',
          automaticNameDelimiter: '.',
          name: true,
          minSize: 30000,
          minChunks: 1,
          cacheGroups: {
            vendors: {
              name: 'vendors',
              chunks: 'all',
              test: /[\\/]node_modules[\\/]/,
              priority: -12,
            },
          },
        },
      },
    });
  },
  chunks: ['vendors', 'umi'],
  favicon:
    'https://yck-1254263422.cos.ap-shanghai.myqcloud.com/2021/03/21/16163401406281.png',
});
