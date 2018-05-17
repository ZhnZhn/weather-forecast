//import React, { Component } from 'react';
import React from '../_react'

import SvgCircle from './SvgCircle';
import SvgRect from './SvgRect';
import S from './Label.Style';

const { Component } = React

const K = {
  T_DAY : 'tempDay',
  T_NIGHT : 'tempNight',
  T_MORN : 'tempMorn',
  T_EVE : 'tempEve',
  T_MAX : 'tempMax',
  T_MIN : 'tempMin',
  RAIN : 'rain',
  SPEED : 'speed'
}

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
  }
}

class LegendTemperature extends Component {

  shouldComponentUpdate(nextProps, nextState){
    if ( this.props !== nextProps && this.props.styles === nextProps.styles){
      return false;
    }
    return true;
  }

  render(){
    const { styles, onFilter } = this.props

    return (
      <div style={L.ROOT_DIV}>
         <div style={L.COL_1}>
            <div onClick={onFilter.bind(null, K.T_MORN)}>
               <SvgCircle {...S.CIRCLE_TEMP_MORN} />
               <span style={styles.tempMorn}>T Morn</span>
            </div>
            <div onClick={onFilter.bind(null, K.T_DAY)}>
               <SvgCircle {...S.CIRCLE_TEMP_DAY} />
               <span style={styles.tempDay}>T Day</span>
            </div>
         </div>
         <div style={L.COL_2}>
            <div onClick={onFilter.bind(null, K.T_EVE)}>
               <SvgCircle {...S.CIRCLE_TEMP_EVE} />
               <span style={styles.tempEve}>T Eve</span>
            </div>
            <div onClick={onFilter.bind(null, K.T_NIGHT)}>
               <SvgCircle {...S.CIRCLE_TEMP_NIGHT} />
               <span style={styles.tempNight}>T Night</span>
            </div>
         </div>
         <div style={Object.assign({}, L.COL_2, {marginLeft: '1rem'})}>
            <div onClick={onFilter.bind(null, K.T_MAX)}>
               <SvgCircle {...S.CIRCLE_TEMP_MAX} />
               <span style={styles.tempMax}>T Max</span>
            </div>
            <div onClick={onFilter.bind(null, K.T_MIN)}>
               <SvgCircle {...S.CIRCLE_TEMP_MIN} />
               <span style={styles.tempMin}>T Min</span>
            </div>
         </div>
         <div style={Object.assign({}, L.COL_2, {marginLeft: '1rem'})}>
            <div onClick={onFilter.bind(null, K.RAIN)}>
              <SvgRect {...S.RECT_RAIN} />
              <span style={styles.rain}>Rain</span>
            </div>
            <div onClick={onFilter.bind(null, K.SPEED)}>
              <SvgCircle {...S.CIRCLE_SPEED} />
              <span style={styles.speed}>Speed</span>
            </div>
         </div>
      </div>
     );
  }
}

export default LegendTemperature
