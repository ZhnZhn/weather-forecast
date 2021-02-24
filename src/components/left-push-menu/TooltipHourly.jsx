import React from '../_react'

import TooltipContent from './TooltipContent'
import TooltipRow from './TooltipRow'

const TooltipHourly = ({ active, payload }) => {

  if (!active){
    return null;
  }

  const {
    dt_text,
    temp,
    pressure,
    rain,
    speed
  } = (payload[0] || {}).payload || {};

  return (
   <TooltipContent caption={dt_text}>
     <TooltipRow caption="Temp" value={temp}/>
     <TooltipRow caption="Pressure" value={pressure}/>
     <TooltipRow caption="Speed" value={speed}/>
     <TooltipRow caption="Rain" value={rain}/>
   </TooltipContent>
  );
}

export default TooltipHourly
