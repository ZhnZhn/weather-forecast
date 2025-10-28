import { generateCategoricalChart } from './generateCategoricalChart';

import { Line } from '../cartesian/Line';
import { XAxis } from '../cartesian/XAxis';
import { YAxis } from '../cartesian/YAxis';
import { formatAxisMap } from '../util/CartesianUtils';
import { crAxisComponent } from './chartFn';
import {
  fUpdateStateOfAxisMapsOffsetAndStackGroups
} from './fUpdateStateOfAxisOffsetAndStackGroups';

const chartName = 'LineChart';
export const LineChart = generateCategoricalChart(
  chartName,
  fUpdateStateOfAxisMapsOffsetAndStackGroups(
    chartName,
    Line,
    [
      crAxisComponent('xAxis', XAxis),
      crAxisComponent('yAxis', YAxis)
    ],
    formatAxisMap
  )
)
