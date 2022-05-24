import React from 'react'
import ReactDom from 'react-dom'

interface Props {
  count: number
}

interface State {
  count: number
}
// 单组件生命周期
// 父子组件生命周期
class Sub extends React.Component<{count: number}> {
  constructor(props: { count: number}) {
    console.log('sub constructor')
    super(props)
  }
  state = {}
  // 16.3 新增：目的是为了让props能更新到组件内部state中
  // 场景1：无条件的根据prop来更新内部state,也就是只有传入prop值，就更新state
  // 场景2：只有prop值和state值不同时才更新state值
  static getDerivedStateFromProps(nextProps: { count: number}, state: {}) {
    
    return null
  }
  // 17 删除了
  // componentWillReceiveProps(nextProps: { count: number}) {
  //   // 组件从父组件接收到新的 props 之前调用
  //   console.log("sub componentWillReceiveProps", nextProps)
  // }
  shouldComponentUpdate(nextProps: { count: number}) {
    // 控制组件是否重新渲染
    console.log("sub shouldComponentUpdate", nextProps)
    return true
  }
  componentDidMount() {
    console.log("sub componentDidMount")
  }
  // 17.componentWillUpdate删除，
  // 16.3新增：在组件更新获取快照，一般结合componentDidUpdate使用，他的返回值作为第三个参数传递给componentDidUpdate
  getSnapshotBeforeUpdate() {
    return 1
  }
  componentDidUpdate(prevProps: {count: number}, prevState: {}, snapshot: any) {
    // 组件重新渲染并且把更改变更到真实的 DOM 以后调用
    console.log("sub componentDidUpdate", snapshot)
  }
  render() {
    // 调用setState方法的时候走
    console.log("sub render")
    return (
      <div>
        sub: {this.props.count}
      </div>
    )
  }
}
export default class Counter extends React.Component<Props, State> {
  static defaultProps = {
    count: 0
  }
  constructor(props: Props ) {
    // state的初始化工作或者给自定义方法绑定this
    console.log('constructor')
    super(props)
  }
  readonly state = {
    count: this.props.count
  }
  // 16.3 删除了
  // componentWillMount() {
  //   // 组件挂载开始之前， 也就是组件调用render方法之前调用。
  //   console.log('1. componentWillMount 组件将要挂载')
  // }
  // 17
  // UNSAFE_componentWillMount() {
  //   console.log('组件将要挂载')
  // }


  handleClick = () => {
    this.setState((prevState: any) => (
      {
        count: prevState.count + 1
      }
    ))
  }
  componentDidUpdate() {
    // 组件重新渲染并且把更改变更到真实的 DOM 以后调用
    console.log("parent componentDidUpdate")
  }
  componentDidMount() {
    // 组件挂载完成以后， 也就是DOM元素已经插入页面后调用
    console.log('3. componentDidMount 组件挂载完成')
  }
  componentWillUnmount() {
    //  组件对应的DOM元素从页面中删除之前调用。
    console.log('componentWillUnmount 组件卸载')
  }
  render() {
    console.log('2. render 渲染')
    return (
      <div>
        父计数器：{this.state.count}
        <button onClick={this.handleClick}> plus 1</button>
        <Sub count={this.state.count} />
      </div>
    )
  }


}
// 16.3之前
// 挂载阶段：constructor---->componentWillMount---->render---->componentDidMount
// 更新阶段：componentWillReceiveProps---->shouldComponentUpdate---->render---->componentDidUpdate
// 卸载阶段：componentWillUnmount


// 16.3之后
// 挂载阶段： constructor -> getDerivedStateFromProps -> render -> componentDidMount
// 更新阶段： getDerivedStateFromProps -> shouldComponentUpdate -> render -> getSnapshotBeforeUpdate -> componentDidUpdate
// 卸载阶段： componentWillUnmount



// 新的生命周期增加了static getDerivedStateFromProps()以及getSnapshotBeforeUpdate()，
// 废弃了原有的componentWillMount()、componentWillUpdate()以及componentWillReceiveProps()，

// componentWillMount() 
// 1. 在服务端渲染的话，会在服务端和客户端各执行一次，会导致请求两次，而didMount只会在客户端进行
// 2. 在Fiber之后，由于任务可中断，willMount可能会被执行多次（fiber算法是异步渲染，异步的渲染，可能因为高优先级任务的出现而打断现有任务导致componentWillMount就可能执行多次）

// 被废弃的三个函数都是在render之前，因为fiber的出现，很可能因为高优先级任务的出现而打断现有任务导致它们会被执行多次