import React from '../_react'
import { useSelector } from 'react-redux'

import Chart from '../charts/Chart'

import dt from '../../utils/dt';
import { sHourly } from '../../flux/selectors';

import LegendHourly from './LegendHourly';
import TooltipHourly from './TooltipHourly';
import STYLE from './Chart.Style';

const { useState, useCallback, useMemo, memo } = React

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
  {day: 'Page A', temp: 40 },
  {day: 'Page B', temp: 30 },
  {day: 'Page C', temp: 20 },
  {day: 'Page D', temp: 27 },
  {day: 'Page E', temp: 18 },
  {day: 'Page F', temp: 23 },
  {day: 'Page G', temp: 34 }
];

const _transformHourly = hourlyArr => hourlyArr
  .map(({ dt:timestamp, main, wind, rain }) => {
    const { temp, pressure, humidity } = main || {}
    , { speed=null } = wind || {}
    , _rain  = (rain || {})['3h'] || null
    , _dh = dt.toDayHour(timestamp);
    return {
      day : _dh,
      dt_text : `${_dh}:00`,
      temp : temp,
      pressure : pressure,
      humidity : humidity,
      speed : speed,
      rain : _rain
    };
})

const areEqual = () => true;

const HourlyChart = memo(() => {
  const [filtered, setFiltered] = useState(INITIAL_FILTERED)
  , _hFilter = useCallback(dataKey => {
    setFiltered(prevFiltered => {
      prevFiltered[dataKey] = !prevFiltered[dataKey]
      return {...prevFiltered};
    })
  }, [])
  , hourlyArr = useSelector(state => sHourly.forecast(state))
  , data = useMemo(() => _isArr(hourlyArr)
     ? _transformHourly(hourlyArr)
     : INITIAL_DATA, [hourlyArr]);
  
  return (
    <ResponsiveContainer width="100%" height={300} >

    <ComposedChart data={data} {...STYLE.HourlyChart}>
      <XAxis dataKey="day" {...STYLE.XAxis} />

      <YAxis
         yAxisId={1}
         orientation="right"
         width={45}
         label="°C"
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
         label="hPa"
         hide={filtered.pressure}
         {...STYLE.YAxisPressure}
      />
      <YAxis
         yAxisId={3}
         orientation="right"
         width={54}
         label="mm"
         dataKey="rain"
         hide={filtered.rain}
         {...STYLE.YAxisRain}
      />
      <YAxis
        yAxisId={4}
        orientation="right"
        width={45}
        label="m/s"
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
                 filtered={filtered}
                 onFilter={_hFilter}
             />
          }
      />

      <Line {...STYLE.LineTempNight}
          connectNulls={true}
          yAxisId={1}
          dataKey={filtered.temp ? "empty" : "temp"}
      />
      <Line {...STYLE.LinePressure}
          connectNulls={true}
          strokeDasharray="5 5"
          yAxisId={2}
          dataKey={filtered.pressure ? "empty" : "pressure"}
      />
      <Bar
         dataKey={filtered.rain ? "empty" : "rain"}
         yAxisId={3} barSize={20} fill="#0922a5"
      />
      <Line
          connectNulls={true}
          {...STYLE.LineSpeed}
          strokeDasharray="5 5"
          //strokeDasharray={false}
          yAxisId={4}
          dataKey={filtered.speed ? "empty" : "speed"}
      />

    </ComposedChart>

    </ResponsiveContainer>
  );
}, areEqual)

export default HourlyChart
