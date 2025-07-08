import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Components from '../views/Components.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/components',
    name: 'Components',
    component: Components
  },
  // Redirect any unmatched routes to home
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
