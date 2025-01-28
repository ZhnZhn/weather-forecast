const CartesianGridVerticalLines = ({
  className,
  y1,
  y2,
  points,
  props
}) => (
  <g className={className}>
    {points.map((entry, i) => (<line
      key={`line-${i}`}
      {...props}
      x1={entry}
      y1={y1}
      x2={entry}
      y2={y2}
    />))}
  </g>
);

export default CartesianGridVerticalLines
