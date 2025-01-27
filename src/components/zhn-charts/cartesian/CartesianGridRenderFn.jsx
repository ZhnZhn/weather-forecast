import { _isFn } from '../util/FnUtils';

import {
  CL_BG,
  CL_STRIPES_HORIZONTAL,
  CL_STRIPES_VERTICAL
} from '../CL';

export const isPoints = (
  points
) => points && points.length;

const _crPoints = (
  points,
  pointsGenerator,
  generatorOptions
) => !isPoints(points) && _isFn(pointsGenerator)
  ? pointsGenerator(generatorOptions)
  : points;

export const crGridPoints = (
  props
) => {
  const {
    horizontalCoordinatesGenerator,
    verticalCoordinatesGenerator,
    xAxis,
    yAxis,
    offset,
    chartWidth,
    chartHeight
  } = props
  , _generatorOptions = {
     width: chartWidth,
     height: chartHeight,
     offset
  };

  return [
    _crPoints(
        props.horizontalPoints,
        horizontalCoordinatesGenerator,
        {..._generatorOptions, yAxis}
    ),
    _crPoints(
        props.verticalPoints,
        verticalCoordinatesGenerator,
        {..._generatorOptions, xAxis}
    )
  ];
}

export const renderVerticalStripes = (
  verticalPoints,
  props
) => {
  const { verticalFill } = props;
  if (!isPoints(verticalFill)) {
    return null;
  }

  const {
    fillOpacity,
    x,
    y,
    width,
    height
  } = props
  , roundedSortedVerticalPoints = verticalPoints.map(e => Math.round(e + x - x)).sort((a, b) => a - b);
  if (x !== roundedSortedVerticalPoints[0]) {
    roundedSortedVerticalPoints.unshift(0);
  }
  const items = roundedSortedVerticalPoints.map((entry, i) => {
      const lastStripe = !roundedSortedVerticalPoints[i + 1]
      , lineWidth = lastStripe
         ? x + width - entry
         : roundedSortedVerticalPoints[i + 1] - entry;
      if (lineWidth <= 0) {
        return null;
      }
      const colorIndex = i % verticalFill.length;
      return (
        <rect
          key={`react-${i}`}
          x={entry} y={y}
          width={lineWidth} height={height}
          stroke="none"
          fill={verticalFill[colorIndex]}
          fillOpacity={fillOpacity}
          className={CL_BG}
      />);
  });
  return (
    <g className={CL_STRIPES_VERTICAL}>
      {items}
    </g>
  );
}

export const renderHorizontalStripes = (
  horizontalPoints,
  props
) => {
  const { horizontalFill } = props;
  if (!isPoints(horizontalFill)) {
    return null;
  }

  const {
    fillOpacity,
    x,
    y,
    width,
    height
  } = props
  , roundedSortedHorizontalPoints = horizontalPoints.map(e => Math.round(e + y - y)).sort((a, b) => a - b);
  if (y !== roundedSortedHorizontalPoints[0]) {
    roundedSortedHorizontalPoints.unshift(0);
  }

  const items = roundedSortedHorizontalPoints.map((entry, i) => {
    const lastStripe = !roundedSortedHorizontalPoints[i + 1]
    , lineHeight = lastStripe
       ? y + height - entry
       : roundedSortedHorizontalPoints[i + 1] - entry;
    if (lineHeight <= 0) {
      return null;
    }

    const colorIndex = i % horizontalFill.length;
    return (
      <rect
        key={`react-${i}`}
        y={entry} x={x}
        height={lineHeight} width={width}
        stroke="none"
        fill={horizontalFill[colorIndex]}
        fillOpacity={fillOpacity}
        className={CL_BG}
      />);
  });

  return (
   <g className={CL_STRIPES_HORIZONTAL}>
     {items}
   </g>
  );
}
