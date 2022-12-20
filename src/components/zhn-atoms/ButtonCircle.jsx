import useLayoutButton from './useLayoutButton';

const _assign = Object.assign
, CL_BT_CIRCLE = "bt-circle not-selected"
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
  const [
    isActive,
    _hClick
  ] = useLayoutButton(
    storeKey,
    onClick
  )
  , _style = _assign(
    {...S_ROOT, ...style},
    isActive && S_NOT_ACTIVE
  );

  return (
    <button
       type="button"
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
