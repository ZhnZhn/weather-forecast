import React from '../_react'
import { useSelector } from 'react-redux'
import dt from '../../utils/dt';

import Chart from '../charts/Chart'
import { sUV } from '../../flux/selectors';

import TooltipUvi from './TooltipUvi'
import STYLE from './Chart.Style';

const { useMemo } = React

const {
 CartesianGrid,
 Line,
 YAxis,
 XAxis,
 ResponsiveContainer,
 LineChart,
 Tooltip
} = Chart;

const _transformUvi = hourlyArr => (hourlyArr || [])
  .map(({ dt:timestamp, uvi }) => {
    return {
      day: dt.toDayHour(timestamp),
      uvi
    };
})

const UviChart = () => {
  const uviArr = useSelector(sUV.forecast)
  , data = useMemo(() => _transformUvi(uviArr),
      [uviArr]);

  return (
    <ResponsiveContainer width="100%" height={300} >

    <LineChart data={data} {...STYLE.HourlyChart} >
      <XAxis dataKey="day" {...STYLE.XAxis} />

      <YAxis
         yAxisId={1}
         orientation="right"
         width={45}
         //label="UV"
         dataKey="uvi"
      />
      <CartesianGrid {...STYLE.CartesianGrid} />
      <Tooltip
        offset={24}
        content={<TooltipUvi data={data} />}
      />
      <Line {...STYLE.LineTempNight}
          connectNulls={true}
          yAxisId={1}
          dataKey="uvi"
      />
    </LineChart>
  </ResponsiveContainer>
  );
}

export default UviChart
