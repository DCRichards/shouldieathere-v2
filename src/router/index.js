import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/Search.vue'),
    },
    {
      path: '/places/search',
      component: () => import('@/views/Places.vue'),
    },
    {
      path: '/places/:id',
      component: () => import('@/views/Place.vue'),
    },
    {
      path: '*',
      component: () => import('@/views/NotFound.vue'),
    },
  ],
});
