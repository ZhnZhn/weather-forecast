import React from '../_react'
//import PropTypes from 'prop-types'

import Router from '../dialogs/Router'
import RouterData from '../dialogs/RouterData'
import WrapperModalDialog from '../zhn-atoms/WrapperModalDialog'

const { Component } = React;

class ModalDialogContainer extends Component {

  /*
  static propTypes = {
    store: PropTypes.shape({
      subscribe: PropTypes.func
    })
  }
  */

  state = {
    isShow: false,
    inits: {},
    shows: {},
    data: {},
    dialogs: [],
    currentDialog: null
  }

  componentDidMount(){
    this.unsubscribe = this.props.store
      .subscribe(this._onStore);
  }
  componentWillUnmount(){
    this.unsubscribe();
  }
  _onStore = () => {
    const { store } = this.props
        , { modal } = store.getState()
        , { id:type } = modal;
    if (type && this.modal !== modal) {
      this.modal = modal
      const { inits, shows, data, dialogs } = this.state;
      if (!inits[type]){
        dialogs.push({ type : type, comp : Router[type] })
        data[type] = RouterData.getData(store, type)
        inits[type] = true
        shows[type] = true
        this.setState({
          isShow: true, currentDialog: type,
           shows, data, dialogs
         });
      } else {
        shows[type] = true
        this.setState({
          isShow: true, currentDialog: type,
          shows, data
        })
      }
    }
  }

  _handleClose = (type) => {
    const data = this.state.data[type] || {}
       , { onBeforeClose } = data;
    if (typeof onBeforeClose === 'function') {
      onBeforeClose()
    }
    this.setState((prevState) => {
      prevState.shows[type] = false
      return {
        isShow: false,
        currentDialog: null,
        shows: prevState.shows
      };
    })
  }

  _renderDialogs = () => {
    const { store } = this.props
        , { shows, data, dialogs } = this.state;

    return dialogs.map(dialog => {
      const { type, comp } = dialog;
      return React.createElement(comp, {
           key: type,
           isShow: shows[type],
           data: data[type],
           store: store,
           onClose: this._handleClose.bind(null, type)})
    })
  }

  render(){
    const { isShow, currentDialog } = this.state;
    return (
      <WrapperModalDialog
          isShow={isShow}
          onClose={this._handleClose.bind(null, currentDialog)}
      >
         {this._renderDialogs()}
     </WrapperModalDialog>
    )
  }
}

export default ModalDialogContainer
