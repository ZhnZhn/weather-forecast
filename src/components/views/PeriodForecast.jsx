//import React from 'react';
import React from '../_react'

import OpenClose from '../zhn-atoms/OpenClose'
import C from '../styles/Color'

import Caption from './Caption';
import DayItem from './DayItem';

const S = {
  ROOT: {
    cursor: 'auto'
  },
  OPEN_CLOSE: {
    lineHeight: 1.5
  }
};

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
    <div style={S.ROOT}>
      <OpenClose
        rootStyle={S.OPEN_CLOSE}
        openColor={C.BROWN}
        isClickableCompAfter={true}
        CompAfter={<Caption
           style={captionStyle}
           forecast={forecast}
        />}
      >
        <div>
           {_renderForecast(dayStyle, forecast, onClickItem)}
        </div>
      </OpenClose>
    </div>
  );
}

export default PeriodForecast
