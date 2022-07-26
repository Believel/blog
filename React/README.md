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