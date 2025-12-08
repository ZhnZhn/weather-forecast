import { generateCategoricalChart } from './generateCategoricalChart';

import { Bar } from '../cartesian/Bar';
import { Line } from '../cartesian/Line';

import {
  fUpdateStateOfAxisMapsOffsetAndStackGroups
} from './fUpdateStateOfAxisOffsetAndStackGroups';

const chartName = 'ComposedChart';
export const ComposedChart = generateCategoricalChart(
  chartName,
  fUpdateStateOfAxisMapsOffsetAndStackGroups(
    chartName,
    [Line, Bar]
  )
)
