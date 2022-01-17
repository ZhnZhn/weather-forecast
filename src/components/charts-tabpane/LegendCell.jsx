
const CL_LEGEND_CELL = "legend-cell"
, S_CELL = { padding: '0 4px' };

const LegendCell = ({
  style,
  onClick,
  children,
  titleStyle,
  title=''
}) => (
  <div
    className={CL_LEGEND_CELL}
    style={{...S_CELL, ...style}}
    onClick={onClick}
  >
    {children}
    <span style={titleStyle}>
      {title}
    </span>
  </div>
);

export default LegendCell
