import { memo } from '../uiApi';
import LegendRowSvg from './LegendRowSvg';
import S from './Label.Style';

const S_ROW = { margin: '1rem 0 0 2rem' }
, CONFIGS_ROW_1 = [
{ id: 'tempDay', title: 'T Day', titleStyle: S.TEMP_DAY, svgStyle: S.CIRCLE_TEMP_DAY },
{ id: 'tempMorn', title: 'T Morn', titleStyle: S.TEMP_DAY, svgStyle: S.CIRCLE_TEMP_MORN },
{ id: 'tempMax', title: 'T Max', titleStyle: S.TEMP_MAX, svgStyle: S.CIRCLE_TEMP_MAX },
{ id: 'pressure', titleStyle: S.PRESSURE, svgStyle: S.CIRCLE_PRESSURE },
{ id: 'rain', titleStyle: S.RAIN, svgType: 'rect', svgStyle: S.RECT_RAIN },
{ id: 'snow', titleStyle: S.SNOW, svgType: 'rect', svgStyle: S.RECT_SNOW }
]
, CONFIGS_ROW_2 = [
{ id: 'tempEve', title: 'T Eve', titleStyle: S.TEMP_NIGHT, svgStyle: S.CIRCLE_TEMP_EVE },
{ id: 'tempNight', title: 'T Night', titleStyle: S.TEMP_NIGHT, svgStyle: S.CIRCLE_TEMP_NIGHT },
{ id: 'tempMin', title: 'T Min', titleStyle: S.TEMP_MIN, svgStyle: S.CIRCLE_TEMP_MIN },
{ id: 'humidity', titleStyle: S.HUMIDITY, svgStyle: S.CIRCLE_HUMIDITY },
{ id: 'speed', title: 'Wind', titleStyle: S.SPEED, svgStyle: S.CIRCLE_SPEED },
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
