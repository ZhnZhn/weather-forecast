import React from '../_react'
//import PropTypes from 'prop-types';

import withTheme from '../hoc/withTheme'
import styleConfig from './Dialog.Style'

import ModalDialog from '../zhn-moleculs/ModalDialog';

import TabPane from '../zhn-atoms/TabPane'
import Tab from '../zhn-atoms/Tab'
import CardApiKey from './CardApiKey'
import CardUi from './CardUi'

const { Component } = React;

const S = {
  MODAL: {
    position: 'static',
    width: '335px',
    height: '285px',
    margin: '70px auto 0px'
  },
  TABS: {
    textAlign: 'left',
    marginLeft: '24px'
  },
  TAB_SELECTED: {
    //color: '#2f7ed8'
    color: 'black'
  },
  CARD_ROOT: {
    position: 'relative',
    height: '200px'
  },
  CARD_BUTTONS: {
    position: 'absolute',
    right: '4px',
    bottom: 0,
    cursor: 'default'
  }
};


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
            isWithButton={false}
            onClose={onClose}
         >
           <TabPane width="100%" tabsStyle={S.TABS}>
             <Tab
               title="API Key"
               selectedStyle={S.TAB_SELECTED}
              >
                <CardApiKey
                  ref={this._refInput}
                  style={S.CARD_ROOT}
                  buttonsStyle={S.CARD_BUTTONS}
                  onSet={this._handleSet}
                  onClose={onClose}
                />
             </Tab>
             <Tab
               title="UI Theme"
               selectedStyle={S.TAB_SELECTED}
             >
                <CardUi
                  style={S.CARD_ROOT}
                  buttonsStyle={S.CARD_BUTTONS}
                  onSetTheme={this._handleSetTheme}
                  onClose={onClose}
                />
             </Tab>
           </TabPane>
         </ModalDialog>
    );
  }
}

export default withTheme(SettingsDialog)
