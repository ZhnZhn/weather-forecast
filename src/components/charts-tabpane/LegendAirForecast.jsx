import LegendRowSvg from './LegendRowSvg';
import {
  S_SPEED,
  S_CIRCLE_SPEED,
  S_PRESSURE,
  S_CIRCLE_PRESSURE
} from './Label.Style';

const S_MT_1REM = { marginTop: '1rem' }
, CONFIGS_ROW_1 = [
  {
    id: 'aqi',
    titleStyle: S_SPEED,
    svgStyle: S_CIRCLE_SPEED
  },{
    id: 'no2'
  },{
    id: 'o3'
  },{
    id: 'pm10',
    title: 'PM10'
  },{
    id: 'pm2_5',
    title: 'PM2.5',
  }
]
, CONFIGS_ROW_2 = [
  {
    id: 'co',
    titleStyle: S_PRESSURE,
    svgStyle: S_CIRCLE_PRESSURE
  },{
    id: 'no'
  },{
    id: 'nh3'
  },{
    id: 'so2'
  }
];

const LegendAirForecast = ({
  filtered,
  onFilter
}) => (
  <>
    <LegendRowSvg
      style={S_MT_1REM}
      configs={CONFIGS_ROW_1}
      filtered={filtered}
      onFilter={onFilter}
    />
    <LegendRowSvg
      style={S_MT_1REM}
      configs={CONFIGS_ROW_2}
      filtered={filtered}
      onFilter={onFilter}
    />
  </>
);

export default LegendAirForecast
