import React, { Component } from 'react';
import PropTypes from 'prop-types';

interface Props {
  history: any;
  location: any;
}
class Redirect extends Component<Props> {
  static contextTypes = {
    history: PropTypes.object,
    location: PropTypes.object
  }
  constructor(props: Props) {
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