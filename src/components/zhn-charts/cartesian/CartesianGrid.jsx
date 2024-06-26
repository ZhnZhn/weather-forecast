import { memo } from '../../uiApi';

import {
  isNumber,
  isPositiveNumber
} from '../util/DataUtils';
import { crProps } from '../util/ReactUtils';

import {
  crGridPoints,
  renderHorizontal,
  renderVertical,
  renderVerticalStripes,
  renderHorizontalStripes,
  renderBackground
} from './CartesianGridRenderFn';

import { CL_CARTESIAN_GRID } from '../CL';

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
      {renderBackground(_props)}
      {horizontal && renderHorizontal(horizontalPoints, _props)}
      {vertical && renderVertical(verticalPoints, _props)}

      {horizontal && renderHorizontalStripes(horizontalPoints, _props)}
      {vertical && renderVerticalStripes(verticalPoints, _props)}
   </g>
  );
})

CartesianGrid.displayName = 'CartesianGrid';
