import React from '../_react';

import LegendCell from './LegendCell'
import SvgCircle from './SvgCircle';
import SvgRect from './SvgRect';
import S from './Label.Style';

const L_S = {
  ROOT : {
    marginTop: '1rem',
  },
  ITEM : {
    display: 'inline-block',
    marginRight: '1rem',
    paddingLeft: 4,
    paddingRight: 4,
    paddingBottom: 4
  }
};

const _crLabelStyle = (is, style) => is
  ? style
  : {...style, ...S.FILTERED};

const LegendHourly = ({ filtered, onFilter }) => {
  const _tempStyle = _crLabelStyle(!filtered.temp, S.SERIA)
  , _pressureStyle = _crLabelStyle(!filtered.pressure, S.PRESSURE)
  , _rainStyle = _crLabelStyle(!filtered.rain, S.RAIN)
  , _speedStyle = _crLabelStyle(!filtered.speed, S.SPEED);
  return (
    <div style={L_S.ROOT}>
      <LegendCell
        style={L_S.ITEM}
        titleStyle={_tempStyle}
        title="T"
        onClick={() => onFilter('temp')}
      >
        <SvgCircle {...S.CIRCLE_SERIA} />
      </LegendCell>
      <LegendCell
        style={L_S.ITEM}
        titleStyle={_pressureStyle}
        title="Pressure"
        onClick={() => onFilter('pressure')}
      >
        <SvgCircle {...S.CIRCLE_PRESSURE} />
      </LegendCell>
      <LegendCell
        style={L_S.ITEM}
        titleStyle={_rainStyle}
        title="Rain"
        onClick={() => onFilter('rain')}
      >
        <SvgRect {...S.RECT_RAIN} />
      </LegendCell>
      <LegendCell
        style={L_S.ITEM}
        titleStyle={_speedStyle}
        title="Speed"
        onClick={() => onFilter('speed')}
      >
        <SvgCircle {...S.CIRCLE_SPEED} />
      </LegendCell>
    </div>
  );
};

export default LegendHourly
