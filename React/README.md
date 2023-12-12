# React
## React 性能优化
* 将变得部分（state, props, context）与不变的部分分离开
* 当父组件满足性能优化条件子孙组件可能命中性能优化
* 该如何比较props?
  * 全等比较 -- 高效，但不易命中
  * 浅比较 -- 不高效，但易命中   -- 就是用性能优化API(React.memo, shouldComponentUpdate, useMemo, useCallback)

## 优化方法
1. 寻找项目中的性能损耗严重的子树
2. 在子树的根节点使用性能优化API
3. 子树中运用变与不变分离原则

## `requestIdleCallback`
  * 使开发者能够在主事件循环上执行后台和低优先级工作，而不会影响延迟关键事件，如动画和输入响应，正常帧任务完成后没超过16ms，说明时间富余，此时就会执行requestIdleCallback里注册的任务。

## `Concurrent`并发模式
Concurrent调度模式是一种支持`同时执行多个更新任务`的调度模式。
其中，`同时执行多个更新任务`指的是同时将多个更新任务添加到React调度的任务队列中，然后React会一个个执行，而不是类似多线程同时工作那种方式。

* 时间切片模式
* React 如何实现时间切片模式
* 调度中优先级
* 如何实现优先级插队
* 调度中的核心参数：expirationTime(过期时间)

# React 面试题
1. React组件如何通讯
  * 父子之间 —— 通过props传递属性和方法
  * context —— 更深组件直接共享数据
  * redux
2. JSX本质是什么
  * `JavaScript`的语法扩展
3. context 是什么，有何用途

4. shouldComponentUpdate 的用途

5. 描述 redux 单项数据流

6. react16.3新增的生命周期，在V17中删除了哪些生命周期
  * componentWillMount
  * componentWillReceiveProps
  * componentWillUpdate

7. setState
  * 不可变值
  * 可能是异步更新
    * React<=17
      * React 组件事件：异步更新 + 合并 state
      * DOM事件、setTimeout: 同步更新 + 不合并 state
    * React 18
      * React 组件事件：异步更新 + 合并 state
      * DOM事件、setTimeout: 异步更新 + 合并 state
      * Automatic Batching 自动批处理
      * 若想变成同步更新：
        * `ReactDOM.flushSync(() => {})`
  * 可能会被合并
    * 传入对象，会被合并
    * 传入函数，不会被合并
8. 函数组件
  * 纯函数，输入props,输出JSX
  * 没有实例，没有生命周期，没有state
  * 不能扩展其他方法
9. 非受控组件
  * ref
  * 当必须操作DOM的时候使用，比如上传文件，富文本编辑器等等
10. Portals
  * 组件默认会按照既定层次嵌套渲染
  * 如何让组件渲染到父组件以外？
  * 使用场景：
    * overflow: hidden
    * 父组件 z-index 值太小
    * fixed 需要放在 body 第一层级
11. context
  * 公共信息（语言、主题）如何传递给每个组件？
  * 用 props 太繁琐
  * 用 redux 小题大做
12. 异步组件
  * import()
  * React.lazy
  * React.Suspense
13. 性能优化
  * shouldComponentUpdate(简称SCU)
    * SCU 默认返回 true, 即React默认重新渲染所有子组件
    * 必须配合“不可变值”一起使用
  * PureComponent 和 React.memo
    * PureComponent 中 SCU 中实现了浅比较
    * memo, 函数组件中的 PureComponent
  * 不可变值 immutable.js
14. 组件复用
  * 高阶组件 HOC
    * 一个函数中接收一个组件，返回一个新的组件，并在新组件中做公共逻辑抽离
  * render props
    * 给公用组件添加一个属性，属性值是函数组件
  * HOC vs render props
    * HOC: 模式简单，但会增加组件层级
    * render props: 代码简洁，学习成本较高