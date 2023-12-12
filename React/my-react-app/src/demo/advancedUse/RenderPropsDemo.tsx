import React from 'react'

interface Props {
  x: number;
  y: number
}
interface MouseProps {
  render: (props: Props) => React.ReactElement
}
class  Mouse extends React.Component<MouseProps, Props>{
  constructor(props: MouseProps) {
    super(props)
    this.state = {
      x: 0,
      y: 0
    }
  }
  handleMouseMove = (e: any) => {
    this.setState({
      x: e.clientX,
      y: e.clientY
    })
  }
  render(){
    const { render } = this.props
    return (
      <div style={{height: '500px'}} onMouseMove={this.handleMouseMove}>
        {render({x: this.state.x, y: this.state.y})}
      </div>
    )
  } 
}
const RenderPropsDemo = () => {
  return (
    <div>
      {/* render 是一个函数组件 */}
      <Mouse render={({x, y}) => <h1>The mouse position is: {x}, {y}</h1>} />
    </div>
  )
}

export default RenderPropsDemo