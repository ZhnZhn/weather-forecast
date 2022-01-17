import { useMemo } from '../uiApi';
import { useSelector } from 'react-redux';
import dt from '../../utils/dt';

import Chart from '../charts/Chart';
import ChartType1 from './ChartType1';
import { sUV } from '../../flux/selectors';

import TooltipUvi from './TooltipUvi';
import STYLE from './Chart.Style';

const {
 YAxis,
 Line
} = Chart;

const _transformUvi = hourlyArr => (hourlyArr || [])
  .map(({ date, value }) => ({
     day: dt.toDayHour(date),
     uvi: value
  }))

const UviChart = () => {
  const uviArr = useSelector(sUV.forecast)
  , data = useMemo(() => _transformUvi(uviArr),
      [uviArr]);
  return (
    <ChartType1
      type="line"
      data={data}
      TooltipComp={TooltipUvi}
    >
      <YAxis
         yAxisId={1}
         orientation="right"
         width={45}
         dataKey="uvi"
      />
      <Line {...STYLE.LineTempNight}
          connectNulls={true}
          yAxisId={1}
          dataKey="uvi"
      />
    </ChartType1>
  );
};

export default UviChart
