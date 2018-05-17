//import React from 'react';
import React from '../_react'

import Caption from './Caption';
import DayItem from './DayItem';

const _renderForecast = (dayStyle, forecast, onClick) => {
  const { list=[] } = forecast
  return list.map((item, index) => {
     return (
         <DayItem key={index}
            style={dayStyle}
            item={item}
            onClick={onClick}
         />
     );
  })
}

const PeriodForecast = ({ dayStyle, forecast={}, captionStyle, onClickItem }) => {
  return (
    <div style={{ cursor: 'auto' }}>
      <Caption
         forecast={forecast}
         style={captionStyle}
      />
      <div>
         {_renderForecast(dayStyle, forecast, onClickItem)}
      </div>
    </div>
  );
}

export default PeriodForecast
