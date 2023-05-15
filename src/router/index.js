import { createRouter, createWebHistory } from 'vue-router'

import routesHelper from './routesHelper';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routesHelper.getRoutes()
});

export default router;
