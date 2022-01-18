import Chart from '../charts/Chart';
import STYLE from './Chart.Style';

const { Line } = Chart;

const _crDataKey = (filtered, propName) =>
 filtered[propName]
   ? 'empty'
   : propName;

const crListSeries = (
  configs,
  filtered
) => configs.map(({
  id,
  yId=1,
  style=STYLE.LineTempNight
}) => (
  <Line
    key={id}
    {...style}
    connectNulls={true}
    yAxisId={yId}
    dataKey={_crDataKey(filtered, id)}
  />
));

export default crListSeries
