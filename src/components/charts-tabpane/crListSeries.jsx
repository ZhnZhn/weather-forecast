import {
  Bar,
  Line
} from '../charts/Chart';
import { S_LINE_TEMP_NIGHT } from './Chart.Style';

const _crDataKey = (
  filtered,
  propName
) => filtered[propName]
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
  style=S_LINE_TEMP_NIGHT,
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
