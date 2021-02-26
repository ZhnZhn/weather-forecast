import React from '../_react'

import TooltipContent from './TooltipContent'
import TooltipRow1 from './TooltipRow1'

const TooltipUvi = ({ active, payload }) => {
  if (!active){
    return null;
  }
  const {
    day, uvi
  } = (payload[0] || {}).payload || {};

  return (
    <TooltipContent caption={`${day}:00`}>
      <TooltipRow1 t="UV index" v={uvi}/>
    </TooltipContent>
  );
}

export default TooltipUvi
