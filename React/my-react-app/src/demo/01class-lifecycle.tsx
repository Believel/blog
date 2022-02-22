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
  componentWillReceiveProps(nextProps: { count: number}) {
    // 组件从父组件接收到新的 props 之前调用
    console.log("sub componentWillReceiveProps", nextProps)
  }
  shouldComponentUpdate(nextProps: { count: number}) {
    // 控制组件是否重新渲染
    console.log("sub shouldComponentUpdate", nextProps)
    return true
  }
  componentDidMount() {
    console.log("sub componentDidMount")
  }
  componentDidUpdate() {
    // 组件重新渲染并且把更改变更到真实的 DOM 以后调用
    console.log("sub componentDidUpdate")
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
  componentWillMount() {
    // 组件挂载开始之前， 也就是组件调用render方法之前调用。
    console.log('1. componentWillMount 组件将要挂载')
  }


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