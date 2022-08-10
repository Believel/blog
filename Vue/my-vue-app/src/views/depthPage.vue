<script setup>
import { provide, ref, onRenderTracked, onRenderTriggered, reactive } from 'vue'
import Child from '../components/Child.vue'
const location = ref('North Pole')
const state = reactive({
    name: 'zpp'
})
function handleClick() {
    state.name = 'tgd'
}

function updateLocation() {
    location.value = 'South Pole'
}
// 参数1： 注入名； 参数2： 注入值
provide('location', {
    location,
    updateLocation
})

// 组件调试钩子
onRenderTracked((event) => {
    console.log(event)
})

onRenderTriggered((event) => {
    console.log(event)
})

</script>

<template>
    <div>{{state.name}}</div>
    <el-button @click="handleClick">改变</el-button>
    <div>{{$translate('greetings.hello')}}</div>
    <Child></Child>
</template>

<style scoped>
</style>