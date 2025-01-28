import { CL_BG } from '../CL';

const CartesianGridVerticalStripes = ({
  className,
  verticalFill,
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
      , lineWidth = recentStripe
         ? x + width - entry
         : points[i + 1] - entry;

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

export default CartesianGridVerticalStripes
