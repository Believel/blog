import VueRouter from 'vue-router'
import Home from './components/HelloWorld.vue'
import Animation from './components/Animation.vue'


const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/animation',
    component: Animation
  }
]


const router = new VueRouter.createRouter({
  history: new VueRouter.createWebHashHistory(),
  routes
})

export default router