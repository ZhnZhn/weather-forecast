import React from '../_react'

const S = {
  CELL: {
    paddingBottom: '4px',
    cursor: 'pointer'
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
  style={{...S.CELL, ...style}}
  onClick={onClick}
>
  {children}
  <span style={titleStyle}>
    {title}
  </span>
</div>


export default LegendCell
