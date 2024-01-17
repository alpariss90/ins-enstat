import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../views/HomePage.vue'
import SemestrePage from '../views/SemestrePage.vue'
import  UnitePage from '../views/UnitePage.vue'
import MatierePage from '../views/MatierePage.vue'
import EtudiantPage from '../views/EtudiantPage.vue'
import InscriptionPage from '../views/InscriptionPage.vue'
import NotePage from '../views/NotePage.vue'
import PivotPage from '../views/PivotPage.vue'

const routes= [
  {
    path: '/',
    redirect: '/etudiant'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/semestre',
    name: 'Semestre',
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
  },
  {
    path: '/inscription',
    component: InscriptionPage
  },
  {
    path: '/note',
    component: NotePage
  },
  {
    path: '/generate',
    component: PivotPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
