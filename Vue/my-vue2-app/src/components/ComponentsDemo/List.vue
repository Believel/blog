<template>
  <ul>
    <li v-for="item in list" :key="item.id">
    {{ item.title }}
    <button @click="deleteItem(item.id)">delete</button>
  </li>
  </ul>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    }
  },
  created () {
    // 绑定自定义事件
    this.$bus.$on('onAddTitle', this.onAddHandle)
  },
  beforeDestroy () {
    // 销毁自定义事件
    this.$bus.$off('onAddTitle', this.onAddHandle)
  },
  methods: {
    deleteItem (id) {
      this.$emit('delete', id)
    },
    onAddHandle (title) {
      console.log(title)
    }
  }
}
</script>
