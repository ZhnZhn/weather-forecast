//import React , { Component } from 'react';
import React from '../_react'
import ThemeContext from './ThemeContext'

const { Component } = React;

const withTheme = (Wrapper) => class extends Component {
  render(){
    return (
      <ThemeContext.Consumer>
        { theme => <Wrapper {...this.props} theme={theme} />}
      </ThemeContext.Consumer>
    );
  }
}

export default withTheme
