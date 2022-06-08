import { ref, onMounted, onUnmounted } from 'vue'

// 按照惯例，组合函数名以 ”use“ 开头
export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  function update(e) {
    x.value = e.pageX
    y.value = e.pageY
  }

  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove'), update)
  return { x, y }
}