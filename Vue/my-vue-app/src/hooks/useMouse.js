import { ref, onMounted, onUnmounted } from 'vue'
// 组合式函数是一个利用Vue组合式API来封装和复用有状态逻辑的函数。
// 按照惯例，组合式函数名以 ”use“ 开头
// 鼠标跟踪功能
export function useMouse() {
  // 被组合式函数封装和管理的状态
  const x = ref(0)
  const y = ref(0)
  // 组合式函数可以随时更改其状态
  function update(e) {
    x.value = e.pageX
    y.value = e.pageY
  }
  // 一个组合式函数也可以挂靠在所属组件的生命周期上
  // 来启动和卸载副作用
  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove'), update)
  // 通过返回值暴露所管理的状态
  return { x, y }
}