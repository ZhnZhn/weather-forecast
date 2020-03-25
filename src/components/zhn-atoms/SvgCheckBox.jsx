//import React, { Component } from 'react';
import React from '../_react'
//import PropTypes from "prop-types";

import C from '../styles/Color';

const { Component } = React;

const S = {
  DIV : {
    display: 'inline-block',
    width: 16,
    height: 16,
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
    style: PropTypes.object,
    value: PropTypes.bool,
    onCheck: PropTypes.func,
    onUnCheck: PropTypes.func
  }
  */

  _hClick = () => {
    const { value, onCheck, onUnCheck } = this.props;
    if (!value && _isFn(onCheck)){
      onCheck(this);
    } else if (_isFn(onUnCheck)){
      onUnCheck(this);
    }
  }

  render(){
    const { style, value } = this.props
    , _elChecked = value ? EL_CHECKED : null;
    return (
      <div
         style={{ ...S.DIV, ...style }}
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
}

export default SvgCheckBox
