import Vue from 'vue'
// 组件通信 (非父子组件)
const eventBus = {
  install (Vue, options) {
    const vue = new Vue({})
    Vue.prototype.$bus = vue
  }
}

Vue.use(eventBus)
