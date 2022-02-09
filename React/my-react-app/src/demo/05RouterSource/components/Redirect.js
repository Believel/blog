import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Redirect extends Component {
  static contextTypes = {
    history: PropTypes.object,
    location: PropTypes.object
  }
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    this.context.history.push(this.context.location.pathname)
  }
  render() {
    return null
  }
}

export default Redirect;