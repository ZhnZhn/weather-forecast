//import React, { Component } from 'react';
import React from '../_react'

import SvgCircle from './SvgCircle';
import SvgRect from './SvgRect';
import LegendCell from './LegendCell';
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
  },
  COL_3: {
    display: 'inline-block',
    marginLeft: '1rem'
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
    const { styles, onFilter } = this.props;

    return (
      <div style={L.ROOT_DIV}>
         <div style={L.COL_1}>
           <LegendCell
             onClick={onFilter.bind(null, K.T_MORN)}
             titleStyle={styles.tempMorn}
             title="T Morn"
           >
             <SvgCircle {...S.CIRCLE_TEMP_MORN} />
           </LegendCell>
           <LegendCell
             onClick={onFilter.bind(null, K.T_DAY)}
             titleStyle={styles.tempDay}
             title="T Day"
           >
             <SvgCircle {...S.CIRCLE_TEMP_DAY} />
           </LegendCell>
         </div>
         <div style={L.COL_2}>
           <LegendCell
             onClick={onFilter.bind(null, K.T_EVE)}
             titleStyle={styles.tempEve}
             title="T Eve"
           >
             <SvgCircle {...S.CIRCLE_TEMP_EVE} />
           </LegendCell>
           <LegendCell
             onClick={onFilter.bind(null, K.T_NIGHT)}
             titleStyle={styles.tempNight}
             title="T Night"
           >
             <SvgCircle {...S.CIRCLE_TEMP_NIGHT} />
           </LegendCell>
         </div>
         <div style={L.COL_3}>
           <LegendCell
             onClick={onFilter.bind(null, K.T_MAX)}
             titleStyle={styles.tempMax}
             title="T Max"
           >
             <SvgCircle {...S.CIRCLE_TEMP_MAX} />
           </LegendCell>
           <LegendCell
             onClick={onFilter.bind(null, K.T_MIN)}
             titleStyle={styles.tempMin}
             title="T Min"
           >
             <SvgCircle {...S.CIRCLE_TEMP_MIN} />
           </LegendCell>
         </div>
         <div style={L.COL_3}>
           <LegendCell
             onClick={onFilter.bind(null, K.RAIN)}
             titleStyle={styles.rain}
             title="Rain"
           >
             <SvgRect {...S.RECT_RAIN} />
           </LegendCell>
           <LegendCell
             onClick={onFilter.bind(null, K.SPEED)}
             titleStyle={styles.speed}
             title="Speed"
           >
             <SvgCircle {...S.CIRCLE_SPEED} />
           </LegendCell>
         </div>
      </div>
     );
  }
}

export default LegendTemperature
