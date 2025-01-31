import {
  getStripeLineDimension,
  crStripeRectProps
} from './CartesianGridRenderFn';

const CartesianGridVerticalStripes = ({
  className,  
  y,
  height,
  x0,
  arrFill,
  fillOpacity,
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
          x={entry}
          y={y}
          width={lineWidth}
          height={height}
          {...crStripeRectProps(arrFill, i, fillOpacity)}
      />) : null;
    })}
  </g>
);

export default CartesianGridVerticalStripes
