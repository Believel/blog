import React from 'react'
export default class ClassComponent extends React.Component {
  showMessage = () => {
    // 在类中，你通过读取this.props或者this.state来实现，因为this本身时可变的。
    alert('Followed ' + this.props.user)
  }
  handleClick = () => {
    setTimeout(this.showMessage, 3000)
  }
  render() {
    return (
      <button onClick={this.handleClick}>Follow</button>
    )
  }
}