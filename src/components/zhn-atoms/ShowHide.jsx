import React from '../_react'

const SHOW_POPUP = 'show-popup'
const S = {
  SHOW : {
    display: 'block'
  },
  HIDE : {
    display : 'none'
  }
};

const ShowHide = (props) => {
    const {isShow, className, style, children} = props
    , _styleShow = isShow ? S.SHOW : S.HIDE
    , _classShow = isShow ? SHOW_POPUP : ''
    , _className = className
         ? `${className} ${_classShow}`
         : _classShow || void 0;
    return (
      <div
        className={_className}
        style={{ ...style, ..._styleShow }}
      >
        {children}
      </div>
    );
 }

export default ShowHide
