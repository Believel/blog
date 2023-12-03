<script>
import { ref, toRef, reactive, toRefs } from 'vue';
export default {
  setup() {
    // ref 接受一个内部值，返回一个响应式的、可更改的 ref 对象。此对象只有一个指向其内部值的属性 .value
    const nameRef = ref('张三')
    const ageRef = ref('20')

    const state = reactive({
      name: '李四',
      age: 30
    })

    // toRef 可以基于响应式对象上的一个属性，创建一个对应的 ref。
    // 这样创建的 ref 与其源属性保持同步：改变源属性的值将更新 ref 的值，反之亦然。
    const age = toRef(state, 'age')

    setTimeout(() => {
      state.age = 40
    }, 1000)

    setTimeout(() => {
      age.value = 50
    }, 3000)

    // toRefs  将响应式对象转换成普通对象，这个普通对象的每个属性都是指向源对象相应属性的 ref。
    // 每个单独的 ref 都是使用 toRef() 创建的。
    const obj = reactive({
      score: 90,
      class: '一'
    })

    // objAsRefs 可以结构，且每个值不会失去响应式
    const objAsRefs = toRefs(obj)

    return {
      nameRef,
      ageRef,
      state,
      age,
      ...objAsRefs
    }
  }
}
</script>
<template>
  <div>
    ref应用：{{ nameRef }} - {{ ageRef }}
    <br/>
    toRef应用: {{ state.name }} - {{ state.age }} - {{ age }}
    <br/>
    toRefs应用:{{ score }} - {{ class }}

  </div>
</template>