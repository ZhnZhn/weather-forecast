import { memo } from '../../uiApi';

import { isNumber } from '../util/DataUtils';

import {
  CL_CARTESIAN_GRID,
  crGridPoints,
  renderHorizontal,
  renderVertical,
  renderVerticalStripes,
  renderHorizontalStripes,
  renderBackground
} from './CartesianGridRenderFn';

export const CartesianGrid = memo((
  props
) => {
  const {
    x,
    y,
    width,
    height,
    horizontal,
    vertical
  } = props;

  if (!isNumber(width)
    || width <= 0
    || !isNumber(height)
    || height <= 0
    || !isNumber(x)
    || x !== +x
    || !isNumber(y)
    || y !== +y
  ) {
    return null;
  }

  const [
    horizontalPoints,
    verticalPoints
  ] = crGridPoints(props);

  return (
    <g className={CL_CARTESIAN_GRID}>
      {renderBackground(props)}
      {horizontal && renderHorizontal(horizontalPoints, props)}
      {vertical && renderVertical(verticalPoints, props)}

      {horizontal && renderHorizontalStripes(horizontalPoints, props)}
      {vertical && renderVerticalStripes(verticalPoints, props)}
   </g>
  );
})

CartesianGrid.displayName = 'CartesianGrid';
CartesianGrid.defaultProps = {
  horizontal: true,
  vertical: true,
  // The ordinates of horizontal grid lines
  horizontalPoints: [],
  // The abscissas of vertical grid lines
  verticalPoints: [],
  stroke: '#ccc',
  fill: 'none',
  // The fill of colors of grid lines
  verticalFill: [],
  horizontalFill: []
};
