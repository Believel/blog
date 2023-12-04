<script>
import { onMounted, onBeforeMount, onBeforeUpdate, onUpdated, onUnmounted, onBeforeUnmount } from 'vue'
// import Ref from './Ref.vue'
// import Watch from './watch.vue'
import getInstance from './getInstance.vue'
export default {
  components: {
    // Ref,
    // Watch,
    getInstance
  },
  // 选项式生命周期 - option API
 beforeCreate() {
  console.log('beforeCreate')
 },
 created() {
  console.log('created')
 },
 beforeMount() {
  console.log('beforeMount')
 },
 mounted() {
  console.log('mounted')
 },
 beforeUpdate() {
  console.log('beforeUpdate')
 },
 updated() {
  console.log('updated')
 },
//  beforeDestroy vue2
 beforeUnmount() {
  console.log('beforeUnmount')
 },
//  destroyed vue2
 unmounted() {
  console.log('destroyed')
 },
 setup() {
  // 组合式生命周期 composition API
  onBeforeMount(() => {
    console.log('onBeforeMount')
  })
  onMounted(() => {
    console.log('onMounted')
  })
  onBeforeUpdate(() => {
    console.log('onBeforeUpdate')
  })
  onUpdated(() => {
    console.log('onUpdated')
  })
  onBeforeUnmount(() => {
    console.log('onBeforeUnmount')
  })
  onUnmounted(() => {
    console.log('onUnmounted')
  })
 }
}
</script>

<template>
  <div>
    <h1>生命周期</h1>
    <!-- <Ref></Ref> -->
    <!-- <Watch></Watch> -->
    <getInstance></getInstance>
  </div>
</template>