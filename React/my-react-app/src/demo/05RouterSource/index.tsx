// TODO 未整理
import React, { Suspense, lazy } from 'react';
import App from '../App';
import { HashRouter, Route, Switch} from './react-router-dom';
import Protected from './components/Protected';
import Login from './components/Login';
let Home  = (props, context) => {
  console.log(props)
  // {
  //   history : {
  //     action: "POP"
  //     block: function
  //     createHref: f
  //     go: f
  //     goBack: ƒ 
  //     goForward: ƒ 
  //     length: 13
  //     listen: ƒ 
  //     location: {pathname: "/", search: "", hash: "", state: undefined}
  //     push: ƒ 
  //     replace: ƒ 
  //   },
  //  location: {
  //      hash: ""
  //      pathname: "/"
  //      search: ""
  //      state: undefined
  //   },
  //  match: {
  //    isExact: true
  //    params: {}
  //    path: "/"
  //    url: "/"
  //  }
  // }
  return  <div>首页</div>
}
let User = lazy(() => import('./components/User'))
let Profile = () => <div>个人设置</div>

// 渲染的时候会先取当前的路径(location.hash),然后跟path进行匹配
const myRouter = () => 
  <HashRouter>
    <App>
      <Suspense fallback={<div>Loading...</div>}>
        {/* <Switch> */}
          <Route exact path="/home" component={Home}></Route>
          <Route exact path="/user" component={User}></Route>
          <Protected path="/profile" component={Profile}></Protected>
          <Route path="/login" component={Login}></Route>
        {/* </Switch> */}
      </Suspense>
    </App>
  </HashRouter>

export default myRouter