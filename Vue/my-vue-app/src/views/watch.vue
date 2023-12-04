<script>
import { ref, reactive, toRefs, watch, watchEffect } from 'vue';
export default {
  name: 'Watch',
  methods: {
    changeNumber() {
      console.log()
      // this.numberRef = 200
      this.age = 20
    }
  },
  setup() {
    const numberRef = ref(100)
    const state = reactive({
      name: '张三',
      age: 18
    })

    watch(numberRef, (newNumber, oldNumber) => {
      console.log('watch', newNumber, oldNumber)
    })

    watch(() => state.age, (newState, oldState) => {
      console.log('watch', newState, oldState)
    }, {
      // 立即监听
      immediate: true,
      // 深度监听
      deep: true
    })

    watchEffect(() => {
      // 初始化时，一定会执行一次（收集要监听的数据）
      console.log('watch effect', state.age)
    })
    return {
      numberRef,
      ...toRefs(state)
    }
  }
}
</script>

<template>
  <p>watch vs watchEffect</p>
  <p>{{ numberRef }}</p>
  <p>{{ name }} - {{ age }}</p>
  <button @click="changeNumber">changeNumber</button>
</template>