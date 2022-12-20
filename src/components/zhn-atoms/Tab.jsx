const CL_TAB = "tab"
, TAB_COLOR = '#2f7ed8'
, S_BT = {
  color: TAB_COLOR,
  borderBottom : `3px solid ${TAB_COLOR}`
}
, S_TITLE = { color: TAB_COLOR };

const Tab = ({
  id,
  title,
  isSelected,
  onClick
}) => {
  const [
    _btStyle,
    _titleStyle
  ] = isSelected
    ? [S_BT, S_TITLE]
    : [];
  return (
    <button
       type="button"
       className={CL_TAB}
       style={_btStyle}
       id={`tab-${id}`}
       role="tab"
       aria-selected={isSelected}
       aria-controls={`tabpanel-${id}`}
       tabIndex="0"
       onClick={onClick}
    >
       <span style={_titleStyle}>
         {title}
       </span>
    </button>
  );
};

export default Tab
