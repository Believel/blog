import React from 'react'
interface Props {
  x: number;
  y: number
}
// 高阶组件
const withMouse = (Component: any) => {
  class withMouseComponent extends React.Component<any, Props> {
    constructor(props: any) {
      super(props)
      this.state = {
        x: 0,
        y: 0
      }
    }
    onMouseMove = (event: any)=> {
      this.setState({
        x: event.clientX,
        y: event.clientY
      })
    }
    render() {
      return (
        <div style={{height: '500px'}} onMouseMove={this.onMouseMove}>
          <Component {...this.props} {...this.state}/>
        </div>
      )
    }
  }
  return withMouseComponent
}

const HocDemo = (props: Props) => {
  const { x, y } = props
  return (
    <div>
      <h1>The mouse position is: {x}, {y}</h1>
    </div>
  )
}
// 返回高阶组件
export default withMouse(HocDemo)