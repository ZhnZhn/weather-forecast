//import React from 'react';
import React from '../_react'

import dt from '../../utils/dt';

import IconVane from './IconVane';

const STYLE = {
  ROOT_DIV : {
    display : 'inline-block',
    paddingLeft : '12px',
    paddingRight : '12px',
    borderRadius : '10px',
    transition : 'background-color 0.3s'
  },
  DAY : {
    color: '#8bc34a',
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    borderBottom: '2px solid #8bc34a',
    marginBottom: '4px'
  },
  PRESSURE : {
    display: 'block',
    color: '#0D2339',
    textAlign: 'center',
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '-15px'
  },
  ICON : {
    display:'block',
    width:'60px',
    height:'60px',
    margin:'0 auto'
  },
  CELL_WIND : {
    marginTop : '-10px'
  },
  WIND_SPEED : {
    color: '#3f51b5',
    fontSize: '20px',
    fontWeight: 'bold'
  },
  CELL_TEMP : {
    paddingTop : '4px',
    paddingBottom : '4px',
    textAlign: 'center'
  },
  TEMP_DAY : {
    color: '#ff9800',
    paddingLeft: '4px',
    fontSize: '20px',
    fontWeight: 'bold'
  },
  TEMP_NIGHT : {
    color: '#434348',
    paddingLeft : '8px',
    fontSize: '20px',
    fontWeight: 'bold'
  }
}

const roundProp = (obj={}, prop) => {
  return Math.round(obj[prop])
}

const DayItem = (props) => {
  const { style, item={}, onClick } = props
  , { weather, deg, speed, temp, dt:timestamp } = item
  , day = dt.toShortDayOfWeek(timestamp)
  , pressure = roundProp(item, 'pressure')
  , icon = weather[0].icon
  , tempDay = roundProp(temp, 'day')
  , tempNight = roundProp(temp, 'night');

  return (
    <div
       style={Object.assign({}, STYLE.ROOT_DIV, style)}
       onClick={onClick.bind(null, item)}
       //onClick={ (el, evn) => onClick(el, item, evn) }
     >
      <div style={STYLE.DAY}>{day}</div>
      <span style={STYLE.PRESSURE}>{pressure}</span>
      <img src={`./img/${icon}.png`} style={STYLE.ICON} />
      <div style={STYLE.CELL_WIND}>
        <IconVane deg={deg} />
        <span style={STYLE.WIND_SPEED}>{speed}</span>
      </div>
      <div style={STYLE.CELL_TEMP}>
        <span style={STYLE.TEMP_DAY}>{tempDay}</span>
        <span style={STYLE.TEMP_NIGHT}>{tempNight}</span>
      </div>
    </div>
  );
}

DayItem.defaultProps = {
  onClick : () => {}
}

export default DayItem
