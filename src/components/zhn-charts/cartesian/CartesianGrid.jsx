import { memo } from '../../uiApi';

import {
  isNumber,
  isPositiveNumber
} from '../util/DataUtils';
import { crProps } from '../util/ReactUtils';

import { crGridPoints } from './CartesianGridRenderFn';

import CartesianGridBackground from './CartesianGridBackground';
import CartesianGridHorizontalLines from './CartesianGridHorizontalLines';
import CartesianGridVerticalLines from './CartesianGridVerticalLines';
import CartesianGridVerticalStripes from './CartesianGridVerticalStripes';

import {
  CL_BG,
  CL_CARTESIAN_GRID,
  CL_GRID_HORIZONTAL,
  CL_GRID_VERTICAL,
  CL_STRIPES_HORIZONTAL,
  CL_STRIPES_VERTICAL
} from '../CL';

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
  ] = crGridPoints(_props);

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
      {horizontal && <CartesianGridHorizontalLines
         className={CL_GRID_HORIZONTAL}
         x={x}
         width={width}
         points={horizontalPoints}
         props={restProps}
      />}
      {vertical && <CartesianGridVerticalLines
         className={CL_GRID_VERTICAL}
         y={y}
         height={height}
         points={verticalPoints}
         props={restProps}
      />}
      {horizontal && <CartesianGridHorizontalLines
         className={CL_STRIPES_HORIZONTAL}
         x={x} y={y}
         width={width} height={height}
         fillOpacity={fillOpacity}
         horizontalFill={horizontalFill}
         horizontalPoints={horizontalPoints}
      />}
      {vertical && <CartesianGridVerticalStripes
         className={CL_STRIPES_VERTICAL}
         x={x} y={y}
         width={width} height={height}
         fillOpacity={fillOpacity}
         verticalFill={verticalFill}
         verticalPoints={verticalPoints}
      />}
   </g>
  );
})

CartesianGrid.displayName = 'CartesianGrid';
