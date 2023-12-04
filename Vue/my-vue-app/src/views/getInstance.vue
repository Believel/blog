<script>
import { getCurrentInstance, onMounted } from 'vue';

export default {
  name: 'getinstance',
  data() {
    return {
      x: 1,
      y: 2
    }
  },
  setup() {
    onMounted(() => {
      // setup中获取组件实例
      const instance = getCurrentInstance()

      console.log(instance.data.x)
    })
  }
}
</script>

<template>

</template>