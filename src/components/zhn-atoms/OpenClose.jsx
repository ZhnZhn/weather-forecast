//import React, { Component } from 'react';
import React from '../_react'

import C from '../styles/Color'

const { Component } = React;

const CL = {
  SHOW_POPUP: 'show-popup',
  NOT_SELECTED: 'not-selected'
};

const DF = {
  OPEN_COLOR: C.YELLOW,
  CLOSE_COLOR: C.BLANK
};

const S = {
  ROOT_DIV: {
    lineHeight: 2
  },
  ROOT_SVG: {
    display: 'inline-block',
    width: '16px',
    height: '16px',
    marginLeft: '8px'
  },
  CAPTION: {
    color: C.SIREN,
    paddingLeft: '4px',
    verticalAlign: 'top',
    //color: 'rgba(164, 135, 212, 1)',
    fontFamily: 'Roboto, Arial Unicode MS, Arial, sans-serif',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer'
  },
  CURSOR: {
    cursor: 'pointer'
  },
  INLINE_BLOCK: {
    display: 'inline-block'
  },
  BLOCK: {
    display: 'block'
  },
  NONE: {
    display: 'none'
  }
};

const PATH_OPEN = "M 2,14 L 14,14 14,2 2,14";
const PATH_CLOSE = "M 2,2 L 14,8 2,14 2,2";

class OpenClose extends Component {
   static defaultProps = {
     openColor: DF.OPEN_COLOR,
     closeColor: DF.CLOSE_COLOR
   }
   constructor(props){
     super(props);
     const { isClose } = props;
     this.state = {
       isOpen: isClose ? false : true
     }
   }

  _handleClick = () => {
    this.setState(prev => ({ isOpen: !prev.isOpen }));
  }

  render(){
    const {
            rootStyle, caption,
            openColor, closeColor,
            CompAfter, isClickableCompAfter,
            childStyle, children
          } = this.props
        , { isOpen } = this.state;
    let _pathV, _fillV,
       _rootChildStyle, _rootChildCl;
    if (isOpen){
      _pathV = PATH_OPEN
      _fillV = openColor
      _rootChildStyle = S.BLOCK
      _rootChildCl = CL.SHOW_POPUP
    } else {
      _pathV = PATH_CLOSE
      _fillV = closeColor
      _rootChildStyle = S.NONE
      _rootChildCl = null;
    }

    return (
      <div style={{...S.ROOT_DIV, ...rootStyle}}>
        <div className={CL.NOT_SELECTED}>
          <div
            style={{ ...S.INLINE_BLOCK, ...S.CURSOR }}
            onClick={this._handleClick}
          >
            <div style={S.ROOT_SVG}>
               <svg
                  viewBox="0 0 16 16" width="100%" height="100%"
                  preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"
                  style={S.INLINE_BLOCK}
                >
                 <path
                    d={_pathV}
                    fill={_fillV}
                    strokeWidth="1"
                    stroke={openColor}
                 />
               </svg>
           </div>
           <span style={S.CAPTION} >
              {caption}
           </span>
           {CompAfter && isClickableCompAfter && CompAfter}
         </div>
         {!isClickableCompAfter && CompAfter}
      </div>
      <div
        className={_rootChildCl}
        style={{ ...childStyle, ..._rootChildStyle}}
      >
        {children}
      </div>
     </div>
    );
   }
}

export default OpenClose
