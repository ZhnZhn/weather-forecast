import { filterProps } from '../util/ReactUtils';

const CartesianGridHorizontalLines = ({
  className,
  x,
  width,
  points,
  props
}) => (
  <g className={className}>
     {points.map((entry, i) => (<line
       key={`line-${i}`}
       {...filterProps(props)}
       x1={x}
       y1={entry}
       x2={x + width}
       y2={entry}
     />))}
  </g>
);

export default CartesianGridHorizontalLines
