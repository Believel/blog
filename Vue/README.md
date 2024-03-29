# Vue2

## Vue中的重用逻辑
1. 组件: 主要关注构建视图区块
2. 可组合函数：关注于有状态的逻辑
3. 自定义指令：封装了可重用的对底层DOM访问的逻辑。一个自定义指令定义了一个包含类似于组件的生命周期钩子的对象。

## 单文件组件
1. Vue 的单文件组件（即`*.vue`文件，简称SFC）是一种特殊的文件格式，使我们能够将一个Vue组件的模板、逻辑与样式封装到一起



## 面试题
1. `Proxy` 和`Object.defineProperty` 对比
    * 后者只能对属性进行数据劫持，所以需要深度遍历整个对象
    * 后者对于数组不能监听到数据的变化
    * Proxy 的代理是针对整个对象的，而不是针对对象的某个属性的，因此不像Object.defineProperty必须遍历对象的每个属性，Proxy只需要做一层代理就可以监听同级结构下的所有属性变化，当然对于深层结构，递归还是需要进行的
    * proxy 支持代理数组的变化
2. `<keep-alive>`
  * 此组件是一个抽象组件，他的实现是通过自定义`render`函数并且利用了插槽，并且`<keep-alive>`缓存了`vnode`
  * 在patch过程中对于已经缓存的组件不会执行`mounted`,所以又提供了`activated`和`deactivated`钩子函数
  * `<keep-alive>`组件`props`有`include`、`exclude`、`max`
  * 缓存组件，不需要重复渲染的时候可以使用
  * 如多个静态tab页的切换

3. `computed`
  * 计算属性适合用在模板渲染中，某个值是依赖了其它的响应式对象甚至是计算属性计算而来的
  * 会缓存，data不变不会计算
4. `watch`
  * 侦听属性适合用于观测某个值的变化去完成一段复杂的业务逻辑。

5. `nextTick`
  * 数据变化到DOM的重新渲染是一个异步过程，发生在下一个tick

6. `v-if`和`v-show`的区别
  * `v-show` 是通过 CSS display 控制显示和隐藏
  * `v-if` 组件真正的渲染和撤销，而不是显示和隐藏
  * 频繁切换显示状态用`v-show`，否则用`v-if`
7. 为何在`v-for`中使用`key`
  * diff算法中通过tag和key来判断，是否是sameNode,减少渲染次数，提升渲染性能
8. 双向数据绑定 `v-model` 的实现原理
  * input 元素的 `value = this.name`
  * 绑定input事件 `this.name = $event.target.value`
  * data更新触发 `re-render`
9. 为何组件data必须是一个函数
  * 组件相当于class, 它可能用到很多地方，所以对于每一个实例，data都必须是独立的，所以要用函数返回
10. 多个组件有相同的逻辑，如何抽离
  * mixin
  * 以及mixin的一些缺点
    * 引用时，变量和方法来源不清楚，而且命名重复的变量、方法、时间钩子会合并
11. 何时需要使用 beforeDestory
  * 解除自定义事件 event.$off
  * 清除定时器
  * 解绑自定义的DOM事件，如window.scroll等
12. Vuex中action和mutation的区别
  * action 处理异步， mutation中处理同步操作
  * mutation 做原子操作
  * action 可以整合多个 mutation
13. vue常见性能优化方式
  * 合理使用v-show和v-if
  * 合理使用computed
  * v-for时加key,以及避免和v-if同时使用（v-for优先级更高些，这样每次渲染都有重新计算一遍）
  * 自定义事件、DOM事件及时销毁
  * 合理使用异步组件
  * 合理使用keep-alive
  * data 层级不要太深
  * 使用vue-loader在开发环境做模版编译（预编译）
  * 合理使用keep-alive
  * webpack层面的优化
  * 前端通用的性能优化，如图片懒加载


## Vue2 原理
1. 组件化
  * 数据驱动视图 MVVM
2. 响应式
  * 核心API - Object.defineProperty
  * 如何实现响应式
  * Object.defineProperty的一些缺点
    * 深度监听，需要递归到底，一次性计算量大
    * 无法监听新增属性/删除属性(Vue.set Vue.delete)
    * 无法原生监听数组，需要特殊处理
3. vdom 和 diff
  * diff算法过程

4. 模板编译
5. 渲染过程
  * 初次渲染
    * 解析模版为render函数
    * 触发响应式，监听data
    * 执行render函数，生成vnode,patch(elem, vnode)
  * 更新过程
    * 修改data,触发setter（此前在getter中已经监听）
    * 重新执行render函数，生成newVnode
    * patch(vnode, newvnode)
6. 前端路由
  1. hash
    * hash 变化会触发网页跳转，即浏览器的前进、后退
    * hash 变化不会刷新页面，SPA必须的特点
    * hash 永远不会提交到 server 端
  2. H5 history
    * 用 url 规范的路由，但跳转不刷新页面
    * hisotry.pushState
    * window.onpopstate


### Vue和react diff算法有哪些不一样的地方
> 回答他们对于 children 的比较策略的不同

* vue - 双端比较
* react - 仅右移策略


# Vue3
1. vue3 比 vue2 有什么优势
  * 性能更好
  * 体积更小
  * 更好的ts支持
  * 更好的代码组织
  * 更好的逻辑抽离
  * 更多新功能
2. 描述 Vue3 生命周期
  * option API
    * beforeCreate
    * created
    * beforeMount
    * mounted
    * beforeUpdate
    * updated
    * beforeUnmount (注意：vue2是 beforeDestroy)
    * unmounted （注意：vue2是 destroyed）
  * composition API
    * onMounted
    * onBeforeMount
    * onBeforeUpdate
    * onUpdated
    * onUnmounted
    * onBeforeUnmount
3. 如何看待 Composition API 和 Options API
  * Composition API带来了什么?
    * 更好的代码组织
    * 更好的逻辑复用
    * 更好的类型推导
  * 如何选择?
    * 不建议共用，会引起混乱
    * 小型项目，业务逻辑简单，用Options API
    * 中大型项目、逻辑复杂项目，用 Composition API
  * 别误解 Composition API
    * Composition API 属于高阶技巧，不是基础必会
    * Composition API 是为了解决复杂业务逻辑而设计
    * Composition API 就像Hooks在React中地位

4. 如何理解 ref toRef 和 toRefs
  * 是什么
  * 最佳使用方式
  * 深入理解
    * 为何需要 `ref`?
      * 返回值类型，会丢失响应式
      * 如在setup、computed、合成函数、都有可能返回值类型
      * Vue如不定义ref,用户将自造ref,反而会混乱
    * 为何需要 `.value`?
      * ref 是一个对象（不丢失响应式），value存储值
      * 通过.value 属性的get和set实现响应式
      * 用于模版、reactive时，不需要.value,其他情况都需要
    * 为何需要 `toRef` `toRefs`?
      * 初衷：不丢失响应式的情况下，把对象数据分散/扩散
      * 前提：针对的是响应式对象(reactive封装的)非普通对象
      * 注意：不创造响应式，而是延续响应式

5. Vue3升级了哪些重要的功能
  * createApp
  ```js
  // vue2
  const app = new Vue({/* 选项 */})
  Vue.use()
  Vue.mixin()
  Vue.component()
  Vue,.directive()
  // vue3
  const app = Vue.createApp(/* 选项 */)
  app.use()
  app.mixin()
  app.component()
  app.directive()
  ```
  * emits属性
  * 生命周期
  * 多事件
  ```js
  // 在methods里定义 one two 两个函数
  <button @click="one(),two($event)">
  submit
  </button>
  ```
  * Fragement
  * 移除.sync
  ```js
  // vue2
  <MyComponent :title.sync="title" />
  // vue3
  <MyComponent v-model:title="title"/>
  ```
  * 异步组件的写法
  ```js
  // vue2
  new Vue({
    components: {
      'my-component': () => import('./my-async-component.vue')
    }
  })

  // vue3
  import { createApp, defineAsyncComponent } from 'vue'
  createApp({
    components: {
      AsyncComponent: defineAsyncComponent(() => import('./my-async-component.vue'))
    }
  })
  ```
  * 移除filter
  * Teleport
  * Suspense
  * Composition API
    * reactive
    * ref相关
    * readonly
    * watch 和 watchEffect
    * setup
    * 生命周期钩子函数

6. Composition API 如何实现代码逻辑复用
  * 抽离逻辑代码到一个函数
  * 函数命名约定为 useXXX 格式
  * 在 setup 中引用 useXXX 函数

7. Vue3 如何实现响应式
  * Proxy

8. watch 和 watchEffect 的区别是什么
  * 两者都可监听 data 属性变化
  * watch 需要明确监听哪个属性
  * watchEffect 会根据其中的属性，自动监听其变化

9. setup 中如何获取组件实例
```js
import { getCurrentInstance, onMounted } from 'vue';
export default {
  name: 'getinstance',
  data() {
    return {
      x: 1,
      y: 2
    }
  },
  setup() {
    onMounted(() => {
      // setup中获取组件实例
      const instance = getCurrentInstance()

      console.log(instance.data.x)
    })
  }
}
```

10. Vue3 为何比 Vue2快
  * proxy响应式
  * patchFlag
    * 编译模版时，动态节点做标记
    * 标记，分为不同的类型，如TEXT PROPS
    * diff 算法时，可以区分静态节点，以及不同类型的动态节点
  * hoistStatic
    * 将静态节点的定义，提升到父作用域，缓存起来
    * 多个相邻的静态节点，会被合并起来
    * 典型的拿空间换时间的优化策略
  * cacheHandler
    * 缓存事件
  * SSR优化
    * 静态节点直接输出，绕过了vdom
    * 动态节点，还是需要动态渲染
  * tree-shaking
    * 编译时，根据不同的情况，引入不同的API

11. Vite 是什么
  * 一个前端的打包工具，Vue 作者发起的项目
  * 借助 Vue 的影响力，发展很快，和 webpack 竞争
  * 为何启动快？
    * 开发环境使用 ES6 Module,无需打包——非常快
    * 生产环境使用 rollup, 并不会快很多

12. Composition API 和 React Hooks 的对比
  * 前者 setup 只会被调用一次，而后者函数会被多次调用
  * 前者无需使用 useMemo useCallback,因为setup只调用一次
  * 前者无需顾虑调用顺序，而后者需要保证hooks的顺序一致
  * 前者 reactive + ref 比后者 useState,要难理解