import React from '../_react'

import TooltipContent from './TooltipContent'
import TooltipRow from './TooltipRow'

const TooltipUvi = ({ active, payload }) => {
  if (!active){
    return null;
  }
  const {
    day, uvi
  } = (payload[0] || {}).payload || {};

  return (
    <TooltipContent caption={`${day}:00`}>
      <TooltipRow caption="UV index" value={uvi}/>
    </TooltipContent>
  );
}

export default TooltipUvi
