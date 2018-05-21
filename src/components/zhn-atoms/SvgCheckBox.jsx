//import React, { Component } from 'react';
import React from '../_react'
//import PropTypes from "prop-types";

import C from '../styles/Color';

const { Component } = React;

const S = {
  DIV : {
    display: 'inline-block',
    width: '16px',
    height: '16px',
    cursor: 'pointer'
  },
  SVG : {
    display: 'inline-block'
  }
};

const EL_CHECKED = (
  <path
      d="M 2,3 L 8,14 14,3"
      strokeWidth="2"
      stroke={C.YELLOW}
      fill={C.BLANK}
  />
);

const _isFn = fn => typeof fn === 'function';

class SvgCheckBox extends Component {
  /*
  static propTypes = {
    value: PropTypes.bool,
    onCheck: PropTypes.func,
    onUnCheck: PropTypes.func
  }
  */

  constructor(props){
    super();

    const { value, onCheck, onUnCheck } = props;
    this._isOnCheck = _isFn(onCheck)
    this._isOnUnCheck = _isFn(onUnCheck)

    this.state = {
        isChecked: !!value,
    }
  }

  componentWillReceiveProps(nextProps){
    if (this.props !== nextProps
        && typeof nextProps.value !== 'undefined')
    {
      this.setState({ isChecked: !!nextProps.value })
    }
  }

  _hClick = () => {
    const {
           _isOnCheck, _isOnUnCheck,
            state, props
          } = this
        , { onCheck, onUnCheck } = props
        , { isChecked } = state;
    if (!isChecked && _isOnCheck){
      onCheck(this);
    } else if (_isOnUnCheck){
      onUnCheck(this);
    }
    this.setState({ isChecked: !isChecked });
  }

  render(){
    const { rootStyle } = this.props
        , { isChecked } = this.state
        , _elChecked = (isChecked)
            ? EL_CHECKED
            : null;
    return (
      <div
         style={{ ...S.DIV, ...rootStyle }}
         onClick={this._hClick}
      >
        <svg
            viewBox="0 0 16 16" width="100%" height="100%"
            preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"
            style={S.SVG}
        >
          <rect
             x="1" y="1"
             height="14" width="14"
             strokeWidth="2" rx="3"
             stroke={C.GREY}  fill={C.BLANK}
          />
          {_elChecked}
        </svg>
      </div>
    );
  }

  setUnchecked = () => {
    this.setState({ isChecked: false });
  }
}

export default SvgCheckBox
