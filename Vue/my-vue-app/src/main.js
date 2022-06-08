import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './route'
// 创建一个 Vue 应用
const app = createApp(App)
// app.component('ComponentName', Component)
// app.directive('directiveName', Directive)

// 将 store 实例作为插件安装
app.use(store)
// 整个应用支持路由
app.use(router)
// 挂载 App 组件 , 返回的是根组件实例
app.mount('#app')
