import { generateCategoricalChart } from './generateCategoricalChart';

import { Bar } from '../cartesian/Bar';
import { Line } from '../cartesian/Line';

import {
  fUpdateStateOfAxisMapsOffset
} from './fUpdateStateOfAxisMapsOffset';

const chartName = 'ComposedChart';
export const ComposedChart = generateCategoricalChart(
  chartName,
  fUpdateStateOfAxisMapsOffset(
    chartName,
    [Line, Bar]
  )
)
