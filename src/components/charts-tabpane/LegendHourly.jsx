import LegendRowSvg from './LegendRowSvg';
import S from './Label.Style';

const LS_ROOT = { marginTop: '1rem' }
, CONFIGS_ROW_1 = [
  {
    id: 'temp',
    title: 'T'
  },{
    id: 'pressure',
    titleStyle: S.PRESSURE,
    svgStyle: S.CIRCLE_PRESSURE
  },{
    id: 'rain',
    titleStyle: S.RAIN,
    svgType: 'rect',
    svgStyle: S.RECT_RAIN
  },{
    id: 'snow',
    titleStyle: S.SNOW,
    svgType: 'rect',
    svgStyle: S.RECT_SNOW
  },{
    id: 'speed',
    title: 'Wind',
    titleStyle: S.SPEED,
    svgStyle: S.CIRCLE_SPEED
  }
];

const LegendHourly = ({
  isNot,
  filtered,
  onFilter
}) => (
  <LegendRowSvg
    style={LS_ROOT}
    notIs={isNot}
    configs={CONFIGS_ROW_1}
    filtered={filtered}
    onFilter={onFilter}
  />
);

export default LegendHourly
