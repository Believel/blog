<template>
  <div class="container">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
    <button @click="todo">采用eventBus通信</button>
    son: {{value}}
    <button @click="change(2)">sync用法</button>
  </div>
</template>

<script>
export default {
  name: 'Sub',
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    todo () {
      this.$bus.$emit('todoSomething', '11')
    },
    change (value) {
      this.$emit('update:value', value)
    }
  }
}
</script>
