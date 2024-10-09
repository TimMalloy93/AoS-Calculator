import { createRouter, createWebHashHistory } from 'vue-router'
import DamageCalcView from '../views/DamageCalcView.vue'
import AboutView from '../views/AboutView.vue'
import DiceRollerView from '../views/DiceRollerView.vue'

const routes = [
  {
    path: '/DamageCalculator',
    name: 'Damage Calculator',
    component: DamageCalcView
  },
  {
    path: '/DiceRoller',
    name: 'Dice Roller',
    component: DiceRollerView
  },
  {
    path: '/',
    name: 'about',
    component: AboutView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

export default router
