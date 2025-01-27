import {
  isPoints,
  crRoundedSortedPoints
} from './CartesianGridRenderFn';

import { CL_BG } from '../CL';

const CartesianGridHorizontalStripes = ({
  className,
  horizontalPoints,
  horizontalFill,
  fillOpacity,
  x,
  y,
  width,
  height
}) => {
  if (!isPoints(horizontalFill)) {
    return null;
  }

  const roundedSortedHorizontalPoints = crRoundedSortedPoints(horizontalPoints, y)
  return (
    <g className={className}>
      {roundedSortedHorizontalPoints.map((entry, i) => {
        const recentStripe = !roundedSortedHorizontalPoints[i + 1]
        , lineHeight = recentStripe
           ? y + height - entry
           : roundedSortedHorizontalPoints[i + 1] - entry;

        return lineHeight <= 0 ? null : (
          <rect
            key={`react-${i}`}
            y={entry} x={x}
            height={lineHeight} width={width}
            stroke="none"
            fill={horizontalFill[i % horizontalFill.length]}
            fillOpacity={fillOpacity}
            className={CL_BG}
          />);
      })}
    </g>
  );
}

export default CartesianGridHorizontalStripes
