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
      props(route) {
        const { name, address } = route.query;
        let page = Number.parseInt(route.query.page, 10);
        if (Number.isNaN(page)) {
          page = 1;
        }
        return { name, address, page };
      },
    },
    {
      path: '/places/:id',
      component: () => import('@/views/Place.vue'),
    },
    {
      path: '/places/:id/report',
      component: () => import('@/views/Report.vue'),
    },
    {
      path: '*',
      component: () => import('@/views/NotFound.vue'),
    },
  ],
});
