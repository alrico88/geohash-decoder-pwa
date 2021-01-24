import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import VueClipboard from 'vue-clipboard2';
import Vant from 'vant';
import 'vant/lib/index.css';
import 'leaflet';
import 'leaflet/dist/leaflet.css';
import './assets/main.scss';

// eslint-disable-next-line no-duplicate-imports
import {Icon} from 'leaflet';

import store from './store';

// eslint-disable-next-line prefer-reflect
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

Vue.use(Vant);
Vue.use(VueClipboard);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

document.addEventListener('touchmove', function (event) {
  if (event.scale !== 1) {
 event.preventDefault();
}
}, {passive: false});
