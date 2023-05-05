import {
  ResponsiveContainer,
  ComposedChart,
  LineChart,
  XAxis,
  CartesianGrid,
  Tooltip
} from '../charts/Chart';

import {
  S_HOURLY_CHART,
  S_XAXIS,
  S_CARTESIAN_GRID
} from './Chart.Style';

const ChartType1 = ({
  chartStyle=S_HOURLY_CHART,
  data,
  type,
  TooltipComp,
  children
}) => {
  const ChartComp = (type === 'line')
    ? LineChart
    : ComposedChart;
  return (
    <ResponsiveContainer width="100%" height={300} >
      <ChartComp {...chartStyle} data={data}>
        <XAxis {...S_XAXIS} dataKey="day" />
        <CartesianGrid {...S_CARTESIAN_GRID} />
        <Tooltip
          offset={24}
          content={<TooltipComp data={data} />}
        />
        {children}
      </ChartComp>
    </ResponsiveContainer>
  );
};

export default ChartType1
