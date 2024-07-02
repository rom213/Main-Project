import { createRouter, createWebHashHistory } from 'vue-router';
import Body from '../components/body/Body.vue';
import Statistics from '../components/statistics/Statistics.vue';

const routes = [
  { path: '/projects', component: Body },
  { path: '/', component: Statistics }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
