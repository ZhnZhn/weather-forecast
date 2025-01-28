import { CL_BG } from '../CL';
import {
  getFillByIndex,
  getStripeLineDimension
} from './CartesianGridRenderFn';

const CartesianGridHorizontalStripes = ({
  className,
  horizontalFill,
  fillOpacity,
  x,
  width,
  y0,
  points
}) => (
  <g className={className}>
    {points.map((entry, i) => {
      const lineHeight = getStripeLineDimension(
        y0,
        entry,
        i,
        points
      );

      return lineHeight > 0 ? (
        <rect
          key={`react-${i}`}
          y={entry} x={x}
          height={lineHeight} width={width}
          stroke="none"
          fill={getFillByIndex(horizontalFill, i)}
          fillOpacity={fillOpacity}
          className={CL_BG}
        />) : null;
    })}
  </g>
);

export default CartesianGridHorizontalStripes
