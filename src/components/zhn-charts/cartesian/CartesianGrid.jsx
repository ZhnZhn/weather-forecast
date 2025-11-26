import {
  isNotEmptyArr
} from '../../../utils/isTypeFn';
import {
  memo,
  crProps
} from '../../uiApi';

import {
  getTicksOfAxis,
  getCoordinatesOfGrid
} from '../util/ChartUtils';

import {
  isNumber,
  isPositiveNumber
} from '../util/DataUtils';

import {
  crGridPoints,
  crRoundedSortedPoints
} from './CartesianGridRenderFn';

import { getTicks } from './getTicks';
import { CARTESIAN_AXIS_DF_PROPS } from './CartesianAxis';
import CartesianGridBackground from './CartesianGridBackground';
import {
  CartesianGridHorizontalLines,
  CartesianGridVerticalLines
} from './CartesianGridLines';
import {
  CartesianGridHorizontalStripes,
  CartesianGridVerticalStripes
} from './CartesianGridStripes';

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
) => is && isNotEmptyArr(points);

const verticalCoordinatesGenerator = ({
  xAxis,
  width,
  height,
  offset
}) => getCoordinatesOfGrid(getTicks({
  ...CARTESIAN_AXIS_DF_PROPS,
  ...xAxis,
  ticks: getTicksOfAxis(xAxis, true),
  viewBox: { x: 0, y: 0, width, height },
}), offset.left, offset.left + offset.width)

const horizontalCoordinatesGenerator = ({
  yAxis,
  width,
  height,
  offset
}) => getCoordinatesOfGrid(getTicks({
  ...CARTESIAN_AXIS_DF_PROPS,
  ...yAxis,
  ticks: getTicksOfAxis(yAxis, true),
  viewBox: { x: 0, y: 0, width, height },
}), offset.top, offset.top + offset.height)

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
  horizontalFill: [],
  verticalCoordinatesGenerator: verticalCoordinatesGenerator,
  horizontalCoordinatesGenerator: horizontalCoordinatesGenerator
};

const _getNumber = (
  value,
  dfValue
) => isNumber(value)
  ? value
  : dfValue

export const CartesianGrid = memo((
  props
) => {
  const _props = crProps(DF_PROPS, props)
  , {
    offset = {},
    stroke,
    ry,
    fill,
    fillOpacity,
    horizontal,
    vertical,
    horizontalFill,
    verticalFill,
    xAxis,
    yAxis,
    chartWidth,
    chartHeight,
    horizontalPoints,
    verticalPoints
  } = _props;

  let {
    x,
    y,
    width,
    height
  } = _props;
  x = _getNumber(x, offset.left)
  y = _getNumber(y, offset.top)
  width = _getNumber(width, offset.width)
  height = _getNumber(height, offset.height)

  if (!(isPositiveNumber(width)
    && isPositiveNumber(height)
    && isNumber(x)
    && isNumber(y)
  )) {
    return null;
  }

  const [
    _horizontalPoints,
    _verticalPoints
  ] = crGridPoints(
    horizontalCoordinatesGenerator,
    verticalCoordinatesGenerator,
    xAxis,
    yAxis,
    horizontalPoints,
    verticalPoints,
    {
       width: chartWidth,
       height: chartHeight,
       offset
    }
  )
  , _lineProps = {
    offset,
    stroke
  }
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
      {_isPoints(horizontal, _horizontalPoints) && <CartesianGridHorizontalLines
         className={CL_GRID_HORIZONTAL}
         x1={x}
         x2={x2}
         points={_horizontalPoints}
         props={_lineProps}
      />}
      {_isPoints(vertical, _verticalPoints) && <CartesianGridVerticalLines
         className={CL_GRID_VERTICAL}
         y1={y}
         y2={y2}
         points={_verticalPoints}
         props={_lineProps}
      />}
      {_isPoints(horizontal, horizontalFill) && <CartesianGridHorizontalStripes
         className={CL_STRIPES_HORIZONTAL}
         x={x}
         width={width}
         y0={y2}
         arrFill={horizontalFill}
         fillOpacity={fillOpacity}
         points={crRoundedSortedPoints(_horizontalPoints, y)}
      />}
      {_isPoints(vertical, verticalFill) && <CartesianGridVerticalStripes
         className={CL_STRIPES_VERTICAL}
         y={y}
         height={height}
         x0={x2}
         arrFill={verticalFill}
         fillOpacity={fillOpacity}
         points={crRoundedSortedPoints(_verticalPoints, x)}
      />}
   </g>
  );
})

CartesianGrid.displayName = 'CartesianGrid';
