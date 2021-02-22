import React from '../_react'
import { useSelector, useDispatch } from 'react-redux'

import Interact from '../../utils/Interact';
import SvgClose from '../zhn-atoms/SvgClose';

import { toggleLayout } from '../../flux/layout/actions';

const { useRef, useCallback, useEffect } = React;

const CLASS_SHOW = 'show-popup';

const S = {
  BLOCK: {
    display: 'block'
  },
  NONE: {
    display: 'none'
  },
  SVG_CLOSE: {
    position: 'absolute',
    top: 16,
    right: 6
  }
}

const FlyPopup = ({
  style,
  storeKey,
  children
}) => {
  const _refPopup = useRef()
  , isShow = useSelector(state => state.layout[storeKey])
  , dispatch = useDispatch()
  , _hClose = useCallback(() => {
      dispatch(toggleLayout(storeKey))
  }, [dispatch, storeKey]);

  useEffect(()=>{
    Interact.makeDragable(_refPopup.current);
  },[])

  const _styleShow = isShow
     ? S.BLOCK
     : S.NONE
  , _classShow = isShow
      ? CLASS_SHOW
      : void 0;
  return (
    <div
         ref={_refPopup}
         className={_classShow}
         style={{...style, ..._styleShow}}
    >
      <SvgClose
         style={S.SVG_CLOSE}
         onClose={_hClose}
      />
      {children}
    </div>
  );
}

/*
FlyPopup.propTypes = {
   style: PropTypes.object,
   storeKey: PropTypes.string
}
*/

export default FlyPopup
