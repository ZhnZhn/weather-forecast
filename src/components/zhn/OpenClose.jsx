import {
  S_BLOCK,
  S_NONE
} from '../styleFn';

import useToggle from '../hooks/useToggle';
import {
  COLOR_YELLOW,
  COLOR_BLANK
} from '../styles/Color';

import { Svg100 } from './Svg';

const CL_SHOW_POPUP = 'show-popup'
, CL_SELECT_NONE = 'select-none'

, DF_OPEN_COLOR = COLOR_YELLOW
, DF_CLOSE_COLOR = COLOR_BLANK

, S_ROOT_DIV = { lineHeight: 2 }
, S_ROOT_SVG = {
  display: 'inline-block',
  width: 16,
  height: 16,
  marginLeft: 8
}
, S_CAPTION = {
  paddingLeft: 4,
  verticalAlign: 'top',
  fontFamily: 'Roboto, Arial Unicode MS, Arial, sans-serif',
  fontWeight: 'bold',
  fontSize: '16px',
  cursor: 'pointer'
}
, S_CURSOR = { cursor: 'pointer' }
, S_INLINE_BLOCK = { display: 'inline-block' }
, S_DIV_TOGGLE = {
  ...S_INLINE_BLOCK,
  ...S_CURSOR
}

, PATH_OPEN = "M 2,14 L 14,14 14,2 2,14"
, PATH_CLOSE = "M 2,2 L 14,8 2,14 2,2";

const OpenClose = ({
  isInitial,
  style,
  caption,
  openColor=DF_OPEN_COLOR,
  closeColor=DF_CLOSE_COLOR,
  CompAfter,
  isClickableCompAfter,
  childStyle,
  children
}) => {
  const [isOpen, toggleIsOpen] = useToggle(isInitial);

  let _pathV, _fillV,
     _rootChildStyle, _rootChildCl;
  if (isOpen){
    _pathV = PATH_OPEN
    _fillV = openColor
    _rootChildStyle = S_BLOCK
    _rootChildCl = CL_SHOW_POPUP
  } else {
    _pathV = PATH_CLOSE
    _fillV = closeColor
    _rootChildStyle = S_NONE
    _rootChildCl = null;
  }
  return (
    <div style={{...S_ROOT_DIV, ...style}}>
      <div className={CL_SELECT_NONE}>
        <div
          style={S_DIV_TOGGLE}
          onClick={toggleIsOpen}
        >
          <div style={S_ROOT_SVG}>
            <Svg100 w="16" style={S_INLINE_BLOCK}>
              <path
                 d={_pathV}
                 fill={_fillV}
                 strokeWidth="1"
                 stroke={openColor}
              />
            </Svg100>
         </div>
         <span style={S_CAPTION} >
            {caption}
         </span>
         {CompAfter && isClickableCompAfter && CompAfter}
       </div>
       {!isClickableCompAfter && CompAfter}
    </div>
    <div
      className={_rootChildCl}
      style={{...childStyle, ..._rootChildStyle}}
    >
      {children}
    </div>
   </div>
  );
};

export default OpenClose
