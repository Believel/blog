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
      <router-link to="/depth">Vue3深入组件</router-link>
    </el-menu-item>
    <el-menu-item index="3">
      <router-link to="/pinia">Vue3推荐的状态管理器pinia</router-link>
    </el-menu-item>
    <el-menu-item index="4">
      <router-link to="/cycle">Vue3生命周期</router-link>
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
  color: #2c3e50;
}
a {
  text-decoration: none;
}
</style>
