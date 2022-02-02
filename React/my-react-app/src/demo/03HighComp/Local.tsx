import React, { Component } from 'react';
interface Props {

}
interface State {
  data: string
}
// 定义高阶组件：高阶组件是一个函数，必须接收一个组件，返回一个新的组件
// 作用：复用重复的代码逻辑
export default function(OldComponent: any, name: string, defauleValue: string) {
  class NewComponent extends Component<Props, State> {
    constructor(props: Props) {
      super(props);
      this.state = {
        data: ''
      }
    }
    componentDidMount() {
      this.setState({
        data: localStorage.getItem(name) || defauleValue
      })
    }
    save = (e: any) => {
      localStorage.setItem(name, e.target.value)
    }
    render() {
      return (
        <OldComponent data={this.state.data} save={this.save} />
      )
    }
  }

  return NewComponent
}