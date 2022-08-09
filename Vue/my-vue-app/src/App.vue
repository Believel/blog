<script setup>
import { ref } from 'vue'
const activeIndex = ref('1')

</script>

<template>
  <!-- 路由导航菜单 -->
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
  >
    <el-menu-item index="1">
      <router-link to="/"> Vue3基础 </router-link>
    </el-menu-item>
    <el-menu-item index="2">
      <router-link to="/animation/123">Vue3深入组件</router-link>
    </el-menu-item>
  </el-menu>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
a {
  text-decoration: none;
}
</style>
