import React from '../_react';

import getPayload from './getPayload';
import TooltipContent from './TooltipContent';
import TooltipRow1 from './TooltipRow1';
import STYLE from './Label.Style';

const TooltipHourly = (props) => {
  const payload = getPayload(props);
  if (!payload){ return null; }

  const {
    dt_text,
    temp,
    pressure,
    rain,
    speed
  } = payload;

  return (
   <TooltipContent caption={dt_text}>
     <TooltipRow1 t="Temp" v={temp}/>
     <TooltipRow1 t="Pressure" v={pressure} style={STYLE.PRESSURE} />
     <TooltipRow1 t="Speed" v={speed} style={STYLE.SPEED} />
     <TooltipRow1 t="Rain" v={rain} s={STYLE.RAIN} />
   </TooltipContent>
  );
}

export default TooltipHourly
