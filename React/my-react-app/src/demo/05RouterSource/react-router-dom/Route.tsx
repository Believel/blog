import React, { Component, ReactNode } from 'react'
import PropTypes, { ReactComponentLike } from 'prop-types';
import pathToRegexp  from 'path-to-regexp'; // 将字符串转成正则表达式

interface Props {
  location: any;
  history: any;
  path: string;
  extra: boolean;
  component: ReactComponentLike
  render: (props: any) => ReactNode

}
export default class Route extends Component<Props> {
  // 实例属性定义
  keys: any[];
  reg: string;


  static contextTypes = {
    location: PropTypes.object,
    history: PropTypes.object
  }
  constructor(props: Props) {
    super(props)
    let {path} = props;
    this.keys = []
    this.reg = pathToRegexp(path, this.keys, { end: false})
    // this.keys是参数变量组成的数组：例如/user/detail/:id/:name
    // 如果匹配到的话就是this.keys = ['id', 'name']
    this.keys = this.keys.map(key => key.name)

  }
  render() {
    
    let { path, component: Component, render } = this.props;
    console.log('Route render path ' + path)
    let { location } = this.context
    let result = location.pathname.match(this.reg)
    if (result) {
      let params =this.keys.length > 0 ? this.keys.reduce((memo, key, idx) => {
        memo[key] = result[idx + 1]
        return memo
      }, {}): {}
      let match = {
        url: path,
        params: params,
        path: window.location.hash.slice(1)
      }
      let props = {
        match: match,
        location: this.context.location,
        history: this.context.history

      }
      if(render) {
        return render(props)
      } else if (Component) {
        console.log("进来")
        return <Component {...props}/>
      } else {
        return null
      }
     
    } else {
      return null
    }
  }
}