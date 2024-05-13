import LegendRowSvg from './LegendRowSvg';
import {
  S_PRESSURE,
  S_CIRCLE_PRESSURE,
  S_RAIN,
  S_RECT_RAIN,
  S_SNOW,
  S_RECT_SNOW,
  S_SPEED,
  S_CIRCLE_SPEED
} from './Label.Style';

const LS_ROOT = { marginTop: '1rem' }
, CONFIGS_ROW_1 = [
  {
    id: 'temp',
    title: 'T'
  },{
    id: 'pressure',
    titleStyle: S_PRESSURE,
    svgStyle: S_CIRCLE_PRESSURE
  },{
    id: 'rain',
    titleStyle: S_RAIN,
    svgType: 'rect',
    svgStyle: S_RECT_RAIN
  },{
    id: 'snow',
    titleStyle: S_SNOW,
    svgType: 'rect',
    svgStyle: S_RECT_SNOW
  },{
    id: 'speed',
    title: 'Wind',
    titleStyle: S_SPEED,
    svgStyle: S_CIRCLE_SPEED
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
