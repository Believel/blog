import React from 'react'
import ReactDom from 'react-dom'

interface Props {
  count: number
}

interface State {
  count: number
}
export default class Counter extends React.Component<Props, State> {
  static defaultProps = {
    count: 0
  }
  constructor(props: Props ) {
    console.log('constructor')
    super(props)
  }
  readonly state = {
    count: this.props.count
  }
  componentWillMount() {
    console.log('1. componentWillMount 组件将要挂载')
  }

  handleClick = () => {
    this.setState((prevState: any) => (
      {
        count: prevState.count + 1
      }
    ))
  }

  componentDidMount() {
    console.log('3. componentDidMount 组件挂载完成')
  }
  render() {
    console.log('2. render 渲染')
    return (
      <div>
        父计数器：{this.state.count}
      </div>
    )
  }


}