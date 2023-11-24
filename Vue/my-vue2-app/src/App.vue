<template>
  <div id="app">
    <!-- <router-view/> -->
    <button @click="hideComponentDemo">隐藏</button>
    <!-- <ComponentDemo v-if="visible"></ComponentDemo> -->
    <NextTick></NextTick>
  </div>
</template>

<script>
// import ComponentDemo from './components/ComponentsDemo/index.vue'
import NextTick from './components/AdvanceUse/NextTick.vue'
export default {
  name: 'App',
  data () {
    return {
      visible: true
    }
  },
  components: {
    // ComponentDemo,
    NextTick
  },
  methods: {
    hideComponentDemo () {
      this.visible = false
    }
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
