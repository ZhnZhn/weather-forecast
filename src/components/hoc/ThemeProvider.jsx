//import { Children, Component } from 'react';
import React from '../_react'
import _PropTypes from 'prop-types';

const { Children, Component } = React
const PropTypes = _PropTypes || window.PropTypes;

class ThemeProvider extends Component {
  /*
  static propTypes = {
    theme: PropTypes.object,
    children: PropTypes.element
  }
  */
  static childContextTypes = {
    theme: PropTypes.object
  }

  getChildContext(){
    return { theme: this.theme };
  }

  constructor(props, context){
    super(props, context)
    this.theme = props.theme
  }

  render(){
    return Children.only(this.props.children);
  }
}

export default ThemeProvider
