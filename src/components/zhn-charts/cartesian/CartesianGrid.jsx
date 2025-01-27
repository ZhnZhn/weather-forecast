import { memo } from '../../uiApi';

import {
  isNumber,
  isPositiveNumber
} from '../util/DataUtils';
import { crProps } from '../util/ReactUtils';

import {
  crGridPoints,
  renderVerticalStripes,
  renderHorizontalStripes
} from './CartesianGridRenderFn';

import CartesianGridBackground from './CartesianGridBackground';
import CartesianGridHorizontalLines from './CartesianGridHorizontalLines';
import CartesianGridVerticalLines from './CartesianGridVerticalLines';

import {
  CL_BG,
  CL_CARTESIAN_GRID,
  CL_GRID_HORIZONTAL,
  CL_GRID_VERTICAL
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
    width,
    height,
    horizontal,
    vertical
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
         fill={_props.fill}
         fillOpacity={_props.fillOpacity}
         x={x}
         y={y}
         width={width}
         height={height}
      />
      {horizontal && <CartesianGridHorizontalLines
        className={CL_GRID_HORIZONTAL}
        x={x}
        width={width}
        points={horizontalPoints}
        props={_props}
      />}
      {vertical && <CartesianGridVerticalLines
        className={CL_GRID_VERTICAL}
        y={y}
        height={height}
        points={verticalPoints}
        props={_props}
      />}

      {horizontal && renderHorizontalStripes(horizontalPoints, _props)}
      {vertical && renderVerticalStripes(verticalPoints, _props)}
   </g>
  );
})

CartesianGrid.displayName = 'CartesianGrid';
