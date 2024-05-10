const ClipPathRect = ({
  is,
  id,
  props
}) => {
  const {
    left,
    top,
    width,
    height
  } = props;
  return is ? (
    <defs>
      <clipPath id={`clipPath-${id}`}>
        <rect
          x={left} y={top}
          width={width} height={height}
        />
      </clipPath>
    </defs>
  ) : null;
}

export default ClipPathRect
