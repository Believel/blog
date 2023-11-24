<template>
  <div id="app">
    <!-- <router-view/> -->
    <ComponentDemo></ComponentDemo>
  </div>
</template>

<script>
import ComponentDemo from './components/ComponentsDemo/index.vue'
export default {
  name: 'App',
  components: {
    ComponentDemo
  }
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
