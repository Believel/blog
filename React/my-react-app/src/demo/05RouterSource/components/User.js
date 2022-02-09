import React, { Component } from 'react';
import { Link, Route, Switch} from '../react-router-dom';
import UserAdd from './UserAdd';
import UserList from './UserList';
import UserDetail from './UserDetail';
import './user.css';
export default class User extends Component {
  render() {
    return (
      <div>
        <h4>这是用户页</h4>
        <div className="content">
          <nav className="left">
            <ul>
               <Link to="/user/list">用户列表</Link>
               <Link to="/user/add">添加用户</Link>
            </ul>
          </nav>
          <div>
            {/* <Switch> */}
              <Route path="/user/list" component={UserList}></Route>
              <Route path="/user/add" component={UserAdd}></Route>
              <Route path="/user/detail/:id" component={UserDetail}></Route>
            {/* </Switch> */}
          </div>
        </div>
      </div>
    )
  }
}