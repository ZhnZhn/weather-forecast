import { generateCategoricalChart } from './generateCategoricalChart';

import { Line } from '../cartesian/Line';
import {
  fUpdateStateOfAxisMapsOffset
} from './fUpdateStateOfAxisMapsOffset';

const chartName = 'LineChart';
export const LineChart = generateCategoricalChart(
  chartName,
  fUpdateStateOfAxisMapsOffset(
    chartName,
    Line
  )
)
