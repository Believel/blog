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
  * Redux 三大原则：
    * 单一数据源（一个redux应用只有一个store）,也是单向数据流
    * state只读
    * 使用纯函数reducer来修改state
  * vuex三大原则
    * 应用层级的状态应该集中到单一store对象中
    * 提交mutation是改变状态的唯一方法，并且这个过程是同步的
    * 异步逻辑都应该封装到action中
  * 异步操作
    *  Redux 得益于中间件机制，利用 redux-thunk，可以将异步逻辑放到 action creator 中，通过 action creator 做一个控制反转，给 action creator 传入 dispatch 作为参数，就可以 dispatch action 了。 
    * Vuex 是用 mutation 来对应 Redux 的 action，另外 Vuex 创造来一个 action 方法来提交 mutation，在 action方法中执行异步操作，获取结果后通过提交 mutation 来实现 state 的修改。

## React 性能优化
* 将变得部分（state, props, context）与不变的部分分离开
* 当父组件满足性能优化条件子孙组件可能命中性能优化
* 该如何比较props?
  * 全等比较 -- 高效，但不易命中
  * 浅比较 -- 不高效，但易命中   -- 就是用性能优化API(React.memo, shouldComponentUpdate, useMemo, useCallback)

### 优化方法
1. 寻找项目中的性能损耗严重的子树
2. 在子树的根节点使用性能优化API
3. 子树中运用变与不变分离原则
