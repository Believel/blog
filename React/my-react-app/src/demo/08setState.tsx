import React from 'react'
interface S {
  count: number
}
class StateDemo extends React.Component<any, S>{
  constructor(props: any) {
    super(props);
    this.state = {
      count: 0
    }
  }
  // increase = () => {
    // 传入对象
    // this.setState({
    //   count: this.state.count + 1
    // })
    // this.setState({
    //   count: this.state.count + 1
    // })
    // this.setState({
    //   count: this.state.count + 1
    // })

    // 传入函数

    // this.setState(prevState => {
    //   return {
    //     count: prevState.count + 1
    //   }
    // })
    // this.setState(prevState => {
    //   return {
    //     count: prevState.count + 1
    //   }
    // })
    // this.setState(prevState => {
    //   return {
    //     count: prevState.count + 1
    //   }
    // })

    // 异步更新
    // this.setState({
    //   count: this.state.count + 1
    // }, () => {
    //   console.log('count by callback:' + this.state.count)
    // })
    // console.log('count:', this.state.count) // 异步的，拿不到最新值


    // 同步更新
    // setTimeout(() => {
    //   this.setState({
    //     count: this.state.count + 1
    //   })

    //   console.log('count:', this.state.count);
    // }, 0)
  // }
  // increase = () => {
    // 开始：处于 batchUpdate
    // isBatchingUpdates = true          命中是异步
    // this.setState({
    //   count: this.state.count + 1
    // })
    // 结束：
    // isBatchingUpdates = false
  // }
  increase = () => {
    // 开始：处于 batchUpdate
    // isBatchingUpdates = true 
    setTimeout(() => {
      //此时 isBatchingUpdates = false   没命中是同步
      this.setState({
        count: this.state.count + 1
      })
    }, 0)
    
    // 结束：
    // isBatchingUpdates = false
  }
  render() {
    const { count } = this.state
    return (
      <div>
        <p>{count}</p>
        <button onClick={this.increase}>累加</button>
      </div>
    )
  }
}

// setState 无所谓是同步还是异步
// 看是否能命中 batchUpdate 机制
  // 1. 生命周期（和它调用的函数）
  // 2. React 中注册的事件（和它调用的函数）
  // 3. React可以“管理”的入口
// 判断 isBatchingUpdates


// 哪些不能命中 batchUpdate 机制
  // 1. setTimeout、setInterval
  // 2. 自定义的DOM事件
  // 3. React管不到的入口

export default StateDemo