import memoEqual from '../hoc/memoEqual';

import dt from '../../utils/dt';
import {
  YAxis,
  Line
} from '../charts/Chart';
import { sUV } from '../../flux/selectors';

import useSelectorData from './useSelectorData';
import ChartType1 from './ChartType1';
import TooltipUvi from './TooltipUvi';
import STYLE from './Chart.Style';

const _transformUvi = hourlyArr => (hourlyArr || [])
   .map(({ date, value }) => ({
      day: dt.toDayHour(date),
      uvi: value
   }));

const ChartUvi = () => {
  const data = useSelectorData(sUV.forecast, _transformUvi);
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

export default memoEqual(ChartUvi)
