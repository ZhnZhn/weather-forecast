const ClipPathRect = ({
  id,
  props
}) => {
  const {
    left,
    top,
    width,
    height
  } = props;
  return (
    <defs>
      <clipPath id={`clipPath-${id}`}>
        <rect
          x={left} y={top}
          width={width} height={height}
        />
      </clipPath>
    </defs>
  );
}

export default ClipPathRect
