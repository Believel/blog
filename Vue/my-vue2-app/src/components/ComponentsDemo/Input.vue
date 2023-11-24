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

      this.title = ''
    }
  }
}
</script>
