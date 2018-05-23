import React from '../_react'

import InputSelect from '../zhn-m-input/InputSelect'
import RaisedButton from '../zhn-atoms/RaisedButton'

const { Component } = React

const S = {
  SELECT: {
    ROOT: {
      width: '280px'
    }
  }
};

const DF_THEME = { caption: 'Grey', value: 'GREY' };
const _themeOptions = [
  { caption: 'Grey', value: 'GREY' },
  { caption: 'Sand', value: 'SAND' },
  { caption: 'White', value: 'WHITE' }
];

class CardUi extends Component {
  render(){
    const {
             style, buttonsStyle,
             onSetTheme, onClose
           } = this.props
    return (
      <div style={style}>
        <InputSelect
          styleConfig={S.SELECT}
          caption="Theme (Default: Grey)"
          initItem={DF_THEME}
          options={_themeOptions}
          onSelect={onSetTheme}
        />
        <div style={buttonsStyle}>
          <RaisedButton
            isPrimary={true}
            caption="Close"
            onClick={onClose}
          />
        </div>
      </div>
    );
  }
}

export default CardUi
