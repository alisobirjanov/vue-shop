import { createRouter, createWebHistory } from 'vue-router'


export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('~/pages/Home.vue')
    },
    {
      path: '/cart',
      component: () => import('~/pages/Cart.vue')
    }
  ]
})