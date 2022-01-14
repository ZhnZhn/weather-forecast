import { memo, useMemo } from '../uiApi'
import { useSelector } from 'react-redux'

import useSeriesFilter from './useSeriesFilter'
import Chart from '../charts/Chart'

import dt from '../../utils/dt';
import { sHourly } from '../../flux/selectors';

import LegendHourly from './LegendHourly';
import TooltipHourly from './TooltipHourly';
import STYLE from './Chart.Style';
import SC from './SeriesColor';

const {
 CartesianGrid,
 Line,
 Bar,
 YAxis,
 XAxis,
 ResponsiveContainer,
 Legend,
 ComposedChart,
 Tooltip
} = Chart;

const _isArr = Array.isArray;

const INITIAL_FILTERED = {
  temp: false,
  pressure: true,
  rain: true,
  speed: true
};

const INITIAL_DATA = [
  {day: '01 08', temp: 35 },
  {day: '02 20', temp: 30 },
  {day: '03 08', temp: 20 },
  {day: '04 20', temp: 27 },
  {day: '05 08', temp: 18 },
  {day: '06 20', temp: 23 },
  {day: '07 08', temp: 34 }
];

const _crLabelColor = color => ({
  stroke: color,
  fill: color
});

const LABEL_POSITION = {
  position: "top",
  offset: 10
}
, LABEL_TEMPERATURE = {
  ...LABEL_POSITION,
  value: "°C"
}
, LABEL_PRESSURE = {
  ...LABEL_POSITION,
  ..._crLabelColor(SC.PRESSURE),
  value: "hPa"
}
, LABEL_RAIN = {
  ...LABEL_POSITION,
  ..._crLabelColor(SC.RAIN),
  value: "mm"
}
, LABEL_SNOW = {
  ...LABEL_POSITION,
  ..._crLabelColor(SC.SNOW),
  value: "mm"
}
, LABEL_WIND_SPEED = {
  ...LABEL_POSITION,
  ..._crLabelColor(SC.SPEED),
  value: "m/s"
};


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

const _fHasData = (propName, isData) => (data) => {
  for(let i=0; i<data.length; i++) {
    if (isData(data[i][propName])) {
      return true;
    }
  }
  return false;
};


const _isNumberGreaterZero = value => _isNumber(value) && value > 0
const _hasRain = _fHasData('rain', _isNumberGreaterZero)
const _hasSnow = _fHasData('snow', _isNumberGreaterZero)

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
    <ResponsiveContainer width="100%" height={300} >

    <ComposedChart data={data} {...STYLE.HourlyChart}>
      <XAxis dataKey="day" {...STYLE.XAxis} />

      <YAxis
         yAxisId={1}
         orientation="right"
         width={45}
         label={LABEL_TEMPERATURE}
         dataKey="temp"
         hide={filtered.temp}
      />
      <YAxis
         yAxisId={2}
         orientation="right"
         width={80}
         dataKey="pressure"
         type="number"
         domain={['dataMin', 'dataMax']}
         label={LABEL_PRESSURE}
         hide={filtered.pressure}
         {...STYLE.YAxisPressure}
      />
      {
        _isRain && <YAxis
            yAxisId={rainId}
            orientation="right"
            width={54}
            label={LABEL_RAIN}
            dataKey="rain"
            hide={filtered.rain}
            {...STYLE.YAxisRain}
         />
      }
      {
        _isSnow && <YAxis
            yAxisId={snowId}
            orientation="right"
            width={54}
            label={LABEL_SNOW}
            dataKey="snow"
            hide={filtered.snow}
            {...STYLE.YAxisSnow}
         />
      }
      <YAxis
        yAxisId={speedId}
        orientation="right"
        width={45}
        label={LABEL_WIND_SPEED}
        dataKey="speed"
        hide={filtered.speed}
        {...STYLE.YAxisSpeed}
      />

      <CartesianGrid {...STYLE.CartesianGrid} />
      <Tooltip
        offset={24}
        content={<TooltipHourly data={data} />}
      />
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
          strokeDasharray="5 5"
          yAxisId={2}
          dataKey={_crDataKey(filtered, 'pressure')}
      />
      {
        _isRain && <Bar
           dataKey={_crDataKey(filtered, 'rain')}
           yAxisId={rainId}
           barSize={20}
           fill="#0922a5"
         />
      }
      {
        _isSnow && <Bar
           dataKey={_crDataKey(filtered, 'snow')}
           yAxisId={snowId}
           barSize={20}
           fill={SC.SNOW}
         />
      }
      <Line
          connectNulls={true}
          {...STYLE.LineSpeed}
          strokeDasharray="5 5"
          //strokeDasharray={false}
          yAxisId={speedId}
          dataKey={_crDataKey(filtered, 'speed')}
      />

    </ComposedChart>

    </ResponsiveContainer>
  );
}, areEqual)

export default HourlyChart
