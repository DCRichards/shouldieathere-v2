import Vue from 'vue';
import VueGtag from 'vue-gtag';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './strings';
import env, { NODE_ENV } from './lib/env';
import './registerServiceWorker';

Vue.config.productionTip = false;

if (NODE_ENV === 'production') {
  const id = env('GTAG_ID');
  Vue.use(VueGtag, { config: { id } }, router);
}

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
