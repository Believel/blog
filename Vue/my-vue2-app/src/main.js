import Vue from 'vue'
import App from './App'
import router from './router'
import './utils/eventBus'

Vue.config.productionTip = false

// Vue 框架的入口就是Vue实例
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

// const vm = new Vue({
//   data: {
//     a: 1,
//     b: 2,
//     c: 3
//   },
//   watch: {
//     a: function(val, oldVal) {
//       console.log('new:s%,old:s%', val, oldVal)
//     },
//     // 深度 watcher
//     c: {
//       handler: function(val, oldVal) {
//         console.log('val,oldval', val, oldVal)
//       },
//       deep: true
//     }
//   }
// })
// vm.a = 2 // new:s%,old:s% 2 1
// vm.c = 6 // val,oldval 6 3
