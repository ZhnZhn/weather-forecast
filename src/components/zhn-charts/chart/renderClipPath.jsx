
export const renderClipPath = (
  chartIns
) => {
  const {
    clipPathId,
    state
  } = chartIns
  , {
    offset: {
      left,
      top,
      height,
      width
  }} = state;
  return (
    <defs>
      <clipPath id={clipPathId}>
        <rect x={left} y={top} height={height} width={width}/>
      </clipPath>
    </defs>
  );
}
