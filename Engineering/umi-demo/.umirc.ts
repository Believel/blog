import { defineConfig } from 'umi';

export default defineConfig({
  layout: {
    name: 'Ant Design',
    locale: true,
    layout: 'side'
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { exact: true, path: '/', component: '@/pages/index' },
    { exact: true, path: '/user', component: '@/pages/user' },
  ],
  fastRefresh: {},
});
