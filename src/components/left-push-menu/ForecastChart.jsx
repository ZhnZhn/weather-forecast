import React from '../_react'
import { useSelector } from 'react-redux'
//import PropTypes from 'prop-types';

import Chart from '../charts/Chart'

import dt from '../../utils/dt';
import { sForecast } from '../../flux/selectors';

import TooltipTemperature from './TooltipTemperature';
import LegendTemperature from './LegendTemperature';

import STYLE from './Chart.Style';
import LABEL from './Label.Style';

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
  tempNight : true,
  tempMorn : false,
  tempEve : false,
  tempMax : false,
  tempMin : false,
  rain : true,
  speed : true
};

const INITIAL_DATA = [
  {day: 'Page A', tempDay: 40, tempNight: 30},
  {day: 'Page B', tempDay: 30, tempNight: 30},
  {day: 'Page C', tempDay: 20, tempNight: 30},
  {day: 'Page D', tempDay: 27, tempNight: 30},
  {day: 'Page E', tempDay: 18, tempNight: 30},
  {day: 'Page F', tempDay: 23, tempNight: 30},
  {day: 'Page G', tempDay: 34, tempNight: 30}
];

const _transformForecast = (arr=[]) => arr
 .map(({ dt:timestamp, rain=0, speed, temp }) => {
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
       rain, speed
    };
});


const _filterData = (data=[], filters={}) => {
  if (filters.length === 0){
    return data;
  }
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
}

const areEqual = () => true;

const ForecastChart = memo(() => {
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

    <ComposedChart data={_data} {...STYLE.ComposedChart}>
      <XAxis dataKey="day" {...STYLE.XAxis} />
      <YAxis label={{
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
         yAxisId={1} dataKey="rain" orientation="right" label="mm"
         {...STYLE.YAxisRain}
      />
      <YAxis
         hide={!filters.speed}
         yAxisId={2} dataKey="speed" orientation="right" label="m/s"
         {...STYLE.YAxisSpeed}
      />

      <CartesianGrid {...STYLE.CartesianGrid} />

      <Tooltip
        offset={24}
        content={<TooltipTemperature data={data} />}
      />

      <Legend
        content={
           <LegendTemperature
               styles={LABEL.fnLegendLabel(filters)}
               onFilter={_hFilter}
            />
        }
      />
      <Bar
         dataKey="rain"
         yAxisId={1} barSize={20} fill="#0922a5"
      />

      <Line dataKey="speed" yAxisId={2} {...STYLE.LineSpeed} />

      <Line dataKey="tempMin" {...STYLE.LineTempMin} />
      <Line dataKey="tempMax" {...STYLE.LineTempMax} />

      <Line dataKey="tempEve" {...STYLE.LineTempEve} />
      <Line dataKey="tempMorn" {...STYLE.LineTempMorn} />
      <Line dataKey="tempNight" {...STYLE.LineTempNight} />
      <Line dataKey="tempDay" {...STYLE.LineTempDay} />

    </ComposedChart>

    </ResponsiveContainer>
  );
}, areEqual)

export default ForecastChart
