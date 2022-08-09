<script setup>
import { inject } from 'vue'
// 获取上层组件提供的数据
const { location, updateLocation } = inject('location')
</script>

<template>
    <el-button type="primary" @click="updateLocation">{{location}}</el-button>
</template>