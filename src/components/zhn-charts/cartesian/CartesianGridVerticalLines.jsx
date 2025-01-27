import { filterProps } from '../util/ReactUtils';
import { isPoints } from './CartesianGridRenderFn';

const CartesianGridVerticalLines = ({
  className,
  y,
  height,
  points,
  props
}) => isPoints(points)
  ? (<g className={className}>
      {points.map((entry, i) => (<line
        key={`line-${i}`}
        {...filterProps(props)}
        x1={entry}
        y1={y}
        x2={entry}
        y2={y + height}
      />))}
    </g>)
  : null;

export default CartesianGridVerticalLines
