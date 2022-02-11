import React, { Component } from 'react'
import PropTypes from 'prop-types';
import pathToRegexp  from 'path-to-regexp'; // 将字符串转成正则表达式

interface Props {
  location: any;
  history: any;
}
interface State {
  location: any;
}
export default class HashRouter extends Component<Props, State> {
  // 定义子级的参数类型
  static childContextTypes = {
    location: PropTypes.object,
    history: PropTypes.object
  }
  constructor(props: Props) {
    super(props)
    this.state = {
      location: {
        state: {},
        pathname: window.location.hash.slice(1) || '/'
      }
    };
  }
  // 定义返回给子级的值
  getChildContext() {
    let that = this;
    return {
      location: this.state.location,
      history: {
        push(path: any){
          if (typeof path === 'object') {
            // state是保存状态的
            let { pathname, state} = path
            that.setState({
              location: {...that.state.location, state}
            }, () => {
              window.location.hash = pathname
            })
          } else {
            window.location.hash = path
          }
        }
      }
    }
  }
  componentWillMount() {
    // 首次启动需要给默认hash值
    window.location.hash = window.location.hash || '/'
    let render = () => {
      // 想要重新渲染，比如只掉函数不传参是不执行的，没意义，所以要传个空对象，让他重新渲染
      this.setState({
        location: {
          ...this.state.location, pathname: window.location.hash.slice(1) || '/'
        }
      });
    }
    window.addEventListener('hashchange', render)
    
  }
  render() {
    return this.props.children
  }

}