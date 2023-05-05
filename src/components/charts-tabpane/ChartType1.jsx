import {
  ResponsiveContainer,
  ComposedChart,
  LineChart,
  XAxis,
  CartesianGrid,
  Tooltip
} from '../charts/Chart';

import STYLE from './Chart.Style';

const ChartType1 = ({
  chartStyle=STYLE.HourlyChart,
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
        <XAxis {...STYLE.XAxis} dataKey="day" />
        <CartesianGrid {...STYLE.CartesianGrid} />
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
