import React, { Component } from 'react';
import PropTypes from 'prop-types';

interface LinkProps {
  history: any;
  to: string;
}
export default class Link extends Component {
  static contextTypes = {
    history: PropTypes.object
  }
  constructor(props: LinkProps) {
    super(props)
  }
  render() {

    return (
      <a onClick = {() => this.context.history.push(this.props.to)}>{this.props.children}</a>
    )
  }
}