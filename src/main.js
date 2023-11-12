import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vuetify from 'vuetify';
import pt from 'vuetify/lib/locale/pt';
import { vaccineApi, patientApi, managerApi } from './config/api';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import axios from 'axios';

const vuetify = new Vuetify({
  lang: {
    locales: { pt },
    current: 'pt',
  },
});

Vue.use(VueSweetalert2);
Vue.use(Vuetify)
Vue.prototype.$axios = axios;
Vue.prototype.$api = {
  vaccine: vaccineApi,
  patient: patientApi,
  manager: managerApi,
};
Vue.prototype.$eventBus = new Vue();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
