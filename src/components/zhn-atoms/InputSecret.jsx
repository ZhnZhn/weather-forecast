//import React, { Component } from 'react';
import React from '../_react'

const { Component } = React
const S = {
  ROOT: {
    position: 'relative',
    display: 'inline-block',
    backgroundColor: '#E1E1CB',
    width: '250px'
  },
  INPUT: {
    background: 'transparent none repeat scroll 0 0',
    border: 'medium none',
    outline: 'medium none',
    height: '30px',
    paddingLeft: '10px',
    color: 'green',
    width: '100%',
    fontSize: '16px',
    fontWeight: 'bold'
  }
}

const _maskValue = (len=0) => {
  let i=0, str = '';
  for (i; i<len; i++){
    str = str + 'X'
  }
  return str;
}

class InputSecret extends Component {

  state = {
    value: ''
  }

  _handleChangeValue = (event) => {
    this.secret = event.target.value;
    this.setState({ value: _maskValue(this.secret.length) });
  }

  render(){
    const { placeholder, maxLength="32" } = this.props
        , { value } = this.state;
    return (
      <div style={S.ROOT}>
        <input
           name="secret"
           autoComplete="new-secret"
           autoCorrect="off"
           autoCapitalize="off"
           spellCheck={false}
           type="password"
           style={S.INPUT}
           translate={false}
           placeholder={placeholder}
           maxLength={maxLength}
           defaultValue={value}
           onChange={this._handleChangeValue}
        >
        </input>
      </div>
    )
  }

  getValue(){
    return this.secret;
  }
}

export default InputSecret
