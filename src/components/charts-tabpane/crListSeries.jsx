import Chart from '../charts/Chart';
import STYLE from './Chart.Style';

const {
  Bar,
  Line
} = Chart
, _crDataKey = (filtered, propName) => filtered[propName]
    ? 'empty'
    : propName
, DF_IS_NOT = Object.create(null);

const crListSeries = (
  configs,
  filtered,
  isNot=DF_IS_NOT
) => configs.map(({
  id,
  type,
  yId=1,
  style=STYLE.LineTempNight,
}) => {
  if (isNot[id]) {
    return null;
  }
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
