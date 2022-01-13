const CL_BT = 'bt-raised'
, CL_BT_DIV = 'bt-raised__div'
, CL_BT_SPAN = 'bt-raised__span'

, S_PRIMARY_SPAN = { color: 'greenyellow' };

const RaisedButton = ({
  rootStyle,
  clDiv=CL_BT_DIV,
  caption,
  isPrimary,
  onClick
}) => {
  const _spanStyle = isPrimary
    ? S_PRIMARY_SPAN
    : void 0;
  return (
    <button
      tabIndex={0}
      className={CL_BT}
      style={rootStyle}
      onClick={onClick}
    >
      <div className={clDiv}>
        <span
           className={CL_BT_SPAN}
           style={_spanStyle}
        >
          {caption}
        </span>
      </div>
    </button>
  );
};

export default RaisedButton
