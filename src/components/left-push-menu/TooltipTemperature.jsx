//import React from 'react';
import React from '../_react'

import TooltipContent from './TooltipContent'
import STYLE from './Label.Style'


const _crValue = v => v == null
 ? ''
 : v;

const TitleValue = ({ t, v, style }) => (
  <>
   <span style={STYLE.LABEL}>{`${t}:`}</span>
   <span style={style}>{_crValue(v)}&nbsp;</span>
  </>
);

const Row = ({t1, v1, t2, v2, style1, style2}) => (
  <div style={STYLE.ROW}>
    <TitleValue t={t1} v={v1} style={style1} />
    <TitleValue t={t2} v={v2} style={style2||style1} />
  </div>
);


const TooltipTemperature = (props) => {
  if (!props.active) {
    return null;
  }
  const { label, payload } = props
  , {
    tempMorn, tempDay,
    tempEve, tempNight,
    tempMin, tempMax,
    rain, speed
  } = (payload[0] || {}).payload || {};
    
  return (
    <TooltipContent caption={label}>
      <Row style1={STYLE.TEMP_DAY}
        t1="Morn" v1={tempMorn}
        t2="Day" v2={tempDay}
      />
      <Row style1={STYLE.TEMP_NIGHT}
        t1="Eve" v1={tempEve}
        t2="Night" v2={tempNight}
      />
      <Row
        t1="Min" v1={tempMin} style1={STYLE.TEMP_MIN}
        t2="Max" v2={tempMax} style2={STYLE.TEMP_MAX}
      />
      <Row style1={STYLE.TEMP_MIN}
        t1="Rain" v1={rain}
        t2="Speed" v2={speed}
      />
    </TooltipContent>
  );
}

export default TooltipTemperature
