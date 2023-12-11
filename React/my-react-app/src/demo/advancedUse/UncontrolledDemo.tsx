import { Component, ReactNode, createRef } from 'react'
interface State {
  name: any
}

interface Props {
  [key:string]: any
}
export default class UncontrolledDemo extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      name: '张三'
    }
    this.nameInputRef = createRef<any>()
  }
  alertName = () => {
    const elem = this.nameInputRef.current
    alert(elem.value)
  }
  render(): ReactNode {
    return (
      <div>
        <input defaultValue={this.state.name} ref={this.nameInputRef}/>
        <button onClick={this.alertName}>change name</button>
      </div>
    )
  }
}