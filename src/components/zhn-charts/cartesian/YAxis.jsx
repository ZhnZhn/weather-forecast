import { DF_AXIS_PROPS } from './cartesianFn';

export const YAxis = () => null;
YAxis.displayName = 'YAxis';
YAxis.defaultProps = {
  ...DF_AXIS_PROPS,
  orientation: 'left',
  width: 60,
  height: 0,
  yAxisId: 0,
  type: 'number',
  padding: { top: 0, bottom: 0 }  
};
