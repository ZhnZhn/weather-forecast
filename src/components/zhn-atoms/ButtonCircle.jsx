import { useCallback } from '../uiApi';
import { useSelector } from 'react-redux';

const CL_BT_CIRCLE = "bt-circle not-selected"
, S_ROOT = {
  display: 'inline-block',
  color: '#80c040',
  width: 22,
  height: 22,
  border: '2px solid #80c040',
  borderRadius: '50%',
  verticalAlign: 'middle',
  fontWeight: 'bold'
}
, S_NOT_ACTIVE = { color: '#5b5b5b' };

const ButtonCircle = ({
  style,
  caption,
  title,
  storeKey,
  onClick
}) => {
  const isActive = useSelector(state => state.layout[storeKey])
  , _hClick = useCallback(() => {
     onClick(storeKey)
  }, [storeKey, onClick])
  , _styleRoot = {...S_ROOT, ...style}
  , _style = isActive
       ? _styleRoot
       : {..._styleRoot, ...S_NOT_ACTIVE};

  return (
    <button
       className={CL_BT_CIRCLE}
       style={_style}
       title={title}
       onClick={_hClick}
    >
       {caption}
    </button>
  );
};

export default ButtonCircle
