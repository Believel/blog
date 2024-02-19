1. 为什么会有 React Hooks，它解决了哪些问题？
  * class 组件的问题
    * 大型组件很难拆分和重构，很难测试（即 class 不易拆分）
    * 相同业务逻辑，分散到各个方法中，逻辑混乱
    * 复用逻辑变的复杂，如 Mixins、HOC、Render Prop
  * Hooks做组件逻辑复用的好处
    * 完全符合Hooks原有的规则，没有其他要求，易理解记忆
    * 变量作用域和明确
    * 不会产生组件嵌套

2. React Hooks 如何模拟组件生命周期？
  * 默认函数组件没有生命周期
  * 函数组件是一个纯函数，执行完即销毁，自己无法实现生命周期
  * 使用 Effect Hook 把生命周期“钩”到纯函数中
    * 模拟`componentDidMount` - useEffect 依赖 `[]`
    * 模拟`componentDidUpdate` - useEffect 无依赖，或者依赖`[a,b]`
    * 模拟`componentWillUnMount` - useEffect 中返回一个函数

3. 如何自定义 Hook ?
  * 自定义Hook
    * 封装通用的功能
    * 开发和使用第三方 Hooks
    * 自定义 Hook 带来了无限的扩展性，解耦代码


4. React Hooks 性能优化？
  * `useMemo` 缓存数据
    * React 默认会更新所有子组件
    * class 组件使用 SCU 和 pureComponent做优化
    * Hooks 中使用 useMemo,但优化的原理是相同
  * `useCallback` 缓存函数

5. 使用 React Hooks 遇到哪些坑？

6. Hooks 相比 HOC 和 Render Prop 有哪些优点？
  * HOC 缺点
    * 组件层级嵌套过多，不易渲染，不易调试
    * HOC 会劫持 props,必须严格规范，容易出现疏漏
  * Render Prop
    * 学习成本比较高，不易理解
    * 只能传递纯函数，而默认情况下纯函数功能有限

7. useReducer 和 redux 的区别
  * useReducer 是 useState 的代替方案，用于state复杂变化
  * useReducer 是单个组件状态管理，组件通讯还需要props
  * redux 是全局的状态管理，多组件共享数据
