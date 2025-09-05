import { Animate } from '../../zhn-animate';

import { getInterpolatedNumber } from '../util/DataUtils';

import { LineCurveStatically } from './LineCurveStatically';

const _repeat = (
  lines,
  count
) => {
  const linesUnit = lines.length % 2 !== 0
    ? [...lines, 0]
    : lines;
  let result = [];
  for (let i = 0; i < count; ++i) {
    result = [...result, ...linesUnit];
  }
  return result;
};

const _getStrokeDasharray = (
  length,
  totalLength,
  lines
) => {
  const lineLength = lines.reduce((pre, next) => pre + next)
  , count = Math.floor(length / lineLength)
  , remainLength = length % lineLength
  , restLength = totalLength - length;

  let remainLines = [];
  for (let i = 0, sum = 0;; sum += lines[i], ++i) {
    if (sum + lines[i] > remainLength) {
      remainLines = [...lines.slice(0, i), remainLength - sum];
      break;
    }
  }

  const emptyLines = remainLines.length % 2 === 0
    ? [0, restLength]
    : [restLength];
  return [
    ..._repeat(lines, count),
    ...remainLines,
    ...emptyLines
  ].map(line => `${line}px`).join(', ');
};

const _mathFloor = Math.floor;
const _crStepItem = (
  entry,
  prev,
  animateNewValues,
  width,
  height,
  t
) => {
    const [x, y] = prev
      ? [
          getInterpolatedNumber(prev.x, entry.x, t),
          getInterpolatedNumber(prev.y, entry.y, t)
        ]
      // magic number of faking previous x and y location
      : animateNewValues
          ? [
              getInterpolatedNumber(width * 2, entry.x, t),
              getInterpolatedNumber(height / 2, entry.y, t)
            ]
          : [
              entry.x,
              entry.y
            ];

    return {
      ...entry,
      x,
      y
    };
};

const _crCurrentStrokeDashArray = (
  curLength,
  totalLength,
  strokeDasharray
) => strokeDasharray
  ? _getStrokeDasharray(
       curLength,
       totalLength,
       `${strokeDasharray}`.split(/[,\s]+/gim).map(num => parseFloat(num)) // lines
     )
  : `${curLength}px ${totalLength - curLength}px`;

export const LineCurveWithAnimation = ({
  clipPathProps,
  prevPoints,
  totalLength,
  props,
  refPath,
  handleAnimationStart,
  handleAnimationEnd
}) => {
  const {
    points,
    strokeDasharray,
    isAnimationActive,
    animationBegin,
    animationDuration,
    animationEasing,
    animationId,
    animateNewValues,
    width,
    height
  } = props;
  return (
    <Animate
       key={`line-${animationId}`}
       isActive={isAnimationActive}
       begin={animationBegin}
       duration={animationDuration}
       easing={animationEasing}       
       onAnimationEnd={handleAnimationEnd}
       onAnimationStart={handleAnimationStart}
    >
      {({ t }) => {
          let prevPointsDiffFactor;
          const [
            _points,
            options
          ] = prevPoints
            ? (
              prevPointsDiffFactor = prevPoints.length / points.length,
              [points.map((entry, index) => _crStepItem(
                 entry,
                 prevPoints[_mathFloor(index * prevPointsDiffFactor)],
                 animateNewValues,
                 width,
                 height,
                 t
              ))]
            )
            : [
               points,
               {strokeDasharray: _crCurrentStrokeDashArray(
                 getInterpolatedNumber(0, totalLength, t),
                 totalLength,
                 strokeDasharray
               )}
             ];

          return (
            <LineCurveStatically
              points={_points}
              clipPathProps={clipPathProps}
              props={props}
              refPath={refPath}
              options={options}
          />
        );
      }}
   </Animate>
  );
}
