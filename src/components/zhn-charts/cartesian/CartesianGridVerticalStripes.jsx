import { crRoundedSortedPoints } from './CartesianGridRenderFn';

import { CL_BG } from '../CL';

const CartesianGridVerticalStripes = ({
  className,
  verticalFill,
  verticalPoints,
  fillOpacity,
  x,
  y,
  width,
  height
}) => {
  const roundedSortedVerticalPoints = crRoundedSortedPoints(verticalPoints, x);
  return (
    <g className={className}>
      {roundedSortedVerticalPoints.map((entry, i) => {
          const recentStripe = !roundedSortedVerticalPoints[i + 1]
          , lineWidth = recentStripe
             ? x + width - entry
             : roundedSortedVerticalPoints[i + 1] - entry;

          return lineWidth <= 0 ? null : (
            <rect
              key={`react-${i}`}
              x={entry} y={y}
              width={lineWidth} height={height}
              stroke="none"
              fill={verticalFill[i % verticalFill.length]}
              fillOpacity={fillOpacity}
              className={CL_BG}
          />);
      })}
    </g>
  );
}

export default CartesianGridVerticalStripes
