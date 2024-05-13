import { memo } from '../uiApi';
import LegendRowSvg from './LegendRowSvg';
import {
  S_TEMP_DAY,
  S_TEMP_MAX,
  S_CIRCLE_TEMP_MORN,
  S_CIRCLE_TEMP_DAY,
  S_CIRCLE_TEMP_MAX,
  S_PRESSURE,
  S_CIRCLE_PRESSURE,
  S_RAIN,
  S_RECT_RAIN,
  S_SNOW,
  S_RECT_SNOW,


  S_CIRCLE_TEMP_EVE,
  S_TEMP_NIGHT,
  S_CIRCLE_TEMP_NIGHT,
  S_TEMP_MIN,
  S_CIRCLE_TEMP_MIN,
  S_HUMIDITY,
  S_CIRCLE_HUMIDITY,
  S_SPEED,
  S_CIRCLE_SPEED
} from './Label.Style';

const S_ROW = { margin: '1rem 0 0 2rem' }
, CONFIGS_ROW_1 = [
{ id: 'tempDay', title: 'T Day', titleStyle: S_TEMP_DAY, svgStyle: S_CIRCLE_TEMP_DAY },
{ id: 'tempMorn', title: 'T Morn', titleStyle: S_TEMP_DAY, svgStyle: S_CIRCLE_TEMP_MORN },
{ id: 'tempMax', title: 'T Max', titleStyle: S_TEMP_MAX, svgStyle: S_CIRCLE_TEMP_MAX },
{ id: 'pressure', titleStyle: S_PRESSURE, svgStyle: S_CIRCLE_PRESSURE },
{ id: 'rain', titleStyle: S_RAIN, svgType: 'rect', svgStyle: S_RECT_RAIN },
{ id: 'snow', titleStyle: S_SNOW, svgType: 'rect', svgStyle: S_RECT_SNOW }
]
, CONFIGS_ROW_2 = [
{ id: 'tempEve', title: 'T Eve', titleStyle: S_TEMP_NIGHT, svgStyle: S_CIRCLE_TEMP_EVE },
{ id: 'tempNight', title: 'T Night', titleStyle: S_TEMP_NIGHT, svgStyle: S_CIRCLE_TEMP_NIGHT },
{ id: 'tempMin', title: 'T Min', titleStyle: S_TEMP_MIN, svgStyle: S_CIRCLE_TEMP_MIN },
{ id: 'humidity', titleStyle: S_HUMIDITY, svgStyle: S_CIRCLE_HUMIDITY },
{ id: 'speed', title: 'Wind', titleStyle: S_SPEED, svgStyle: S_CIRCLE_SPEED },
];

const LegendForecast = ({
  isNot,
  filtered,
  onFilter
}) => (
  <>
    <LegendRowSvg
      style={S_ROW}
      notIs={isNot}
      configs={CONFIGS_ROW_1}
      filtered={filtered}
      onFilter={onFilter}
    />
    <LegendRowSvg
      style={S_ROW}
      notIs={isNot}
      configs={CONFIGS_ROW_2}
      filtered={filtered}
      onFilter={onFilter}
    />
  </>
);

export default memo(LegendForecast)
