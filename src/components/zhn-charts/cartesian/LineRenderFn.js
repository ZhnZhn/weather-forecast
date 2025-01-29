import { Animate } from '../../zhn-animate';

import { filterProps } from '../util/ReactUtils';
import { getInterpolatedNumber } from '../util/DataUtils';

import { Curve } from '../shape/Curve';

import { CL_LINE_CURVE } from '../CL';

const renderCurveStatically = (
  points,
  clipPathProps,
  props,
  pathRef,
  options
) => {
   /*eslint-disable no-unused-vars*/
    const {
      type,
      layout,
      connectNulls,
      ref,
      key,
      ...restProps
    } = props;
    //ref
    /*eslint-enable no-unused-vars*/
    const curveProps = {
      ...filterProps(restProps, true),
      fill: 'none',
      className: CL_LINE_CURVE,
      ...clipPathProps,
      points,
      ...options,
      type,
      layout,
      connectNulls
    };
    return (
      <Curve
        key={key}
        {...curveProps}
        pathRef={pathRef}
      />
    );
}

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

const ANIMATE_CURVE_FROM = {t: 0};
const ANIMATE_CURVE_TO = {t: 1};


const renderCurveWithAnimation = (
  clipPathProps,
  prevPoints,
  totalLength,
  props,
  pathRef,
  handleAnimationStart,
  handleAnimationEnd
) => {
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
       from={ANIMATE_CURVE_FROM}
       to={ANIMATE_CURVE_TO}
       onAnimationEnd={handleAnimationEnd}
       onAnimationStart={handleAnimationStart}
    >
      {({ t }) => {
          if (prevPoints) {
              const prevPointsDiffFactor = prevPoints.length / points.length
              , stepData = points.map((entry, index) => {
                  const prevPointIndex = Math.floor(index * prevPointsDiffFactor)
                  , prev = prevPoints[prevPointIndex]
                  , [x, y] = prev
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
              });

              return renderCurveStatically(
                stepData,
                clipPathProps,
                props,
                pathRef
              );
          }

          const curLength = getInterpolatedNumber(0, totalLength, t)
          , currentStrokeDasharray = strokeDasharray
            ? _getStrokeDasharray(
                 curLength,
                 totalLength,
                 `${strokeDasharray}`.split(/[,\s]+/gim).map(num => parseFloat(num)) // lines
               )
            :  `${curLength}px ${totalLength - curLength}px`;

          return renderCurveStatically(
            points,
            clipPathProps,
            props,
            pathRef, {
            strokeDasharray: currentStrokeDasharray
          });
      }}
   </Animate>
  );
}

export const renderCurve = (
  clipPathProps,
  prevPoints,
  totalLength,
  props,
  refPath,
  handleAnimationStart,
  handleAnimationEnd
) => {
  const {
    points,
    isAnimationActive
  } = props;
  return isAnimationActive
    && points
    && points.length
    //&& ((!prevPoints && totalLength > 0) || !_isEqual(prevPoints, points))
    && ((!prevPoints && totalLength > 0) || prevPoints !== points)
    ? renderCurveWithAnimation(
        clipPathProps,
        prevPoints,
        totalLength,
        props,
        refPath,
        handleAnimationStart,
        handleAnimationEnd
      )
    : renderCurveStatically(
        points,
        clipPathProps,
        props,
        refPath
      );
}
