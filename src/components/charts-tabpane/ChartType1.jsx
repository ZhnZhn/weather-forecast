import { useMemo } from '../uiApi';

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

const S_POINTER_EVENTS_UNSET = {
  pointerEvents: 'unset'
}
, _crWrapperStyle = (
  tooltipTrigger
) => tooltipTrigger === "click"
  ? S_POINTER_EVENTS_UNSET
  : void 0;

const ChartType1 = ({
  chartStyle=S_HOURLY_CHART,
  data,
  type,
  TooltipComp,
  tooltipTrigger,
  children
}) => {
  const tooltipContent = useMemo(
    () => <TooltipComp data={data} />
  , [data])
  , ChartComp = (type === 'line')
    ? LineChart
    : ComposedChart;
  return (
    <ResponsiveContainer width="100%" height={300} >
      <ChartComp {...chartStyle} data={data}>
        <XAxis {...S_XAXIS} dataKey="day" />
        <CartesianGrid {...S_CARTESIAN_GRID} />
        <Tooltip
          offset={24}
          trigger={tooltipTrigger}
          wrapperStyle={_crWrapperStyle(tooltipTrigger)}
          content={tooltipContent}
        />
        {children}
      </ChartComp>
    </ResponsiveContainer>
  );
};

export default ChartType1
