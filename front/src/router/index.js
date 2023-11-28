import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../views/HomePage.vue'
import SemestrePage from '../views/SemestrePage.vue'

const routes= [
  {
    path: '/',
    redirect: '/semestre'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/semestre',
    component: SemestrePage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
