import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/lobby',
    name: 'lobby',
    component: () => import('../views/Lobby')
  },
  {
    path: '/game',
    name: 'game',
    component: () => import('../views/Game')
  },
  {
    path: '/reward',
    name: 'reward',
    component: () => import('../views/Reward')
  },
  {
    path: '/room*',
    name: 'rooms',
    component: () => import('../views/Room')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === 'lobby' && !localStorage.username) {
    next({ name: 'home' })
  } else if (to.name === 'home' && localStorage.username) {
    next({ name: 'lobby' })
  } else if (to.name === 'game' && !localStorage.username) {
    next({ name: 'home' })
  } else if (to.name === 'reward' && !localStorage.username) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
