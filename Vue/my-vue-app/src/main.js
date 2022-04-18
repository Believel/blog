import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './route'

const app = createApp(App)
// 将 store 实例作为插件安装
app.use(store)
// 整个应用支持路由
app.use(router)
app.mount('#app')
