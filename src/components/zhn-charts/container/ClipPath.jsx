export const ClipPath = ({
  id,
  offset
}) => (
  <defs>
    <clipPath id={id}>
      <rect
         x={offset.left}
         y={offset.top}
         height={offset.height}
         width={offset.width}
      />
    </clipPath>
  </defs>
)
