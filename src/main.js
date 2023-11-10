import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vuetify from 'vuetify';
import pt from 'vuetify/lib/locale/pt';
import { vaccineApi, patientApi, managerApi } from './config/api';
import axios from 'axios';

const vuetify = new Vuetify({
  lang: {
    locales: { pt },
    current: 'pt',
  },
});

Vue.use(Vuetify)
Vue.prototype.$axios = axios;
Vue.prototype.$api = {
  vaccine: vaccineApi,
  patient: patientApi,
  manager: managerApi,
};

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
