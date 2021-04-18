import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import VueClipboard from 'vue-clipboard2';
import Vant from 'vant';
import 'vant/lib/index.css';
import 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';

import './assets/main.scss';

import store from './store';

Vue.use(Vant);
Vue.use(VueClipboard);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
