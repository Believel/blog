import React, {Component} from 'react';
import ReactDOM from 'react-dom';

// 为何要用合成事件机制：
// 1. 更好的兼容性和跨平台
// 2. 全挂载document,减少内存消耗，避免频繁解绑
// 3. 方便事件的统一管理
const de = () => {
  const handleClick = (event: any) => {
    event.preventDefault();
    // 合成事件
    console.log('event....', event);
    console.log('event current', event.currentTarget) // a
    console.log('event target', event.target)  // a
    // 原生事件 DOM 对象
    // 所有事件挂载在   <div id="root"></div>   React 17 之后
    // React 17 之前 挂载在 documemnt 上
    console.log("native current event", event.nativeEvent.currentTarget) // <div id="root"></div>
    console.log('native event', event.nativeEvent.target) // a

  }
  return (
    <>
      <h3>面试题</h3>
      <a href="http://www.imooc.com" onClick={handleClick}>mooc</a>
    </>
  )
}

interface S {
  count: number
}


class Footer extends Component<{render: any}> {
  constructor(props: {render: any}) {
    super(props)
  }
  render() {
    return this.props.render('我是底部标签')
  }
}


class Demo extends React.Component<any, S> {
  
  constructor(props: any) {
    super(props);
    this.state = {
      count: 0
    }
  }
  increase = () => {
    // 传入对象
    this.setState({
      count: this.state.count + 1
    })
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
  }
  componentDidMount() {
    this.setState({ count : this.state.count + 1})
    console.log('0:' + this.state.count)
    this.setState({ count: this.state.count + 1})
    console.log('0:' + this.state.count)
    setTimeout(() => {
      this.setState({
        count: this.state.count + 1
      })
      console.log('2:' + this.state.count)
    }, 0)
    setTimeout(() => {
      this.setState({
        count: this.state.count + 1
      })
      console.log('3:' + this.state.count)
    }, 0)
  }
  render() {
    const { count } = this.state
   
    return (
      <div>
        <p>{count}</p>
        <button onClick={this.increase}>累加</button>
        {/* render props */}
        <Footer render={
          (text: string) => <p>{text}</p>
        }/>
      </div>
    )

    // return ReactDOM.createPortal(
    //   <div className='modal'>{this.props.children}</div>,
    //   document.body
    // )
  }
}

export default Demo