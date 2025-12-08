import { generateCategoricalChart } from './generateCategoricalChart';

import { Bar } from '../cartesian/Bar';
import { Line } from '../cartesian/Line';
import { XAxis } from '../cartesian/XAxis';
import { YAxis } from '../cartesian/YAxis';

import { crAxisComponent } from './chartFn';
import {
  fUpdateStateOfAxisMapsOffsetAndStackGroups
} from './fUpdateStateOfAxisOffsetAndStackGroups';

const chartName = 'ComposedChart';
export const ComposedChart = generateCategoricalChart(
  chartName,
  fUpdateStateOfAxisMapsOffsetAndStackGroups(
    chartName,
    [Line, Bar],
    [
      crAxisComponent('xAxis', XAxis),
      crAxisComponent('yAxis', YAxis)
    ]
  )
)
