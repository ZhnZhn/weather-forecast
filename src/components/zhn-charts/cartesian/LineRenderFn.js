import { cloneElement } from '../../uiApi';
import classNames from 'classnames';
import { Animate } from '../../zhn-animate';

import {
  findAllByType,
  filterProps
} from '../util/ReactUtils';

import { interpolateNumber } from '../util/DataUtils';

import { Curve } from '../shape/Curve';
import { Dot } from '../shape/Dot';
import { Layer } from '../container/Layer';
import { ErrorBar } from './ErrorBar';

import {
  fCreateElement,
  dataPointFormatter,
  crClipPathProps
} from './cartesianFn';

const _CHART_LINE = 'recharts-line'
, CL_LINE_DOT = `${_CHART_LINE}-dot`
, CL_LINE_DOTS = `${CL_LINE_DOT}s`
, CL_LINE_CURVE = `${_CHART_LINE}-curve`;

const _crDotItem = (
  props,
  option
) => {
 const className = classNames(
   CL_LINE_DOT,
   option ? option.className : ''
 );
 return (
   <Dot
     {...props}
     className={className}
   />
 );
};

const _renderDotItem = fCreateElement(_crDotItem);

export const renderDots = (
  needClip,
  clipPathId,
  isAnimationFinished,
  props
) => {
  if (props.isAnimationActive && !isAnimationFinished) {
    return null;
  }

  const {
    dot,
    points,
    dataKey
  } = props
  , lineProps = filterProps(props)
  , customDotProps = filterProps(dot, true)
  , dots = points.map((entry, i) => {
      const dotProps = {
        key: `dot-${i}`,
        r: 3,
        ...lineProps,
        ...customDotProps,
        value: entry.value,
        dataKey,
        cx: entry.x,
        cy: entry.y,
        index: i,
        payload: entry.payload,
      };
      return _renderDotItem(dot, dotProps);
  });

  const dotsProps = crClipPathProps(
    needClip,
    clipPathId
  );

  return (
    <Layer
       className={CL_LINE_DOTS}
       key="dots"
       {...dotsProps}
       role="img"
    >
     {dots}
    </Layer>
  );
}

export const renderErrorBar = (
  needClip,
  clipPathId,
  isAnimationFinished,
  props
) => {
  if (props.isAnimationActive && !isAnimationFinished) {
    return null;
  }

  const {
    points,
    xAxis,
    yAxis,
    layout,
    children
  } = props
  , errorBarItems = findAllByType(
     children,
     ErrorBar
  );

  if (!errorBarItems) {
    return null;
  }

  const errorBarProps = crClipPathProps(
    needClip,
    clipPathId
  );

  return (
    <Layer {...errorBarProps}>
      {errorBarItems.map((item, i) => cloneElement(item, {
         key: `bar-${i}`,
         data: points,
         xAxis,
         yAxis,
         layout,
         dataPointFormatter
      }))}
    </Layer>
  );
}

const renderCurveStatically = (
  points,
  needClip,
  clipPathId,
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
      ...restProps
    } = props;
    //ref
    /*eslint-enable no-unused-vars*/
    const curveProps = {
      ...filterProps(restProps, true),
      fill: 'none',
      className: CL_LINE_CURVE,
      ...crClipPathProps(needClip, clipPathId),
      points,
      ...options,
      type,
      layout,
      connectNulls
    };
    return (
      <Curve
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
  needClip,
  clipPathId,
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
       begin={animationBegin}
       duration={animationDuration}
       isActive={isAnimationActive}
       easing={animationEasing}
       from={ANIMATE_CURVE_FROM}
       to={ANIMATE_CURVE_TO}
       key={`line-${animationId}`}
       onAnimationEnd={handleAnimationEnd}
       onAnimationStart={handleAnimationStart}
    >
      {({ t }) => {
          if (prevPoints) {
              const prevPointsDiffFactor = prevPoints.length / points.length
              , stepData = points.map((entry, index) => {
                  const prevPointIndex = Math.floor(index * prevPointsDiffFactor);
                  if (prevPoints[prevPointIndex]) {
                      const prev = prevPoints[prevPointIndex]
                      , interpolatorX = interpolateNumber(prev.x, entry.x)
                      , interpolatorY = interpolateNumber(prev.y, entry.y);
                      return {
                        ...entry,
                        x: interpolatorX(t),
                        y: interpolatorY(t)
                      };
                  }
                  // magic number of faking previous x and y location
                  if (animateNewValues) {
                      const interpolatorX = interpolateNumber(width * 2, entry.x)
                      , interpolatorY = interpolateNumber(height / 2, entry.y);
                      return {
                        ...entry,
                        x: interpolatorX(t),
                        y: interpolatorY(t)
                      };
                  }
                  return {
                    ...entry,
                    x: entry.x,
                    y: entry.y
                  };
              });

              return renderCurveStatically(
                stepData,
                needClip,
                clipPathId,
                props,
                pathRef
              );
          }

          const interpolator = interpolateNumber(0, totalLength)
          , curLength = interpolator(t);
          let currentStrokeDasharray;
          if (strokeDasharray) {
            const lines = `${strokeDasharray}`.split(/[,\s]+/gim).map(num => parseFloat(num));
            currentStrokeDasharray = _getStrokeDasharray(curLength, totalLength, lines);
          } else {
            currentStrokeDasharray = `${curLength}px ${totalLength - curLength}px`;
          }
          return renderCurveStatically(
            points,
            needClip,
            clipPathId,
            props,
            pathRef, {
            strokeDasharray: currentStrokeDasharray
          });
      }}
   </Animate>
  );
}

export const renderCurve = (
  needClip,
  clipPathId,
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
        needClip,
        clipPathId,
        prevPoints,
        totalLength,
        props,
        refPath,
        handleAnimationStart,
        handleAnimationEnd
      )
    : renderCurveStatically(
        points,
        needClip,
        clipPathId,
        props,
        refPath
      );
}
