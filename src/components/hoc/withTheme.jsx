//import React , { Component } from 'react';
import React from '../_react'
import _PropTypes from 'prop-types';

const { Component } = React
const PropTypes = _PropTypes || window.PropTypes;

const withTheme = (Wrapper) => class extends Component {
  static contextTypes = {
    theme: PropTypes.object
  }

  constructor(props, context){
    super(props, context)
  }

  render(){
    const { theme } = this.context
    return <Wrapper {...this.props} theme={theme} />
  }
}

export default withTheme
