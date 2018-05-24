//import React, { Component } from 'react';
import React from '../_react'

import SvgCircle from './SvgCircle';
import S from './Label.Style';

const { Component } = React

const CL = 'legend-cell';

const L_S = {
  ROOT : {
    marginTop: '1rem',
  },
  ITEM : {
    display: 'inline-block',
    marginRight : '1rem',
    paddingLeft: '4px',
    paddingRight: '4px',
    paddingBottom: '4px'
  }
};

const _fnLabelStyle = (is) => {
  return is
    ? L_S.LABEL
    : { ...L_S.LABEL, ...S.FILTERED };
}

class LegendHourly extends Component {
  render(){
    const { filtered, onFilter } = this.props
    , _tempStyle = _fnLabelStyle(!filtered.temp)
    , _pressureStyle = _fnLabelStyle(!filtered.pressure)
    , _rainStyle = _fnLabelStyle(!filtered.rain)
    , _speedStyle = _fnLabelStyle(!filtered.speed)
    return (
      <div style={L_S.ROOT}>
        <span
          className={CL}
          style={L_S.ITEM}
          onClick={onFilter.bind(null, 'temp')}
        >
          <SvgCircle {...S.CIRCLE_TEMP_NIGHT} />
          <span style={_tempStyle}>T</span>
        </span>
        <span
          className={CL}
          style={L_S.ITEM}
          onClick={onFilter.bind(null, 'pressure')}
        >
          <SvgCircle {...S.CIRCLE_PRESSURE} />
          <span style={_pressureStyle}>Pressure</span>
        </span>
        <span
          className={CL}
          style={L_S.ITEM}
          onClick={onFilter.bind(null, 'rain')}
        >
          <SvgCircle {...S.CIRCLE_RAIN} />
          <span style={_rainStyle}>Rain</span>
        </span>
        <span
          className={CL}
          style={L_S.ITEM}
          onClick={onFilter.bind(null, 'speed')}
        >
          <SvgCircle {...S.CIRCLE_SPEED} />
          <span style={_speedStyle}>Speed</span>
        </span>
      </div>
    );
  }
}

export default LegendHourly
