import React from '../_react'

import TooltipContent from './TooltipContent'
import TooltipRow2 from './TooltipRow2'
import TooltipRow1 from './TooltipRow1'
import STYLE from './Label.Style'

const TooltipForecast = (props) => {
  if (!props.active) {
    return null;
  }
  const { label, payload } = props
  , {
    tempMorn, tempDay,
    tempEve, tempNight,
    tempMin, tempMax,
    rain, speed,
    pressure,
    humidity
  } = (payload[0] || {}).payload || {};

  return (
    <TooltipContent caption={label}>
      <TooltipRow2 style1={STYLE.TEMP_DAY}
        t1="Morn" v1={tempMorn}
        t2="Day" v2={tempDay}
      />
      <TooltipRow2 style1={STYLE.TEMP_NIGHT}
        t1="Eve" v1={tempEve}
        t2="Night" v2={tempNight}
      />
      <TooltipRow2
        t1="Min" v1={tempMin} style1={STYLE.TEMP_MIN}
        t2="Max" v2={tempMax} style2={STYLE.TEMP_MAX}
      />
      <TooltipRow2
        t1="Rain" v1={rain} style1={STYLE.RAIN}
        t2="Wind" v2={speed} style2={STYLE.SPEED}
      />
      <TooltipRow1
        t="Pressure"
        v={pressure}
        style={STYLE.PRESSURE}
      />
      <TooltipRow1
        t="Humidity"
        v={humidity}
        style={STYLE.SPEED}
      />
    </TooltipContent>
  );
}

export default TooltipForecast
