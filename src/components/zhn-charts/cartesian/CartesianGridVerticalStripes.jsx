import { CL_BG } from '../CL';
import {
  getFillByIndex,
  getStripeLineDimension
} from './CartesianGridRenderFn';

const CartesianGridVerticalStripes = ({
  className,
  verticalFill,
  fillOpacity,
  y,
  height,
  x0,
  points
}) => (
  <g className={className}>
    {points.map((entry, i) => {
      const lineWidth = getStripeLineDimension(
        x0,
        entry,
        i,
        points
      );

      return lineWidth > 0 ? (
        <rect
          key={`react-${i}`}
          x={entry} y={y}
          width={lineWidth} height={height}
          stroke="none"
          fill={getFillByIndex(verticalFill, i)}
          fillOpacity={fillOpacity}
          className={CL_BG}
      />) : null;
    })}
  </g>
);

export default CartesianGridVerticalStripes
