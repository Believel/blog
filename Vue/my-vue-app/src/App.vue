<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// import HelloWorld from './components/HelloWorld.vue'
// import Animation from './components/Animation.vue'
</script>

<template>
  <h1>Hello App</h1>
  <!-- 路由导航 -->
  <router-link to="/"> Home </router-link>
  <router-link to="/animation/123">animation</router-link>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
  <!-- <HelloWorld msg="Hello Vue 3 + Vite" /> -->
  <!-- <Animation /> -->
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
