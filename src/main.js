import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import strings from './strings';
import './registerServiceWorker';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  strings,
  render: (h) => h(App),
}).$mount('#app');
