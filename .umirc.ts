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
          path: '/interview/js',
          component: '@/pages/interview/js',
          title: 'js',
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
    `var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?4c40c350e6d0425682fcf476c87420aa";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();
    `,
    `(function(w,d, s, id) {if(typeof(w.webpushr)!=='undefined') return;w.webpushr=w.webpushr||function(){(w.webpushr.q=w.webpushr.q||[]).push(arguments)};var js, fjs = d.getElementsByTagName(s)[0];js = d.createElement(s); js.id = id;js.async=1;js.src = "https://cdn.webpushr.com/app.min.js";fjs.parentNode.appendChild(js);}(window,document, 'script', 'webpushr-jssdk'));webpushr('setup',{'key':'BEJSa49SBup-IRajqn26cRXHNLoC73BmRMLUMarxl9bk8PwEAi76jkN2oq3dC936G2zvGFfHUqYxzSSy1Wzj9W8' });`,
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
  hash: true,
});
