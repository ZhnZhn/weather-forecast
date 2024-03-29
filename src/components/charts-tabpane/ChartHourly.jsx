import memoEqual from '../hoc/memoEqual';
import { Legend } from '../charts/Chart';
import dt from '../../utils/dt';
import { sHourly } from '../../flux/selectors';

import useSeriesFilter from './useSeriesFilter';
import useSelectorData from './useSelectorData';
import useIsNoData from './useIsNoData';
import ChartType1 from './ChartType1';
import {
  crYAxisTemp,
  crYAxisPressure,
  crYAxisWindSpeed,
  crYAxisRain,
  crYAxisSnow
} from './crYAxis';
import LegendHourly from './LegendHourly';
import TooltipHourly from './TooltipHourly';
import crListSeries from './crListSeries';
import {
  S_LINE_SPEED,
  S_LINE_PRESSURE,
  S_BAR_RAIN,
  S_BAR_SNOW
} from './Chart.Style';

const INITIAL_FILTERED = {
  temp: false,
  pressure: true,
  rain: true,
  speed: true
}
, _get3h = data => (data || {})['3h'] || null
, _transformHourly = (
  hourlyArr
) => hourlyArr
  .map(({ dt:timestamp, main, wind, rain, snow }) => {
    const {
      temp,
      pressure,
      humidity
    } = main || {}
    , {
      speed=null
    } = wind || {}
    , _dh = dt.toDayHour(timestamp);
    return {
      day: _dh,
      dt_text: `${_dh}:00`,
      temp,
      pressure,
      humidity,
      speed,
      rain: _get3h(rain),
      snow: _get3h(snow)
    };
})
, TEMP_ID = 1
, PRESSURE_ID = 2
, RAIN_ID = 3
, SNOW_ID = 4
, SPEED_ID = 5
, SERIA_CONFIGS = [
  {
    id: 'temp',
    yId: TEMP_ID
  },{
    id: 'pressure',
    yId: PRESSURE_ID,
    style: S_LINE_PRESSURE
  },{
    id: 'rain',
    type: 'bar',
    yId: RAIN_ID,
    style: S_BAR_RAIN
  },{
    id: 'snow',
    type: 'bar',
    yId: SNOW_ID,
    style: S_BAR_SNOW
  },{
    id: 'speed',
    yId: SPEED_ID,
    style: S_LINE_SPEED
  }
];

const ChartHourly = () => {
  const [
    filtered,
    _hFilter
  ] = useSeriesFilter(INITIAL_FILTERED)
  , data = useSelectorData(sHourly.forecast, _transformHourly)
  , isNot = useIsNoData(data);

  return (
    <ChartType1
      data={data}
      TooltipComp={TooltipHourly}
    >
      {crYAxisTemp(TEMP_ID, filtered)}
      {crYAxisPressure(PRESSURE_ID, filtered)}
      {!isNot.rain && crYAxisRain(RAIN_ID, filtered)}
      {!isNot.snow && crYAxisSnow(SNOW_ID, filtered)}
      {crYAxisWindSpeed(SPEED_ID, filtered)}
      <Legend
         content={
           <LegendHourly
             isNot={isNot}
             filtered={filtered}
             onFilter={_hFilter}
           />
        }
      />
      {crListSeries(SERIA_CONFIGS, filtered, isNot)}
    </ChartType1>
  );
};

export default memoEqual(ChartHourly)
