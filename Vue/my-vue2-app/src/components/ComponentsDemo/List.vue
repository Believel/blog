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
  methods: {
    deleteItem (id) {
      this.$emit('delete', id)
    }
  }
}
</script>
