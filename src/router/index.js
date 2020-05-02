import Vue from 'vue';
import VueRouter from 'vue-router';
import Decode from '../views/Decode.vue';
import Encode from '../views/Encode';
import Position from '../views/Position';

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
];

const router = new VueRouter({
  routes,
});

export default router;
