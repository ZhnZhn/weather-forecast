import { filterProps } from '../util/ReactUtils';
import { isPoints } from './CartesianGridRenderFn';

const CartesianGridHorizontalLines = ({
  className,
  x,
  width,
  points,
  props
}) => isPoints(points)
  ? (<g className={className}>
      {points.map((entry, i) => (<line
        key={`line-${i}`}
        {...filterProps(props)}
        x1={x}
        y1={entry}
        x2={x + width}
        y2={entry}
      />))}
    </g>) 
  : null;

export default CartesianGridHorizontalLines
