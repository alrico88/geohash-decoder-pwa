import Vue from 'vue';
import VueRouter from 'vue-router';
import Decode from '../views/Decode.vue';
import Encode from '../views/Encode.vue';
import Position from '../views/Position.vue';
import Options from '../views/Options.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Decode',
    component: Decode,
  },
  {
    path: '/encode',
    name: 'Encode',
    component: Encode,
  },
  {
    path: '/position',
    name: 'Position',
    component: Position,
  },
  {
    path: '/options',
    name: 'Options',
    component: Options,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
