import { memo } from '../../uiApi';

import {
  isNumber,
  isPositiveNumber
} from '../util/DataUtils';
import {
  crProps,
  filterProps
} from '../util/ReactUtils';

import {
  crGridPoints,
  isPoints,
  crRoundedSortedPoints
} from './CartesianGridRenderFn';

import CartesianGridBackground from './CartesianGridBackground';
import {
  CartesianGridHorizontalLines,
  CartesianGridVerticalLines
} from './CartesianGridLines';
import CartesianGridHorizontalStripes from './CartesianGridHorizontalStripes';
import CartesianGridVerticalStripes from './CartesianGridVerticalStripes';

import {
  CL_BG,
  CL_CARTESIAN_GRID,
  CL_GRID_HORIZONTAL,
  CL_GRID_VERTICAL,
  CL_STRIPES_HORIZONTAL,
  CL_STRIPES_VERTICAL
} from '../CL';

const _isPoints = (
  is,
  points
) => is && isPoints(points);

const DF_PROPS = {
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

export const CartesianGrid = memo((
  props
) => {
  const _props = crProps(DF_PROPS, props)
  , {
    x,
    y,
    ry,
    width,
    height,
    fill,
    fillOpacity,
    horizontal,
    vertical,
    horizontalFill,
    verticalFill,
    ...restProps
  } = _props;

  if (!(isPositiveNumber(width)
    && isPositiveNumber(height)
    && isNumber(x)
    && isNumber(y)
  )) {
    return null;
  }

  const [
    horizontalPoints,
    verticalPoints
  ] = crGridPoints(_props)
  , _lineProps = filterProps(restProps)
  , x2 = x + width
  , y2 = y + height;

  return (
    <g className={CL_CARTESIAN_GRID}>
      <CartesianGridBackground
         className={CL_BG}
         fill={fill}
         fillOpacity={fillOpacity}
         x={x}
         y={y}
         ry={ry}
         width={width}
         height={height}
      />
      {_isPoints(horizontal, horizontalPoints) && <CartesianGridHorizontalLines
         className={CL_GRID_HORIZONTAL}
         x1={x}
         x2={x2}
         points={horizontalPoints}
         props={_lineProps}
      />}
      {_isPoints(vertical, verticalPoints) && <CartesianGridVerticalLines
         className={CL_GRID_VERTICAL}
         y1={y}
         y2={y2}
         points={verticalPoints}
         props={_lineProps}
      />}
      {_isPoints(horizontal, horizontalFill) && <CartesianGridHorizontalStripes
         className={CL_STRIPES_HORIZONTAL}
         x={x}
         width={width}
         y0={y2}
         arrFill={horizontalFill}
         fillOpacity={fillOpacity}
         points={crRoundedSortedPoints(horizontalPoints, y)}
      />}
      {_isPoints(vertical, verticalFill) && <CartesianGridVerticalStripes
         className={CL_STRIPES_VERTICAL}
         y={y}
         height={height}
         x0={x2}
         arrFill={verticalFill}
         fillOpacity={fillOpacity}
         points={crRoundedSortedPoints(verticalPoints, x)}
      />}
   </g>
  );
})

CartesianGrid.displayName = 'CartesianGrid';
