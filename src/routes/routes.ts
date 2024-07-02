import { createRouter, createWebHashHistory } from 'vue-router';
import Body from '../components/Body.vue';
import Statistics from '../components/Statistics.vue';

const routes = [
  { path: '/', component: Body },
  { path: '/home', component: Statistics }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
