const CL_BT = 'bt-raised'
, CL_BT_DIV = `${CL_BT}__div`
, CL_BT_SPAN = `${CL_BT}__span`

, S_PRIMARY_SPAN = { color: 'greenyellow' };

const RaisedButton = ({
  style,
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
      type="button"
      tabIndex={0}
      className={CL_BT}
      style={style}
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
