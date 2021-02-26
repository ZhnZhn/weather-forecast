import React from '../_react';

import SvgCircle from './SvgCircle';
import SvgRect from './SvgRect';
import LegendCell from './LegendCell';
import crForecastLegendStyle from './crForecastLegendStyle'
import S from './Label.Style';

const { memo } = React;

const K = {
  T_DAY : 'tempDay',
  T_NIGHT : 'tempNight',
  T_MORN : 'tempMorn',
  T_EVE : 'tempEve',
  T_MAX : 'tempMax',
  T_MIN : 'tempMin',
  RAIN : 'rain',
  SPEED : 'speed',
  PRESSURE: 'pressure',
  HUMIDITY: 'humidity'
};

const L = {
  ROOT_DIV : {
    marginLeft: '3rem',
    marginTop: '1rem'
  },
  COL_1 : {
    display: 'inline-block',
    marginRight: '1rem'
  },
  COL_2 : {
    display: 'inline-block'
  },
  COL_3: {
    display: 'inline-block',
    marginLeft: '1rem'
  }
};


const areEqual = (prevProps, nextProps) => prevProps
  .filters === nextProps.filters;

const LegendForecast = ({ filters, onFilter }) => {
  const styles = crForecastLegendStyle(filters);
  return (
  <div style={L.ROOT_DIV}>
     <div style={L.COL_1}>
       <LegendCell
         titleStyle={styles.tempMorn}
         title="T Morn"
         onClick={() => onFilter(K.T_MORN)}
       >
         <SvgCircle {...S.CIRCLE_TEMP_MORN} />
       </LegendCell>
       <LegendCell
         titleStyle={styles.tempDay}
         title="T Day"
         onClick={() => onFilter(K.T_DAY)}
       >
         <SvgCircle {...S.CIRCLE_TEMP_DAY} />
       </LegendCell>
     </div>
     <div style={L.COL_2}>
       <LegendCell
         titleStyle={styles.tempEve}
         title="T Eve"
         onClick={() => onFilter(K.T_EVE)}
       >
         <SvgCircle {...S.CIRCLE_TEMP_EVE} />
       </LegendCell>
       <LegendCell
         titleStyle={styles.tempNight}
         title="T Night"
         onClick={() => onFilter(K.T_NIGHT)}
       >
         <SvgCircle {...S.CIRCLE_TEMP_NIGHT} />
       </LegendCell>
     </div>
     <div style={L.COL_3}>
       <LegendCell
         titleStyle={styles.tempMax}
         title="T Max"
         onClick={() => onFilter(K.T_MAX)}
       >
         <SvgCircle {...S.CIRCLE_TEMP_MAX} />
       </LegendCell>
       <LegendCell
         titleStyle={styles.tempMin}
         title="T Min"
         onClick={() => onFilter(K.T_MIN)}
       >
         <SvgCircle {...S.CIRCLE_TEMP_MIN} />
       </LegendCell>
     </div>
     <div style={L.COL_3}>
       <LegendCell
         titleStyle={styles.rain}
         title="Rain"
         onClick={() => onFilter(K.RAIN)}
       >
         <SvgRect {...S.RECT_RAIN} />
       </LegendCell>
       <LegendCell
         titleStyle={styles.speed}
         title="Wind"
         onClick={() => onFilter(K.SPEED)}
       >
         <SvgCircle {...S.CIRCLE_SPEED} />
       </LegendCell>
     </div>
     <div style={L.COL_3}>
       <LegendCell
         titleStyle={styles.pressure}
         title="Pressure"
         onClick={() => onFilter(K.PRESSURE)}
       >
         <SvgCircle {...S.CIRCLE_PRESSURE} />
       </LegendCell>
       <LegendCell
         titleStyle={styles.humidity}
         title="Humidity"
         onClick={() => onFilter(K.HUMIDITY)}
       >
         <SvgCircle {...S.CIRCLE_HUMIDITY} />
       </LegendCell>
     </div>
  </div>
)}

export default memo(LegendForecast, areEqual)
