import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props)
  }

  handleClick = ()=> {
    localStorage.setItem('login', true)
    this.props.history.push(this.props.location.state.from)
  }
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>登录</button>
      </div>
    )
  }
}

export default Login;