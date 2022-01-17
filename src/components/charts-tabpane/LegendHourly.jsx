import LegendCell from './LegendCell';
import SvgCircle from './SvgCircle';
import SvgRect from './SvgRect';
import S from './Label.Style';

const LS_ROOT = { marginTop: '1rem' }
, LS_ITEM = {
  display: 'inline-block',
  marginRight: '1rem',
  padding: '0 4px 4px 4px'
};

const _crLabelStyle = (is, style) => is
  ? style
  : {...style, ...S.FILTERED};

const LegendHourly = ({
  isRain,
  isSnow,
  filtered,
  onFilter
}) => {
  const _tempStyle = _crLabelStyle(!filtered.temp, S.SERIA)
  , _pressureStyle = _crLabelStyle(!filtered.pressure, S.PRESSURE)
  , _rainStyle = _crLabelStyle(!filtered.rain, S.RAIN)
  , _snowStyle = _crLabelStyle(!filtered.snow, S.SNOW)
  , _speedStyle = _crLabelStyle(!filtered.speed, S.SPEED);

  return (
    <div style={LS_ROOT}>
      <LegendCell
        style={LS_ITEM}
        titleStyle={_tempStyle}
        title="T"
        onClick={() => onFilter('temp')}
      >
        <SvgCircle {...S.CIRCLE_SERIA} />
      </LegendCell>
      <LegendCell
        style={LS_ITEM}
        titleStyle={_pressureStyle}
        title="Pressure"
        onClick={() => onFilter('pressure')}
      >
        <SvgCircle {...S.CIRCLE_PRESSURE} />
      </LegendCell>
      {
        isRain && <LegendCell
          style={LS_ITEM}
          titleStyle={_rainStyle}
          title="Rain"
          onClick={() => onFilter('rain')}
        >
          <SvgRect {...S.RECT_RAIN} />
        </LegendCell>
      }
      {
        isSnow && <LegendCell
          style={LS_ITEM}
          titleStyle={_snowStyle}
          title="Snow"
          onClick={() => onFilter('snow')}
        >
          <SvgRect {...S.RECT_SNOW} />
        </LegendCell>
      }
      <LegendCell
        style={LS_ITEM}
        titleStyle={_speedStyle}
        title="Wind"
        onClick={() => onFilter('speed')}
      >
        <SvgCircle {...S.CIRCLE_SPEED} />
      </LegendCell>
    </div>
  );
};

export default LegendHourly
