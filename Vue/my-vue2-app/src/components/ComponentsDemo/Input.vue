<template>
  <div>
    <input type="text" v-model="title">
    <button @click="addTitle">add</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: ''
    }
  },
  methods: {
    addTitle () {
      // 调用父组件的事件
      this.$emit('add', this.title)

      // 调用自定义事件 —— 通过插件注册挂载在Vue.prototype.$bus上
      this.$bus.$emit('onAddTitle', this.title)
      this.title = ''
    }
  }
}
</script>
