import React from '../_react'
import STYLE from './Label.Style'

const TooltipRow = ({ caption, value }) => {
  if (value == null) {
    return null;
  }
  return (
   <div style={STYLE.ROW}>
     <span style={STYLE.CAPTION}>{`${caption}:`}</span>
     <span style={STYLE.TEMP_MIN}>{value}</span>
   </div>
  );
}

export default TooltipRow
