import { createRouter, createWebHashHistory } from 'vue-router'
import basePage from './views/basePage.vue'
import depthPage from './views/depthPage.vue'
import Animation from './components/Animation.vue'
import piniaPage from '@/views/piniaPage.vue'
import lifeCycle from '@/views/lifeCycle.vue'


const routes = [
  {
    path: '/',
    component: basePage
  },
  {
    path: '/depth',
    component: depthPage
  },
  {
    path: '/animation/:id',
    component: Animation
  },
  {
    path: '/pinia',
    component: piniaPage
  },
  {
    path: '/cycle',
    component: lifeCycle
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