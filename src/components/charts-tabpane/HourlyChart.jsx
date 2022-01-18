import { memo, useMemo } from '../uiApi';
import { useSelector } from 'react-redux';

import useSeriesFilter from './useSeriesFilter';
import Chart from '../charts/Chart';

import dt from '../../utils/dt';
import { sHourly } from '../../flux/selectors';

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
import STYLE from './Chart.Style';

const {
 Line,
 Bar,
 Legend
} = Chart;

const _isArr = Array.isArray;

const INITIAL_FILTERED = {
  temp: false,
  pressure: true,
  rain: true,
  speed: true
};

const INITIAL_DATA = [];

const _get3h = data => (data || {})['3h'] || null;

const _transformHourly = hourlyArr => hourlyArr
  .map(({ dt:timestamp, main, wind, rain, snow }) => {
    const { temp, pressure, humidity } = main || {}
    , { speed=null } = wind || {}
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

const _isNumber = n => typeof n === 'number';
const _isNumberGreaterZero = value => _isNumber(value) && value > 0
const _fHasData = (propName, isData) => (data) => {
  for(let i=0; i<data.length; i++) {
    if (isData(data[i][propName])) {
      return true;
    }
  }
  return false;
};
const _hasRain = _fHasData('rain', _isNumberGreaterZero);
const _hasSnow = _fHasData('snow', _isNumberGreaterZero);

const _crYAxisIds = (isRain, isSnow) => {
  const rain = isRain ? 3 : void 0
  , snow = rain
      ? isSnow ? 4 : 3
      : void 0
  , speed = rain
      ? snow ? 5 : 4
      : 3;
  return [rain, snow, speed];
};

const _crDataKey = (filtered, propName) => filtered[propName]
  ? 'empty'
  : propName;

const areEqual = () => true;

const HourlyChart = memo(() => {
  const [filtered, _hFilter] = useSeriesFilter(INITIAL_FILTERED)
  , hourlyArr = useSelector(state => sHourly.forecast(state))
  , data = useMemo(() => _isArr(hourlyArr)
     ? _transformHourly(hourlyArr)
     : INITIAL_DATA, [hourlyArr])
  , _isRain = useMemo(() => _hasRain(data), [data])
  , _isSnow = useMemo(() => _hasSnow(data), [data])
  , [rainId, snowId, speedId] = _crYAxisIds(_isRain, _isSnow);

  return (
    <ChartType1
      data={data}
      TooltipComp={TooltipHourly}
    >
      {crYAxisTemp(1, filtered)}
      {crYAxisPressure(2, filtered)}
      {_isRain && crYAxisRain(rainId, filtered)}
      {_isSnow && crYAxisSnow(snowId, filtered)}
      {crYAxisWindSpeed(speedId, filtered)}
      <Legend
         content={
             <LegendHourly
                isRain={_isRain}
                isSnow={_isSnow}
                filtered={filtered}
                onFilter={_hFilter}
             />
          }
      />

      <Line {...STYLE.LineTempNight}
          connectNulls={true}
          yAxisId={1}
          dataKey={_crDataKey(filtered, 'temp')}
      />
      <Line {...STYLE.LinePressure}
          connectNulls={true}
          yAxisId={2}
          dataKey={_crDataKey(filtered, 'pressure')}
      />
      {
        _isRain && <Bar {...STYLE.BarRain}
           yAxisId={rainId}
           dataKey={_crDataKey(filtered, 'rain')}
         />
      }
      {
        _isSnow && <Bar {...STYLE.BarSnow}
           yAxisId={snowId}
           dataKey={_crDataKey(filtered, 'snow')}
         />
      }
      <Line {...STYLE.LineSpeed}
          connectNulls={true}
          yAxisId={speedId}
          dataKey={_crDataKey(filtered, 'speed')}
       />
     </ChartType1>
  );
}, areEqual)

export default HourlyChart
