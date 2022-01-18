import LegendRowSvg from './LegendRowSvg';
import S from './Label.Style';

const S_MT_1REM = { marginTop: '1rem' }
, CONFIGS_ROW_1 = [
  {
    id: 'aqi',
    titleStyle: S.SPEED,
    svgStyle: S.CIRCLE_SPEED
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
    titleStyle: S.PRESSURE,
    svgStyle: S.CIRCLE_PRESSURE
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
