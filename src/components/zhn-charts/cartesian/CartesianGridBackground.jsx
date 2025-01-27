const NONE = "none"
/*
fill,
fillOpacity,
x,
y,
width,
height,
className
*/
, CartesianGridBackground = (
  props
) => !props.fill || props.fill === NONE
  ? null
  : (<rect
       {...props}
       stroke={NONE}
    />);

export default CartesianGridBackground
