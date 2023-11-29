import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../views/HomePage.vue'
import SemestrePage from '../views/SemestrePage.vue'
import  UnitePage from '../views/UnitePage.vue'
import MatierePage from '../views/MatierePage.vue'
import EtudiantPage from '../views/EtudiantPage.vue'

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
  },
  {
    path: '/unite',
    component: UnitePage
  },
  {
    path: '/matiere',
    component: MatierePage
  },
  {
    path: '/etudiant',
    component: EtudiantPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
