import React, { Component } from 'react';

export default class UserAdd extends Component {
  constructor(props){
    super(props)
  }
  handleSubmit = () => {
    let username = this.username.value
    let user = { id:Date.now(), username}
    let userStr = localStorage.getItem('users')
    let users = userStr ? JSON.parse(userStr) : []
    users.push(user)
    localStorage.setItem('users', JSON.stringify(users))
    this.props.history.push('/user/list')
  }
  render() {
    return (
      <div>
        用户名： <input ref={input => this.username=input} type="text"/><br/>
        <button onClick={this.handleSubmit}>添加</button>
      </div>
    )
  }
}