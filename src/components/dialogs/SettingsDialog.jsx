import React from '../_react'
//import PropTypes from 'prop-types';

import withTheme from '../hoc/withTheme'
import styleConfig from './Dialog.Style'

import ModalDialog from '../zhn-moleculs/ModalDialog';
import SecretField from '../zhn-m-input/SecretField'
import InputSelect from '../zhn-m-input/InputSelect'
import RaisedButton from '../zhn-atoms/RaisedButton'

const { Component } = React;

const S = {
  MODAL: {
    position : 'static',
    width: '335px',
    height: '220px',
    margin: '70px auto 0px'
  },
  SECRET: {
    width: '280px'
  },
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

class SettingsDialog extends Component {
  /*
  static propTypes = {
    isShow: PropTypes.bool,
    data: PropTypes.shape({
      onSet: PropTypes.func
    }),
    onClose: PropTypes.func
  }
  */

  constructor(props){
    super()
    this.commandButtons = [
      <RaisedButton
        caption="Set & Close"
        onClick={this._handleSet}
      />
    ]
  }

  _isNextPropIsShowSame = (nextProps) => {
    return nextProps !== this.props
      && nextProps.isShow === this.props.isShow;
  }

  shouldComponentUpdate(nextProps, nextState){
    if ( this._isNextPropIsShowSame(nextProps) ) {
      return false;
    }
    return true;
  }


  _handleSet = () => {
    const { data, onClose } = this.props
        , { onSet } = data;
    onSet(this.inputApiKey.getValue())
    onClose()
  }
  _handleSetTheme = (item) => {
    const { theme, data } = this.props
        , { onSetTheme } = data
        , prevTheme = theme.themeName;
    onSetTheme(theme, item.value)
    if (prevTheme !== item.value) {
      this.forceUpdate()
    }
  }

  _refInput = c => this.inputApiKey = c

  render(){
    const {
            theme,
            isShow,
            onClose
          } = this.props
        , TS = theme.createStyle(styleConfig);
    return (
         <ModalDialog
            style={{ ...S.MODAL, ...TS.R_DIALOG }}
            caption="User Settings"
            isShow={isShow}
            commandButtons={this.commandButtons}
            onClose={onClose}
         >
           <SecretField
             ref={this._refInput}
             rootStyle={S.SECRET}
             caption="OpenWeatherMap API Key"
           />
           <InputSelect
             styleConfig={S.SELECT}
             caption="Theme (Default: Grey)"
             initItem={DF_THEME}
             options={_themeOptions}
             onSelect={this._handleSetTheme}
           />
         </ModalDialog>
    );
  }
}

export default withTheme(SettingsDialog)
