//import React, { Component } from 'react';
import React from '../_react'

import Interact from '../../utils/Interact';
import SvgClose from '../zhn-atoms/SvgClose';

import { toggleLayout } from '../../flux/layout/actions';

const { Component } = React;

const CLASS_SHOW = 'show-popup';

const STYLE = {
  BLOCK : {
    display : 'block'
  },
  NONE : {
    display : 'none'
  },
  SVG_CLOSE : {
    position: 'absolute',
    top: '16px',
    right: '6px'
  }
}

class FlyPopup extends Component {

  /*
  static propTypes = {
     rootStyle: PropTypes.object,
     store: PropTypes.object,
     storeKey: PropTypes.string
  }
  */

  constructor(props){
    super(props);
    const { store, storeKey } = props;
    const state = store.getState();
    this.state = {
      isShow : state.layout[storeKey]
    }
  }

  componentDidMount(){
     Interact.makeDragable(this.domRootDiv);
     const { store } = this.props;
     this.unsubsribe = store.subscribe(this._onStore)
  }
  _onStore = () => {
    const { store, storeKey } = this.props
    , { layout } = store.getState()
    , { isShow } = this.state;
    if (layout[storeKey] !== isShow){
      this.setState({ isShow : layout[storeKey] })
    }
  }
  componetWillUnmount(){
    this.unsubsribe()
  }

  handleClose = () => {
    const { store, storeKey } = this.props;
    store.dispatch(toggleLayout(storeKey))
  }

  _refRootDiv = c => this.domRootDiv = c

  render(){
    const { children, rootStyle } = this.props
        , { isShow } = this.state
        , _styleShow = isShow
              ? STYLE.BLOCK
              : STYLE.NONE
        , _classShow = isShow
              ? CLASS_SHOW
              : undefined;
    return (
      <div
           ref={this._refRootDiv}
           className={_classShow}
           style={{ ...rootStyle, ..._styleShow }}
      >
        <SvgClose
           style={STYLE.SVG_CLOSE}
           onClose={this.handleClose}
        />
        {children}
      </div>
    );
  }
}

export default FlyPopup
