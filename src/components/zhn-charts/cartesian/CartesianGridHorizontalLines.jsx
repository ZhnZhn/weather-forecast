const CartesianGridHorizontalLines = ({
  className,
  x1,
  x2,
  points,
  props
}) => (
  <g className={className}>
     {points.map((entry, i) => (<line
       key={`line-${i}`}
       {...props}
       x1={x1}
       y1={entry}
       x2={x2}
       y2={entry}
     />))}
  </g>
);

export default CartesianGridHorizontalLines
