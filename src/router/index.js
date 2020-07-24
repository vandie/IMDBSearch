import Vue from 'vue';
import VueRouter from 'vue-router';
import Search from '../views/Search.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Search,
  },
  {
    path: '/movie/:id',
    name: 'Movie',
    component: () => import('../views/Movie.vue'),
  },
  {
    path: '/series/:id',
    name: 'Series',
    component: () => import('../views/Series.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
