// 上下文
import React, { Component } from 'react';
import PropTypes from 'prop-types'

interface Props {
  [key: string]: any
}
interface State {
  color: string;
}

class Header extends Component {
  render() {
   return (
    <Title/>
   )
  }
}

class Title extends Component {
  static contextTypes = {
    color: PropTypes.string
  }
  render(): React.ReactNode {
      return (
        <div>
          <h3 style={{color: this.context.color}}>我是标题</h3>
        </div>
      )
  }
}

class Main extends Component {
  render(): React.ReactNode {
      return (
        <Content />
      )
  }
}

class Content extends Component {
  static contextTypes = {
    color: PropTypes.string,
    setColor: PropTypes.func
  }
  render(): React.ReactNode {
    return (
      <div>
        <p style={{color: this.context.color}}>我是内容</p>
        <button style={{color: this.context.color}} onClick={() => this.context.setColor('green')}>变绿</button>
      </div>
    )
  }
}

/**
 * 1. 在上层组件定义 childContextTypes 子上下文类型
 * 2. 在上层组件里还要定义一个getChildContext用来返回上下文对象
 * 3. 在要接收这些定义的上下文中的组件中定义contextTypes
 */
export default class HomePage extends Component<Props, State> {
  static childContextTypes = {
    color: PropTypes.string,
    setColor: PropTypes.func
  }
  getChildContext() {
    return {
      color: this.state.color,
      setColor: this.setColor
    }
  }
  constructor(props: Props) {
    super(props);
    this.state = {
      color: 'red'
    }
  }
  setColor = (color: string) => {
    this.setState({
      color
    })
  }
  render() {
    return (
      <div style={{borderColor: 'red'}}>
        <Header/>
        <Main />
      </div>
    )
  }
}