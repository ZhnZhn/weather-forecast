import {
  useRef,
  useSelector,
  useMemo
} from '../uiApi';

import {
  S_BLOCK,
  S_NONE
} from '../styleFn';

import useXYMovable from '../hooks/useXYMovable';
import { toggleLayout } from '../../flux/handlers';
import BtSvgClose from '../zhn-atoms/BtSvgClose';

const CL_SHOW_POPUP = 'show-popup'
, S_SVG_CLOSE = {
   position: 'absolute',
   top: 16,
   right: 6
};

const DragablePopup = ({
  style,
  storeKey,
  color,
  children
}) => {
  const _refPopup = useRef()
  , [
    _selectIsShow,
    _hClose
  ]  = useMemo(() => [
     state => state.layout[storeKey],
     () => toggleLayout(storeKey)
  ], [storeKey])
  , isShow = useSelector(_selectIsShow)
  , [
    _style,
    _className
  ] = isShow
    ? [S_BLOCK, CL_SHOW_POPUP]
    : [S_NONE];

  useXYMovable(_refPopup)

  return (
    <div
       ref={_refPopup}
       className={_className}
       style={{...style, ..._style}}
    >
      <BtSvgClose
         color={color}
         style={S_SVG_CLOSE}
         onClose={_hClose}
      />
      {children}
    </div>
  );
};

export default DragablePopup
