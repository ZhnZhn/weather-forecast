//import React from 'react';
import React from '../_react'

import STYLE from './Label.Style'

const TooltipTemperature = (props) => {
  if (!props.active) {
    return null;
  }

  const { label, payload } = props
  , value = payload[0].payload;
  //console.log(props);
  return (
    <div style={STYLE.ROOT_DIV} >
      <div>
        <span style={STYLE.DAY}>{label}</span>
      </div>
      <div style={{ paddingTop: '8px' }}>
         <span style={STYLE.LABEL}>Morn:</span>
         <span style={STYLE.TEMP_DAY}>{value.tempMorn}&nbsp;</span>
         <span style={STYLE.LABEL}>Day:</span>
         <span style={STYLE.TEMP_DAY}>{value.tempDay}&nbsp;</span>
      </div>
      <div style={{ paddingTop: '8px' }}>
        <span style={STYLE.LABEL}>Eve:</span>
        <span style={STYLE.TEMP_NIGHT}>{value.tempEve}&nbsp;</span>
        <span style={STYLE.LABEL}>Night:</span>
        <span style={STYLE.TEMP_NIGHT}>{value.tempNight}&nbsp;</span>
      </div>
      <div style={{ paddingTop: '8px' }}>
        <span style={STYLE.LABEL}>Min:</span>
        <span style={STYLE.TEMP_MIN}>{value.tempMin}&nbsp;</span>
        <span style={STYLE.LABEL}>Max:</span>
        <span style={STYLE.TEMP_MAX}>{value.tempMax}&nbsp;</span>
      </div>
      <div style={{ paddingTop: '8px' }}>
        <span style={STYLE.LABEL}>Rain:</span>
        <span style={STYLE.TEMP_MIN}>{value.rain}&nbsp;</span>
        <span style={STYLE.LABEL}>Speed:</span>
        <span style={STYLE.TEMP_MIN}>{value.speed}&nbsp;</span>
      </div>
    </div>
  );
}

export default TooltipTemperature
