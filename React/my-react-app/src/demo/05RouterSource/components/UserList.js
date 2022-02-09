import React, { Component } from 'react';

export default class UserList extends Component {
  constructor(props){
    super(props)
    this.state = {
      users: []
    }
  }
  componentDidMount() {
    let userStr = localStorage.getItem('users')
    let users = userStr ? JSON.parse(userStr): []
    this.setState({users})
  }
  handleDetail = (user) => {
    console.log(user)
    this.props.history.push(`/user/detail/${user.id}` )
  }
  render() {
    return (
      <ul>
        {
          this.state.users.map(user => <li onClick={this.handleDetail.bind(this, user)} key={user.id}>{user.username}</li>)
        }
      </ul>
    )
  }
}