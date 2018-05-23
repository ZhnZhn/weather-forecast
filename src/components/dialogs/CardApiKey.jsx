import React from '../_react'

import SecretField from '../zhn-m-input/SecretField'
import RowCheckBox from './RowCheckBox'
import RaisedButton from '../zhn-atoms/RaisedButton'

const { Component } = React

const S  = {
  ROOT: {
    position: 'relative',
    height: '200px'
  },
  SECRET: {
    width: '280px'
  },
  CHECK_BOX: {
    paddingLeft: '24px',
    paddingTop: '16px',
    paddingRight: '24px'
  },
  CHECK_CAPTION: {
    display: 'inline'
  },
  BUTTONS: {
    position: 'absolute',
    right: '4px',
    bottom: 0,
    cursor: 'default'
  }
}

class CardApiKey extends Component {
  constructor(props){
    super(props)
    this.state = {
      isAllow: false
    }
  }

  _checkAllow = () => {
    this.setState({ isAllow: true })
  }
  _uncheckAllow = () => {
    this.setState({ isAllow: false })
  }

  _refInput = c => this._input = c

  render(){
    const {
            style, buttonsStyle,
            onClose, onSet
          } = this.props;
    const { isAllow } = this.state;
    return(
      <div style={style}>
        <SecretField
          ref={this._refInput}
          rootStyle={S.SECRET}
          caption="OpenWeatherMap API Key"
          isAllowRemember={isAllow}
          name="openweathermap"
        />
        <RowCheckBox
          rootStyle={S.CHECK_BOX}
          initValue={false}
          caption="Let Remember Enter of API Key by Browser Password Manager"
          captionStyle={S.CHECK_CAPTION}
          onCheck={this._checkAllow}
          onUnCheck={this._uncheckAllow}
        />
        <div style={buttonsStyle}>
          <RaisedButton
            caption="Set & Close"
            onClick={onSet}
          />
          <RaisedButton
            isPrimary={true}
            caption="Close"
            onClick={onClose}
          />
        </div>
      </div>
    );
  }

  getValue(){
    return this._input.getValue();
  }
}

export default CardApiKey
