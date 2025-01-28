const CartesianGridVerticalLines = ({
  className,
  y,
  height,
  points,
  props
}) => (
  <g className={className}>
    {points.map((entry, i) => (<line
      key={`line-${i}`}
      {...props}
      x1={entry}
      y1={y}
      x2={entry}
      y2={y + height}
    />))}
  </g>
);

export default CartesianGridVerticalLines
