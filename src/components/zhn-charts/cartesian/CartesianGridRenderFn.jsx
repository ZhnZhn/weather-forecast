import { _isFn } from '../util/FnUtils';
import { filterProps } from '../util/ReactUtils';
import { fCreateElement } from './cartesianFn';

export const CL_CARTESIAN_GRID = "recharts-cartesian-grid"
const CL_GRID_HORIZONTAL = `${CL_CARTESIAN_GRID}-horizontal`
, CL_GRID_VERTICAL = `${CL_CARTESIAN_GRID}-vertical`
, CL_BG = `${CL_CARTESIAN_GRID}-bg`
, CL_STRIPES_HORIZONTAL = `${CL_CARTESIAN_GRID}stripes-horizontal`
, CL_STRIPES_VERTICAL = `${CL_CARTESIAN_GRID}stripes-vertical`;

const _crLineElement = ({
  x1,
  y1,
  x2,
  y2,
  key,
  ...restProps
}) => (
  <line
    {...filterProps(restProps)}
    x1={x1} y1={y1} x2={x2} y2={y2}
    fill="none"
    key={key}
  />
);

const _renderLineItem = fCreateElement(_crLineElement);

const _isPoints = (
  points
) => points && points.length;
const _crPoints = (
  points,
  pointsGenerator,
  generatorOptions
) => !_isPoints(points) && _isFn(pointsGenerator)
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

export const renderHorizontal = (
  horizontalPoints,
  props
) => {
  const {
    x,
    width,
    horizontal
  } = props;
  if (!_isPoints(horizontalPoints)) {
    return null;
  }

  const items = horizontalPoints.map(
    (entry, i) => _renderLineItem(horizontal, {
      ...props,
      x1: x,
      y1: entry,
      x2: x + width,
      y2: entry,
      key: `line-${i}`,
      index: i
  }));

  return (
    <g className={CL_GRID_HORIZONTAL}>
      {items}
    </g>
  );
}

export const renderVertical = (
  verticalPoints,
  props
) => {
  const {
    y,
    height,
    vertical
  } = props;
  if (!_isPoints(verticalPoints)) {
    return null;
  }

  const items = verticalPoints.map(
    (entry, i) => _renderLineItem(vertical, {
      ...props,
      x1: entry,
      y1: y,
      x2: entry,
      y2: y + height,
      key: `line-${i}`,
      index: i
  }));

  return (
    <g className={CL_GRID_VERTICAL}>
      {items}
    </g>
  );
}

export const renderVerticalStripes = (
  verticalPoints,
  props
) => {
  const { verticalFill } = props;
  if (!_isPoints(verticalFill)) {
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
  if (!_isPoints(horizontalFill)) {
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

export const renderBackground = (
  props
) => {
  const { fill } = props;
  if (!fill || fill === 'none') {
    return null;
  }

  const {
    fillOpacity,
    x,
    y,
    width,
    height
  } = props;
  return (
    <rect
       x={x} y={y}
       width={width} height={height}
       stroke="none" fill={fill}
       fillOpacity={fillOpacity}
       className={CL_BG}
    />
  );
}
