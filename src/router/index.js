import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import(/* webpackChunkName: "about" */ '@/views/Search.vue'),
    },
    {
      path: '*',
      component: () => import(/* webpackChunkName: "notfound" */ '@/views/NotFound.vue'),
    },
  ],
});
