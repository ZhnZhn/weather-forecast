import LegendCellCircle from './LegendCellCircle';

import S from './Label.Style';

const S_MT_1REM = { marginTop: '1rem' }

const _crLabelStyle = (is, style=S.SERIA) => is
  ? {...style, ...S.FILTERED}
  : style;

const LegendAirForecast = ({
  filtered,
  onFilter
}) => {
  const _aqiStyle = _crLabelStyle(filtered.aqi, S.SPEED)
  , _coStyle = _crLabelStyle(filtered.co, S.PRESSURE)
  , _no2Style = _crLabelStyle(filtered.no2)
  , _o3Style = _crLabelStyle(filtered.o3)
  , _pm2_5Style = _crLabelStyle(filtered.pm2_5)
  , _pm10Style = _crLabelStyle(filtered.pm10)
  , _noStyle = _crLabelStyle(filtered.no)
  , _nh3Style = _crLabelStyle(filtered.nh3)
  , _so2Style = _crLabelStyle(filtered.so2);
  return (
    <>
      <div style={S_MT_1REM}>
        <LegendCellCircle
          title="AQI"
          titleStyle={_aqiStyle}
          circleStyle={S.CIRCLE_SPEED}
          onClick={() => onFilter('aqi')}
        />
        <LegendCellCircle
          title="NO2"
          titleStyle={_no2Style}
          onClick={() => onFilter('no2')}
        />
        <LegendCellCircle
          title="O3"
          titleStyle={_o3Style}
          onClick={() => onFilter('o3')}
        />
        <LegendCellCircle
          title="PM10"
          titleStyle={_pm10Style}
          onClick={() => onFilter('pm10')}
        />
        <LegendCellCircle
          title="PM2.5"
          titleStyle={_pm2_5Style}
          onClick={() => onFilter('pm2_5')}
        />
      </div>
      <div style={S_MT_1REM}>
        <LegendCellCircle
          title="CO"
          titleStyle={_coStyle}
          circleStyle={S.CIRCLE_PRESSURE}
          onClick={() => onFilter('co')}
        />
        <LegendCellCircle
          title="NO"
          titleStyle={_noStyle}
          onClick={() => onFilter('no')}
        />
        <LegendCellCircle
          title="NH3"
          titleStyle={_nh3Style}
          onClick={() => onFilter('nh3')}
        />
        <LegendCellCircle
          title="SO2"
          titleStyle={_so2Style}
          onClick={() => onFilter('so2')}
        />
      </div>
    </>
  );
};

export default LegendAirForecast
