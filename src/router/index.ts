import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Cytoscape from '@/views/cytoscape/Cytoscape.vue';
import Chart from '@/views/chart/Chart.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Chart',
    component: Chart,
  },
  {
    path: '/cytoscape',
    name: 'Cytoscape',
    component: () => import('@/views/cytoscape/Cytoscape.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
