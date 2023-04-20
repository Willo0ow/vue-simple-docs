import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/component/:name',
      name: 'ComponentDetails',
      component: () => import('../views/ComponentDetails.vue'),
      props: route => ({ prefix: route.query.prefix, name: route.params.name })
    }
  ]
})

export default router
