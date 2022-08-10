import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 从一个单文件组件中导入根组件
import App from './App.vue'
import store from './store'
import router from './route'
import i18n from './plugins/i18n'
const pinia = createPinia()
// 创建一个 Vue 应用
const app = createApp(App)
// 应用实例提供一些来注册应用范围内可用的资源：

// 注册组件
// app.component('ComponentName', Component)

// 注册指令
// app.directive('directiveName', Directive)

// 注册插件
app.use(i18n, {
    greetings: {
        hello: 'Bonjour'
    }
})

// 将 store 实例作为插件安装
app.use(store)
// 整个应用支持路由
app.use(router)
// 安装 element-plus
app.use(ElementPlus)

app.use(pinia)
// 挂载 App 组件 , 返回的是根组件实例而不是应用实例
app.mount('#app')
