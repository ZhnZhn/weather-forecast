const _fCartesianGridLines = (
  crLineProps
) => (props) => (
  <g className={props.className}>
     {props.points.map((entry, i) => (<line
       key={`line-${i}`}
       {...props.props}
       {...crLineProps(props, entry)}
     />))}
  </g>
)
, _crLineProps = (x1, y1, x2, y2) => ({
  x1,
  y1,
  x2,
  y2
})
, _crHorizontalLineProps = (
  props,
  entry
) => _crLineProps(
  props.x1,
  entry,
  props.x2,
  entry
)
, _crVerticalLineProps = (
  props,
  entry
) => _crLineProps(
  entry,
  props.y1,
  entry,
  props.y2
);

export const CartesianGridHorizontalLines = _fCartesianGridLines(
  _crHorizontalLineProps
)
export const CartesianGridVerticalLines = _fCartesianGridLines(
  _crVerticalLineProps
)
