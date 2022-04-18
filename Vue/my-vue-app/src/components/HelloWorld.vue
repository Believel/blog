// setup 是一个属性标识，告诉Vue需要在编译时进行转换，来减少使用组合式API时的样板代码
<script setup>
import { onMounted, ref, unref, watchEffect, computed } from 'vue'
import { useMouse } from './useMouse'
import { mapState, useStore } from 'vuex'

import { vFocus }  from './directives'

const { x, y} = useMouse()
defineProps({
  msg: String
})
const rawHtml = `<span style="color: red">This should be red</span>`

const count = ref(0)
const show = ref(true)

const store = useStore()


// 生命周期钩子
onMounted(() => {
  console.log(`The initial count is ${count.value}`)
})

computed({
  ...mapState(['count1'])
})

const incrementA = () => {
  store.commit('increment')
}
</script>

<template>
  <h1>{{ msg }}</h1>
  <p>v-html:<span v-html="rawHtml"></span></p>
  <button type="button" @click="count++">count is: {{ count }}</button>
  <p>鼠标位置：{{x}}, {{y}}</p>
  <input v-focus/>
  <br/>
  <button @click="show = !show">切换动画</button>
  <transition>
    <p v-if="show">你好</p>
  </transition>
  <h4>store用法</h4>
  <p>{{store.state.count1}}</p>
  <button @click="incrementA">点击</button>
</template>

<style scoped>
a {
  color: #42b983;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
