# React


## React 与 Vue 的区别是什么
> https://zhuanlan.zhihu.com/p/100228073

1. 监听数据变化的实现原理不同

2. HOC 和 mixins

3. 组件通信的区别

4. 模板渲染方式的不同
  * React 通过JSX渲染模板
  * Vue 通过一种拓展的HTML语法进行渲染

5. 渲染过程不同
  * React在应用的状态被改变时，全部子组件都会重新渲染。通过shouldComponentUpdate这个生命周期方法可以进行控制，但Vue将此视为默认的优化。
  * Vue可以更快地计算出Virtual DOM的差异，这是由于它在渲染过程中，会跟踪每一个组件的依赖关系，不需要重新渲染整个组件树。
6. 框架本质不同

7. Vuex 和 Redux 的区别


