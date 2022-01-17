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

const S_MODAL = {
  position: 'static',
  width: 342,
  height: 285,
  margin: '70px auto 0px'
}
, S_TABS = {
  textAlign: 'left',
  marginLeft: 24
}
, S_TAB_SELECTED = { color: 'black' }
, S_CARD_ROOT = {
  position: 'relative',
  height: 200
}
, S_CARD_BUTTONS = {
  position: 'absolute',
  right: 4,
  bottom: 0,
  cursor: 'default'
};

class SettingsDialog extends Component {
  /*
  static propTypes = {
    isShow: PropTypes.bool,
    data: PropTypes.shape({
      onSet: PropTypes.func,
      onAir: PropTypes.func,
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

  _handleSetTheme = (item) => {
    const { theme, data } = this.props
        , { onSetTheme } = data
        , prevTheme = theme.themeName;
    onSetTheme(theme, item.value)
    if (prevTheme !== item.value) {
      this.forceUpdate()
    }
  }

  render(){
    const {
            theme,
            isShow,
            onClose,
            data
          } = this.props
        , { onSet, onAir } = data
        , TS = theme.createStyle(styleConfig);
    return (
         <ModalDialog
            style={{...S_MODAL, ...TS.R_DIALOG}}
            caption="User Settings"
            isShow={isShow}
            isWithButton={false}
            onClose={onClose}
         >
           <TabPane width="100%" tabsStyle={S_TABS}>
             <Tab
               title="API Key"
               selectedStyle={S_TAB_SELECTED}
              >
                <CardApiKey
                  style={S_CARD_ROOT}
                  buttonsStyle={S_CARD_BUTTONS}
                  onSet={onSet}
                  onClose={onClose}
                />
             </Tab>
             <Tab
               title="UI Theme"
               selectedStyle={S_TAB_SELECTED}
             >
                <CardUi
                  style={S_CARD_ROOT}
                  buttonsStyle={S_CARD_BUTTONS}
                  onSetTheme={this._handleSetTheme}
                  onAir={onAir}
                  onClose={onClose}
                />
             </Tab>
           </TabPane>
         </ModalDialog>
    );
  }
}

export default withTheme(SettingsDialog)
