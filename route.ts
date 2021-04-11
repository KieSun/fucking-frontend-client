const route: any[] = [
  {
    exact: true,
    path: '/engineered/monorepo',
    component: '@/pages/advance/article/monorepo',
    title: 'monorepo',
  },
  {
    exact: true,
    path: '/engineered/deploy',
    component: '@/pages/advance/article/deploy',
    title: '部署系统',
  },
  {
    exact: true,
    path: '/engineered/performanceTest',
    component: '@/pages/advance/article/performanceTest',
    title: '性能检测',
  },
  {
    exact: true,
    path: '/engineered',
    component: '@/pages/advance',
    title: '前端工程化',
  },
];

export default route;
