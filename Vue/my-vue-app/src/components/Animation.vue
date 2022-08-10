<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// 路由实例
const router = useRouter()
// 返回当前路由地址
const route = useRoute()
const show = ref(true)
const open = ref(false)
onMounted(() => {
  // 获取当前路由地址上的参数
  console.log(route.params.id)
})
const goHome = () => {
  router.push('/')
}
</script>

<template>
  <h3>Transition 动画</h3>
  <el-button @click="show=!show" type="primary">切换淡入/淡出</el-button>
  <el-button @click="goHome" type="success">跳到home</el-button>
  <Transition name="slide-fade">
    <p v-if="show">你好</p>
  </Transition>

  <el-button @click="open = true" type="primary">打开模态框</el-button>
  <!-- 传送门：内置组件，使我们可以将一个组件的一部门模板传送到该组件的DOM层次结构之外的DOM节点中 -->
  <Teleport to="body">
    <div v-if="open" class="modal">
      <p>你好</p>
      <el-button @click="open=false">关闭</el-button>
    </div>
  </Teleport>
</template>

<style scoped>
  .slide-fade-enter-active {
    transition: all 0.3s ease-out;
  }
  .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter-from {
    transform: translateX(20px);
    opacity: 0;
  }
  .modal {
    position: fixed;
    z-index: 999;
    top: 20%;
    left: 50%;
    width: 300px;
    margin-left: -150px;
    background-color: #ffffff;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 4px 16px #00000026;
  }
</style>