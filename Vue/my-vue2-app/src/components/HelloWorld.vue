<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div ref="slider">11111</div>
    <!-- :value="value" @update:value="change" -->
    <!-- 对 props 中的值进行”双向绑定“ -->
    <Sub :value.sync="value">
      <h1 slot="header">这是标题</h1>
      <p>这是一个段落</p>
      <p>这是一个段落</p>
    </Sub>
  </div>
</template>

<script>
import Sub from './sub.vue'
export default {
  name: 'HelloWorld',
  // 混合对象引入
  mixins: [],
  components: {
    Sub
  },
  props: {

  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      value: 1
    }
  },
  computed: {
    // 计算属性
  },
  watch: {
    // 监视变量值的变化
  },
  created () {
    // dom及el准备初始化时调用事件

    this.$bus.$on('todoSomething', (params) => {
      console.log('监听的实践', params)
    })
  },
  mounted () {
    // dom及el准备完成后调用事件
    const slider = this.$refs.slider
    slider.style.backgroundColor = 'red'
  },
  activated () {
    // keep-alive组件激活时调用。该钩子在服务器渲染期间不被调用
  },
  deactivated () {
    // keep-alive组件停用时调用。该钩子在服务端渲染期间不被调用
  },
  beforeDestory () {
    // 实例销毁之前调用，在这一步，实例仍然完全可用
    // 该钩子在服务端渲染间不被调用
  },
  destoryed () {
    // Vue实例销毁后调用。调用后，Vue实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
    // 该钩子在服务端渲染不会被调用
  },
  methods: {
    // 实例事件定义
    change (value) {
      this.value = value
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
