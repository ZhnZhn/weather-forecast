import { _isFn } from '../util/FnUtils';

export const isPoints = (
  points
) => points && points.length

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

const _mathRound = Math.round;
export const crRoundedSortedPoints = (
  points,
  x
) => {
  const roundedSortedPoints = points
    .map(e => _mathRound(e + x - x))
    .sort((a, b) => a - b);
  if (x !== roundedSortedPoints[0]) {
    roundedSortedPoints.unshift(0);
  }
  return roundedSortedPoints;
}

export const getFillByIndex = (
  arrFill,
  index
) => arrFill[index % arrFill.length]

export const getStripeLineDimension = (
  p0,
  entry,
  i,
  points
) => !points[i + 1]
  ? p0 - entry
  : points[i + 1] - entry
