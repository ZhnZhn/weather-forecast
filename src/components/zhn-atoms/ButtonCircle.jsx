const CL_BT_CIRCLE = "bt-circle not-selected"
, S_BT = {
  display: 'inline-block',
  color: '#80c040',
  width: 22,
  height: 22,
  border: '2px solid #80c040',
  borderRadius: '50%',
  verticalAlign: 'middle',
  fontWeight: 'bold'
}
, S_NOT_ACTIVE = {
  color: '#5b5b5b'
};

const ButtonCircle = ({
  isActive,
  style,
  caption,
  title,
  onClick
}) => {
  const _style = {
    ...S_BT,
    ...style,
    ...(isActive && S_NOT_ACTIVE)
  };
  return (
    <button
       type="button"
       className={CL_BT_CIRCLE}
       style={_style}
       title={title}
       onClick={onClick}
    >
       {caption}
    </button>
  );
};

export default ButtonCircle
