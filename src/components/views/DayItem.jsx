//import React from 'react';
import React from '../_react'

import dt from '../../utils/dt';

import IconVane from './IconVane';

const CL_DAY_ITEM = 'day-item';

const S = {
  ROOT_DIV : {
    display: 'inline-block',
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 10,
    transition: 'background-color 0.3s'
  },
  DAY : {
    color: '#8bc34a',
    marginBottom: 4,
    borderBottom: '2px solid #8bc34a',
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  PRESSURE : {
    display: 'block',
    marginBottom: -15,
    color: '#0d2339',
    textAlign: 'center',
    fontSize: '20px',
    fontWeight: 'bold'
  },
  ICON : {
    display: 'block',
    width: 60,
    height: 60,
    margin: '0 auto'
  },
  CELL_WIND : {
    marginTop: -10
  },
  WIND_SPEED : {
    color: '#3f51b5',
    fontSize: '20px',
    fontWeight: 'bold'
  },
  CELL_TEMP : {
    paddingTop: 4,
    paddingBottom: 4,
    textAlign: 'center'
  },
  TEMP_DAY : {
    color: '#ff9800',
    paddingLeft: 4,
    fontSize: '20px',
    fontWeight: 'bold'
  },
  TEMP_NIGHT : {
    color: '#434348',
    paddingLeft: 8,
    fontSize: '20px',
    fontWeight: 'bold'
  }
};

const roundProp = (obj={}, prop) => Math.round(obj[prop])
, _isNumber = (n) => typeof n === 'number' && n-n === 0
, _isFn = fn => typeof fn === 'function';

const DayItem = ({
  style,
  item={},
  onClick
}) => {
  const { weather, deg, speed, temp, dt:timestamp } = item
  , _speed = _isNumber(speed)
       ? speed.toFixed(2)
       : ''
  , day = dt.toShortDayOfWeek(timestamp)
  , pressure = roundProp(item, 'pressure')
  , icon = weather[0].icon
  , _srcIcon = icon.length === 3
      ? `./img/${icon}.png`
      : void 0
  , tempDay = roundProp(temp, 'day')
  , tempNight = roundProp(temp, 'night')
  , _focusableAttr = _isFn(onClick)
       ? {
           tabIndex: "-1",
           className: CL_DAY_ITEM,
           onClick: () => onClick(item)
         }
       : void 0;

  return (
    <div
       {..._focusableAttr}
       style={{...S.ROOT_DIV, ...style}}
     >
      <div style={S.DAY}>{day}</div>
      <span style={S.PRESSURE}>{pressure}</span>
      <img src={_srcIcon} style={S.ICON} />
      <div style={S.CELL_WIND}>
        <IconVane deg={deg} />
        <span style={S.WIND_SPEED}>
          {_speed}
        </span>
      </div>
      <div style={S.CELL_TEMP}>
        <span style={S.TEMP_DAY}>{tempDay}</span>
        <span style={S.TEMP_NIGHT}>{tempNight}</span>
      </div>
    </div>
  );
}

export default DayItem
