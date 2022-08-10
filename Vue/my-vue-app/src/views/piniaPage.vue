<script setup>
import { useCounterStore } from '@/piniaStore/counter'
const counter = useCounterStore()
// 点击增加1
function handleCount() {
  // using a action instead
  // counter.increment()

  // or with autoCompletion
  counter.$patch({
    count: counter.count + 1
  })
}

</script>

<template>
   <el-button @click="handleCount">pinia state: {{counter.count}}</el-button>
   <el-tag>{{counter.double}}</el-tag>
</template>

<style scoped>
</style>