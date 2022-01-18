import Chart from '../charts/Chart';
import STYLE from './Chart.Style';

const {
  Bar,
  Line
} = Chart;

const _crDataKey = (filtered, propName) =>
 filtered[propName]
   ? 'empty'
   : propName;

const crListSeries = (
  configs,
  filtered
) => configs.map(({
  id,
  type,
  yId=1,
  style=STYLE.LineTempNight
}) => {
  const SeriaComp = (type === 'bar')
    ? Bar
    : Line;
  return (
    <SeriaComp
      key={id}
      {...style}
      connectNulls={true}
      yAxisId={yId}
      dataKey={_crDataKey(filtered, id)}
    />
  );
});

export default crListSeries
