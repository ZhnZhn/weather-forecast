import { useCallback } from '../uiApi';
import { useSelector } from 'react-redux';

import useDragable from '../hooks/useDragable';
import handlers from '../../flux/handlers';
import SvgClose from '../zhn-atoms/SvgClose';

const { toggleLayout } = handlers
, CL_SHOW_POPUP = 'show-popup'
, S_BLOCK = { display: 'block' }
, S_NONE = { display: 'none' }
, S_SVG_CLOSE = {
   position: 'absolute',
   top: 16,
   right: 6
};

const DragablePopup = ({
  style,
  storeKey,
  children
}) => {
  const _refDragablePopup = useDragable()
  , isShow = useSelector(state => state.layout[storeKey])
  , _hClose = useCallback(() => {
      toggleLayout(storeKey)
  }, [storeKey])
  , _className = isShow ? CL_SHOW_POPUP : void 0
  , _style = isShow ? S_BLOCK : S_NONE;

  return (
    <div
       ref={_refDragablePopup}
       className={_className}
       style={{...style, ..._style}}
    >
      <SvgClose
         style={S_SVG_CLOSE}
         onClose={_hClose}
      />
      {children}
    </div>
  );
};

export default DragablePopup
