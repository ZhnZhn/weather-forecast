import React from '../_react'

import TooltipContent from './TooltipContent'
import STYLE from './Label.Style'


const Row = ({ caption, value }) => {
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

const TooltipHourly = (props) => {
  const {active, payload} = props;
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
     <Row caption="Temp" value={temp}/>
     <Row caption="Pressure" value={pressure}/>
     <Row caption="Speed" value={speed}/>
     <Row caption="Rain" value={rain}/>
   </TooltipContent>
  );
}

export default TooltipHourly
