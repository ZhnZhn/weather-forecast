//[textAnchor, verticalAnchor]
export const getTickAnchors = (
  orientation,
  mirror
) => [
  orientation === 'left'
     ? mirror ? 'start' : 'end'
     : orientation === 'right'
        ? mirror ? 'end' : 'start'
        : 'middle',
  orientation === 'left' || orientation === 'right'
    ? 'middle'
    : orientation === 'top'
       ? mirror ? 'start' : 'end'
       : mirror ? 'end' : 'start'
];
