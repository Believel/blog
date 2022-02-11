import React, { Component, ReactElement } from 'react';
import PropTypes from 'prop-types';
import pathToRegexp  from 'path-to-regexp';

interface Props {
  location: any;
  history: any;
  children: ReactElement[]
}
class Switch extends Component<Props> {
  static contextTypes = {
    location: PropTypes.object,
    history: PropTypes.object
  }
  constructor(props: Props) {
    super(props)
  }
  render() {
    let { pathname } = this.context.location
    console.log('pathname ' + pathname)
    let children = this.props.children
    for(let i = 0; i < children.length; i++) {
      let child = children[i]
      let { path } = child.props
      // 找到匹配的就直接返回，不在进行下次匹配了
      if (pathToRegexp(path, [], { end: false }).test(pathname)) {
        return child
      } 
    }
    return null
  }
}

export default Switch;