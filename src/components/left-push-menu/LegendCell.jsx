import React from '../_react'

const CL = "legend-cell";

const S = {
  CELL: {    
    paddingLeft: '4px',
    paddingRight: '4px'
  }
};

const LegendCell = ({
  style,
  onClick,
  children,
  titleStyle,
  title=''
}) =>
<div
  className={CL}
  style={{...S.CELL, ...style}}
  onClick={onClick}
>
  {children}
  <span style={titleStyle}>
    {title}
  </span>
</div>


export default LegendCell
