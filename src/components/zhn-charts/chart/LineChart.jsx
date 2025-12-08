import { generateCategoricalChart } from './generateCategoricalChart';

import { Line } from '../cartesian/Line';
import {
  fUpdateStateOfAxisMapsOffsetAndStackGroups
} from './fUpdateStateOfAxisOffsetAndStackGroups';

const chartName = 'LineChart';
export const LineChart = generateCategoricalChart(
  chartName,
  fUpdateStateOfAxisMapsOffsetAndStackGroups(
    chartName,
    Line
  )
)
