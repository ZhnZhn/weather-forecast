import { DF_AXIS_PROPS } from './cartesianFn';

export const XAxis = () => null;
XAxis.displayName = 'XAxis';
XAxis.defaultProps = {
  ...DF_AXIS_PROPS,
  orientation: 'bottom',
  width: 0,
  height: 30,
  xAxisId: 0,
  type: 'category',
  padding: { left: 0, right: 0 }
};
