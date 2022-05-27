1. requestIdleCallback
  * 使开发者能够在主事件循环上执行后台和低优先级工作，而不会影响延迟关键事件，如动画和输入响应，正常帧任务完成后没超过16ms，说明时间富余，此时就会执行requestIdleCallback里注册的任务。
2. Fiber
  * fiber 是什么？
    * Fiber 是一个执行单元，每次执行完一个执行单元，React就会检查现在还剩多少时间，如果没有时间就将控制权让出去。
    * Fiber 是一种数据结构，React目前的做法是使用链表，每个VirtualDOM节点内部表示一个Fiber
  * Fiber 执行阶段
    * 协调阶段(render阶段)(Reconciliation)：可以认为是Diff阶段，这个阶段可以被中断，这个阶段会找出所有节点变更，例如节点新增、删除、属性变更等等，这些变更React称为副作用（Effect）
    * 提交阶段（Commit）：将上一次阶段计算出来的需要处理的副作用一次性执行了。这个阶段必须同步执行，不能被打断