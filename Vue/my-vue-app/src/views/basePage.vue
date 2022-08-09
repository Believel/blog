<!-- 组合式 API -->
<script setup>
import { onMounted, onUpdated, onUnmounted,ref, unref, watchEffect, computed, reactive, watch } from 'vue'
import { useMouse } from '../hooks/useMouse'
import { mapState, useStore } from 'vuex'

// 自定义指令引入
import { vFocus }  from '../components/directives'

const { x, y} = useMouse()

// Props 声明
// defineProps({
//   msg: String
// })
const rawHtml = `<span style="color: red">This should be red</span>`
// 创建一个响应式对象或数组
const state = reactive({ 
  name: 'zhangsan',
  books: [
    'vue1 - Advanced Guide',
    'vue2 - Basic Guide',
    'vue3 - The Mystery'
  ]
})
// 定义响应式变量：允许我们创建可以使用任何值类型的响应式
const count = ref(0)
const show = ref(true)

const store = useStore()

// 生命周期钩子: 组件完成初始渲染并创建DOM节点之后运行
onMounted(() => {
  console.log('onMounted - the component is now mounted')
  console.log(`The initial count is ${count.value}`)
})
onUpdated(() => {
  console.log('onUpdated - the component is update')
})
onUnmounted(() => {
  console.log('onUnmounted - the component is now unmounted')
})
// 计算属性
computed({
  ...mapState(['count1'])
})
// 一个计算属性 ref
const publishBookMessage = computed(() => {
  return state.books.length > 0 ? 'yes' : 'no'
})
// 可以直接侦听一个 ref
// watch 是懒执行的：仅当数据源变化时，才会执行回调
watch(count, (newValue, oldValue) => {
  console.log(`newValue:${newValue},oldValue: ${oldValue}`)
}, {
  // flush: 'post'
})
function fetchData() {
  console.log('立即执行一遍回调')
}
// 创建侦听器，立即执行一遍回调
watchEffect(fetchData, {
  // 在侦听器回调中能够访问被Vue更新之后的DOM
  // flush: 'post'
})
// 用来修改状态，触发更新的函数
const incrementA = (event) => {
  store.commit('increment')
  // event 是 DOM 原生事件
  if (event) {
    console.log(event.target.tagName)
  }
}
function handleInline(message, event) {
  alert(message + '触发的标签名：' +event.target.tagName)
}
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <span class="box-title">表达式</span>
    </template>
    <div>{{state.name}} - {{publishBookMessage}}</div>
    <div>v-html: <span v-html="rawHtml"></span></div>
  </el-card>
  <el-card class="box-card">
    <template #header>
      <span class="box-title">组合式函数：鼠标功能</span>
    </template>
    <p>鼠标位置：{{x}}, {{y}}</p>
  </el-card>
  <el-card class="box-card">
    <template #header>
      <span class="box-title">自定义指令：输入框焦点</span>
    </template>
    <el-input v-focus></el-input>
  </el-card>
  <el-card class="box-card">
    <template #header>
      <span class="box-title">动画</span>
    </template>
    <el-button @click="show = !show" type="primary">切换动画</el-button>
    <transition>
      <p v-if="show">你好</p>
    </transition>
  </el-card>
  <el-card class="box-card">
    <template #header>
      <span class="box-title">store用法</span>
    </template>
    <div>{{store.state.count1}}</div>
    <el-button type="primary" @click="incrementA">点击</el-button>
  </el-card>
  <el-card class="box-card">
    <template #header>
      <span class="box-title">内联事件</span>
    </template>
    <el-button @click="handleInline('inline', $event)" type='primary'>内联事件使用1：使用特殊的 $event 变量</el-button>
    <el-button @click="(event) => handleInline('inline', event)" type="success">内联事件使用2:使用内联箭头函数</el-button>
  </el-card>
  <ul>
    <!-- 此时v-if会警告：Property "book" was accessed during render but is not defined on instance.  -->
    <!-- 因为：v-if优先级比v-for高,所以v-if的条件将无法访问到v-for作用域的变量别名 -->
    <!-- <li v-for="book in state.books" v-if="book">
      {{book}}
    </li> -->

    <!-- 解决方法：在外层包裹一层<template> -->
    <template v-for="book in state.books" :key="book">
      <li v-if="book">
        {{book}}
      </li>
    </template>
  </ul>
</template>

<style scoped>
a {
  color: #42b983;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.box-card {
  margin-bottom: 20px;
  width: 600px;
}
.box-title {
  color: #409eff;
}
</style>
