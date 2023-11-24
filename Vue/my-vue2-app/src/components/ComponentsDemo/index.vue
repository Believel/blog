<template>
  <div>
    <Input @add="addTitle"/>
    <List :list="lists" @delete="deleteTitle"></List>
  </div>
</template>

<script>
import Input from './Input.vue'
import List from './List.vue'
export default {
  components: {
    Input,
    List
  },
  data () {
    return {
      lists: [
        {
          id: 'id-1',
          title: '吃饭'
        },
        {
          id: 'id-2',
          title: '睡觉'
        }
      ]
    }
  },
  methods: {
    addTitle (title) {
      this.lists.push({
        id: `id-${this.lists.length + 1}`,
        title
      })
    },
    deleteTitle (id) {
      this.lists = this.lists.filter(item => item.id !== id)
    }
  }
}
</script>
