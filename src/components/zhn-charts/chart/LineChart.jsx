import { generateCategoricalChart } from './generateCategoricalChart';

import { Line } from '../cartesian/Line';
import { XAxis } from '../cartesian/XAxis';
import { YAxis } from '../cartesian/YAxis';
import { formatAxisMap } from '../util/CartesianUtils';
import { crAxisComponent } from './chartFn';

export const LineChart = generateCategoricalChart({
  chartName: 'LineChart',
  GraphicalChild: Line,
  axisComponents: [
      crAxisComponent('xAxis', XAxis),
      crAxisComponent('yAxis', YAxis),
  ],
  formatAxisMap
});
