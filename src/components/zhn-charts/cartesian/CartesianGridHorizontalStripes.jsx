import {
  getStripeLineDimension,
  crStripeRectProps
} from './CartesianGridRenderFn';

const CartesianGridHorizontalStripes = ({
  className,
  x,
  width,
  y0,
  arrFill,
  fillOpacity,
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
          y={entry}
          x={x}
          height={lineHeight}
          width={width}
          {...crStripeRectProps(arrFill, i, fillOpacity)}
        />) : null;
    })}
  </g>
);

export default CartesianGridHorizontalStripes
