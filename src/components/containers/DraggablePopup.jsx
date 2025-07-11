import {
  useRef,
  useSelector,
  useMemo
} from '../uiApi';

import {
  CL_BG,
  S_BLOCK,
  S_NONE
} from '../styleFn';

import crCn from '../zhn-utils/crCn';

import useXYMovable from '../hooks/useXYMovable';
import { toggleLayout } from '../../flux/handlers';
import BtSvgClose from '../zhn/BtSvgClose';

const CL_SHOW_POPUP = 'show-popup'
, S_SVG_CLOSE = {
   position: 'absolute',
   top: 16,
   right: 12
};

const DraggablePopup = ({
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
       className={crCn(CL_BG, _className)}
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

export default DraggablePopup
