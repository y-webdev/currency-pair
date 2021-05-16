import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'BTC',
    props: {currency: 'BTC'},
    component: Home
  },
  {
    path: '/:currency',
    name: 'ETH',
    props: true,
    component: () => import('../components/Currencies.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
