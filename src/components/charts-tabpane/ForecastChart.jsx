import React from '../_react'
import { useSelector } from 'react-redux'
//import PropTypes from 'prop-types';

import Chart from '../charts/Chart'

import dt from '../../utils/dt';
import { sForecast } from '../../flux/selectors';

import TooltipForecast from './TooltipForecast';
import LegendForecast from './LegendForecast';

import STYLE from './Chart.Style';
import SC from './SeriesColor'

const { useState, useCallback, useMemo, memo } = React;
const {
  CartesianGrid,
  Bar,
  Line,
  YAxis,
  XAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
  ComposedChart
} = Chart

const INITIAL_FILTERS = {
  tempDay : true,
  tempNight : false,
  tempMorn : false,
  tempEve : false,
  tempMax : false,
  tempMin : false,
  rain : false,
  speed : false,
  pressure : false,
  humidity : false
};

const INITIAL_DATA = [
  {day: '01 SU', tempDay: 35 },
  {day: '02 MO', tempDay: 30 },
  {day: '03 TU', tempDay: 20 },
  {day: '04 WE', tempDay: 27 },
  {day: '05 TH', tempDay: 18 },
  {day: '06 FR', tempDay: 23 },
  {day: '07 SA', tempDay: 34 }
];

const _transformForecast = (arr=[]) => arr
 .map(({ dt:timestamp, rain=0, speed, temp, pressure, humidity }) => {
   const {
       day=null, night=null, morn=null,
       eve=null, max=null, min=null
    } = temp || {};
    return {
       day: dt.toShortDayOfWeek(timestamp),
       tempDay: day,
       tempNight: night,
       tempMorn: morn,
       tempEve: eve,
       tempMax: max,
       tempMin: min,
       rain, speed,
       pressure,
       humidity
    };
});

const _filterData = (data=[], filters={}) => {
  const keys = Object.keys(filters);
  return data.map(item => {
     const _item = {...item};
     keys.forEach(dataKey => {
        if (!filters[dataKey]) {
          _item[dataKey] = null;
        }
     })
     return _item;
  });
};

const areEqual = () => true;

const ForecastChart = () => {
  const [filters, setFilters] = useState(INITIAL_FILTERS)
  , _hFilter = useCallback(dataKey => {
    setFilters(prevFilters => {
       prevFilters[dataKey] = !prevFilters[dataKey]
       return {...prevFilters};
    })
  }, [])
  , forecastArr = useSelector(state => {
    const recent = sForecast.recent(state);
    return recent
      ? sForecast.listById(state, recent)
      : void 0;
  })
  , data = useMemo(() => forecastArr
      ? _transformForecast(forecastArr)
      : INITIAL_DATA, [forecastArr])
  , _data = useMemo(() => _filterData(data, filters)
      , [data, filters]);

  return (
    <ResponsiveContainer width="100%" height={300} >

    <ComposedChart
       {...STYLE.ComposedChart}
       data={_data}
    >
      <XAxis dataKey="day" {...STYLE.XAxis} />
      <YAxis
         yAxisId={1}
         label={{
           value: "°C",
          //offset: -18,
          //position: 'insideTop'
          //angle: -90,
          //position: 'insideLeft'
          //offset: 10,
          //position: "insideTopRight",
          //position: "insideStart"
       }}/>
      <YAxis
         {...STYLE.YAxisRain}
         yAxisId={2}
         hide={!filters.rain}
         dataKey="rain"
         orientation="right" label="mm"
      />
      <YAxis
         {...STYLE.YAxisSpeed}
         hide={!filters.speed}
         yAxisId={3}
         dataKey="speed"
         orientation="right" label="m/s"
      />
      <YAxis
         {...STYLE.YAxisPressure}
         hide={!filters.pressure}
         yAxisId={4}
         dataKey="pressure"
         width={80}
         orientation="right" label="hPa"
         type="number"
         domain={['dataMin', 'dataMax']}
      />
      <YAxis
         {...STYLE.YAxisSpeed}
         hide={!filters.humidity}
         yAxisId={5}
         dataKey="humidity"
         orientation="right" label="%"
      />

      <CartesianGrid {...STYLE.CartesianGrid} />

      <Tooltip
        offset={24}
        content={<TooltipForecast data={data} />}
      />

      <Legend
        content={(
           <LegendForecast
               filters={filters}
               onFilter={_hFilter}
            />
        )}
      />
      <Bar
         yAxisId={2}
         dataKey="rain"
         barSize={20} fill={SC.RAIN}
      />
      <Line
        {...STYLE.LineSpeed}
        yAxisId={3}
        dataKey="speed"
      />
      <Line
        {...STYLE.LinePressure}
        yAxisId={4}
        dataKey="pressure"
      />
      <Line
        {...STYLE.LineHumidity}
        yAxisId={5}
        dataKey="humidity"
      />

      <Line
        {...STYLE.LineTempMin}
        yAxisId={1}
        dataKey="tempMin"
      />
      <Line
        {...STYLE.LineTempMax}
        yAxisId={1}
        dataKey="tempMax"
      />
      <Line
        {...STYLE.LineTempEve}
        yAxisId={1}
        dataKey="tempEve"
      />
      <Line
        {...STYLE.LineTempMorn}
        yAxisId={1}
        dataKey="tempMorn"
      />
      <Line
        {...STYLE.LineTempNight}
        yAxisId={1}
        dataKey="tempNight"
      />
      <Line
        {...STYLE.LineTempDay}
        yAxisId={1}
        dataKey="tempDay"
      />

    </ComposedChart>
   </ResponsiveContainer>

  );
}

export default memo(ForecastChart, areEqual)
