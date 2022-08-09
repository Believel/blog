<script setup>
import { provide, ref } from 'vue'
import Child from '../components/Child.vue'
const location = ref('North Pole')

function updateLocation() {
    location.value = 'South Pole'
}
// 参数1： 注入名； 参数2： 注入值
provide('location', {
    location,
    updateLocation
})
</script>

<template>
    <div>{{$translate('greetings.hello')}}</div>
    <Child></Child>
</template>

<style scoped>
</style>