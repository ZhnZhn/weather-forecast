import React from '../_react'
//import PropTypes from 'prop-types';

import withTheme from '../hoc/withTheme'
import styleConfig from './Dialog.Style'

import ModalDialog from '../zhn-moleculs/ModalDialog';

import { sModal } from '../../flux/selectors'

const { Component } = React;

const S = {
  MODAL: {
    position: 'static',
    width: '335px',
    height: '285px',
    margin: '70px auto 0px'
  },
  MSG : {
    height: '200px',
    lineHeight: 1.2,
    padding: '16px',
    fontWeight: 600
  }
};

class ErrorDialog extends Component {
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

  render(){
    const {
            theme,
            isShow,
            store,
            onClose
          } = this.props
        , TS = theme.createStyle(styleConfig)
        , _errMsg = sModal.errMsg(store.getState());
    return (
      <ModalDialog
         style={{ ...S.MODAL, ...TS.R_DIALOG }}
         caption="Error Description"
         isShow={isShow}
         onClose={onClose}
      >
        <div style={S.MSG}>
          {_errMsg}
        </div>
      </ModalDialog>
    );
  }
}

export default withTheme(ErrorDialog)
