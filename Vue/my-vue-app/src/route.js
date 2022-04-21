import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './components/HelloWorld.vue'
import Animation from './components/Animation.vue'


const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/animation/:id',
    component: Animation
  }
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})
// 导航守卫
router.beforeEach((to, from) => {
  // console.log('to', to)
  // console.log('from', from)
})

export default router