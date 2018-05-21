import React from '../_react'
//import PropTypes from 'prop-types';

import withTheme from '../hoc/withTheme'
import styleConfig from './Dialog.Style'

import ModalDialog from '../zhn-moleculs/ModalDialog';
import SecretField from '../zhn-m-input/SecretField'
import RowCheckBox from './RowCheckBox'
import InputSelect from '../zhn-m-input/InputSelect'
import RaisedButton from '../zhn-atoms/RaisedButton'

const { Component } = React;

const S = {
  MODAL: {
    position: 'static',
    width: '335px',
    height: '285px',
    margin: '70px auto 0px'
  },
  MODAL_CHILDREN: {
    paddingBottom: '20px'
  },
  SECRET: {
    width: '280px'
  },
  CHECK_BOX: {
    paddingLeft: '24px',
    paddingBottom: '6px',
    paddingRight: '24px'
  },
  CHECK_CAPTION: {
    display: 'inline'
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
    this.state = {
      isAllow: false
    }
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

  _checkAllow = () => {
    this.setState({ isAllow: true })
  }
  _uncheckAllow = () => {
    this.setState({ isAllow: false })
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
        , { isAllow } = this.state
        , TS = theme.createStyle(styleConfig);
    return (
         <ModalDialog
            style={{ ...S.MODAL, ...TS.R_DIALOG }}
            caption="User Settings"
            isShow={isShow}
            childrenStyle={S.MODAL_CHILDREN}
            commandButtons={this.commandButtons}
            onClose={onClose}
         >
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
