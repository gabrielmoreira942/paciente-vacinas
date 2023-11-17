import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Main from '@/views/Main.vue'
import Patient from '../components/modules/patient/IndexPatient.vue'
import Show from "../components/modules/patient/ShowPatient.vue"
import Vaccine from '../components/modules/vaccine/IndexVaccine.vue'
import VaccineManager from '../components/modules/vaccine_manager/IndexManager.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Main,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: HomeView,
      },
    ]
  },
  {
    path: '/patients',
    component: Main,
    children: [
      {
        path: '',
        name: 'Consultar Pacientes',
        component: Patient,
      },
      {
        path: ':name',
        name: 'Visualizar Pacientes',
        component: Show,
      },
    ]
  },

  {
    path: '/vaccines',
    component: Main,
    children: [
      {
        path: '',
        name: 'Consultar Vacinas',
        component: Vaccine
      }
    ]
  },
  {
    path: '/vaccine_manager',
    component: Main,
    children: [
      {
        path: '',
        name: 'Administrar vacinação',
        component: VaccineManager
      }
    ]
  },
  {
    path: '/about',
    name: 'Sobre',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
