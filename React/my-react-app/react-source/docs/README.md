# React 15
1. reconciler : 负责找出变化的组件
2. renderer: 负责将变化的组件渲染到页面上

> 在 `mount`和`update`中都会递归的更新子组件，导致中途无法中断。当层级很深时，递归更新时间超过了16ms，用户交互就会卡顿
# React16 源码

> 中文版：https://qcsite.gatsbyjs.io/build-your-own-react/；英文版：https://pomb.us/build-your-own-react/；React技术揭秘：https://react.iamkasong.com/

> 如何同步更新更新变成可中断的异步更新？ 

1. schedule 调度 scheduler： 调度任务的优先级，高优任务优先进入到 Reconciler
2. render 协调 reconciler: 负责找出变化的组件。（将老的同步更新的架构变为异步的可中断更新）
3. commit 渲染 renderer：负责将变化的组件渲染到页面上

## React Fiber
> React 内部实现的一套状态更新机制。支持任务不同的优先级，可中断与恢复，并且恢复后可以复用之前的中间状态。其中每个任务更新单元为React Element对应的Fiber节点

1. Fiber 含义
  * 作为架构来说，之前 React15的Reconciler采用递归的方式执行，数据保存在递归调用栈中，所以被称为`stack reconciler`.React16中Reconciler采用`fiber 节点`实现，称为`Fiber Reconciler`
  * 作为静态的数据结构来说，每个`Fiber节点`对应一个`React element`，保存了该组件的类型（函数组件、类组件、原生组件）、对应的DOM节点等信息
  * 作为动态的工作单元来说，每个`Fiber节点`保存了本次更新中该组件改变的状态、要执行的工作（需要被删除、被插入页面中、被更新）
2. 


## JSX
1. `JSX`在编译时会被`Babel`编译为`React.createElement`方法

2. `JSX`和`Fiber节点`是同一个东西么
  * `JSX`是一种描述当前组件内容的数据结构，他不包含组件schedule、reconcile、render所需的相关信息
  * 比如这些信息就不包括`JSX`中，而是在`Fiber`中
    * 组件在更新中的`优先级`
    * 组件的`state`
    * 组件被打上的用于 Renderer 的`标记`
  * 在组件`mount`时，Reconciler 根据`JSX`描述的组件内容生成组件对应的`Fiber`节点
  * 在`update`中，Reconciler将`JSX`与`Fiber`节点保存的数据对比,生成组件对应的`Fiber`节点,并根据对比结果为`Fiber`节点打上`标记`。

3. `React Component` 和 `React Element`是同一个东西么，他们和`JSX`有什么关系？
```js
// 在 React 中，所有JSX中在运行时的返回结果（即 React.createElement()的返回值）都是 React Element
`$$typeof: REACT_ELEMENT_TYPE`标记了该对象是个`React Element`。

```

## Diff 算法
> diff算法原理图：https://www.processon.com/diagraming/626bb7eae401fd1b2461d85a

1. 混淆概念
  * `current fiber`:如果该`DOM节点`已在页面中，`current fiber`代表该`DOM节点`对应的`Fiber节点`
  * `workInProgress Fiber`:如果该`DOM节点`将在本次更新中渲染到页面中，`workInProgress fiber` 代表该DOM节点对应的`Fiber节点`