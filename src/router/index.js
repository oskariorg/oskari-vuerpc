import { createRouter, createWebHashHistory } from 'vue-router';

import routesHelper from './routesHelper';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: routesHelper.getRoutes()
});

export default router;
