import { memo } from '../../uiApi';

import { _isFn } from '../util/FnUtils';
import { isNumber } from '../util/DataUtils';

import {
  CL_CARTESIAN_GRID,
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
    vertical,
    horizontalCoordinatesGenerator,
    verticalCoordinatesGenerator,
    xAxis,
    yAxis,
    offset,
    chartWidth,
    chartHeight
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

  let {
    horizontalPoints,
    verticalPoints
  } = props;
  // No horizontal points are specified
  if ((!horizontalPoints || !horizontalPoints.length)
     && _isFn(horizontalCoordinatesGenerator)
  ) {
    horizontalPoints = horizontalCoordinatesGenerator({
      yAxis,
      width: chartWidth,
      height: chartHeight,
      offset
    });
  }

  // No vertical points are specified
  if ((!verticalPoints || !verticalPoints.length)
     && _isFn(verticalCoordinatesGenerator)
  ) {
    verticalPoints = verticalCoordinatesGenerator({
      xAxis,
      width: chartWidth,
      height: chartHeight,
      offset
    });
  }

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
