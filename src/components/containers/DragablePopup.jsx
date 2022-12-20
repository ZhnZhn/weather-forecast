import {
  useRef,
  useSelector,
  useMemo
} from '../uiApi';

import useXYMovable from '../hooks/useXYMovable';
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
      <SvgClose
         style={S_SVG_CLOSE}
         onClose={_hClose}
      />
      {children}
    </div>
  );
};

export default DragablePopup
