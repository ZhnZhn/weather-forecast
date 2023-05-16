import { generateCategoricalChart } from './generateCategoricalChart';

import { Bar } from '../cartesian/Bar';
import { Line } from '../cartesian/Line';
import { XAxis } from '../cartesian/XAxis';
import { YAxis } from '../cartesian/YAxis';
import { formatAxisMap } from '../util/CartesianUtils';

import { crAxisComponent } from './chartFn';

export const ComposedChart = generateCategoricalChart({
  chartName: 'ComposedChart',
  GraphicalChild: [Line, Bar],
  axisComponents: [
      crAxisComponent('xAxis', XAxis),
      crAxisComponent('yAxis', YAxis)
  ],
  formatAxisMap
});
