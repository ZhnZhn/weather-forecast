import { CL_BG } from '../CL';

const CartesianGridHorizontalStripes = ({
  className,
  horizontalFill,
  fillOpacity,
  x,
  y,
  width,
  height,
  points
}) => (
  <g className={className}>
    {points.map((entry, i) => {
      const recentStripe = !points[i + 1]
      , lineHeight = recentStripe
         ? y + height - entry
         : points[i + 1] - entry;

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

export default CartesianGridHorizontalStripes
