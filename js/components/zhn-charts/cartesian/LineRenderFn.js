"use strict";

exports.__esModule = true;
exports.renderCurve = void 0;
var _zhnAnimate = require("../../zhn-animate");
var _ReactUtils = require("../util/ReactUtils");
var _DataUtils = require("../util/DataUtils");
var _Curve = require("../shape/Curve");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
const renderCurveStatically = (points, clipPathProps, props, pathRef, options) => {
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
    ...(0, _ReactUtils.filterProps)(restProps, true),
    fill: 'none',
    className: _CL.CL_LINE_CURVE,
    ...clipPathProps,
    points,
    ...options,
    type,
    layout,
    connectNulls
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Curve.Curve, {
    ...curveProps,
    pathRef: pathRef
  }, key);
};
const _repeat = (lines, count) => {
  const linesUnit = lines.length % 2 !== 0 ? [...lines, 0] : lines;
  let result = [];
  for (let i = 0; i < count; ++i) {
    result = [...result, ...linesUnit];
  }
  return result;
};
const _getStrokeDasharray = (length, totalLength, lines) => {
  const lineLength = lines.reduce((pre, next) => pre + next),
    count = Math.floor(length / lineLength),
    remainLength = length % lineLength,
    restLength = totalLength - length;
  let remainLines = [];
  for (let i = 0, sum = 0;; sum += lines[i], ++i) {
    if (sum + lines[i] > remainLength) {
      remainLines = [...lines.slice(0, i), remainLength - sum];
      break;
    }
  }
  const emptyLines = remainLines.length % 2 === 0 ? [0, restLength] : [restLength];
  return [..._repeat(lines, count), ...remainLines, ...emptyLines].map(line => `${line}px`).join(', ');
};
const ANIMATE_CURVE_FROM = {
  t: 0
};
const ANIMATE_CURVE_TO = {
  t: 1
};
const renderCurveWithAnimation = (clipPathProps, prevPoints, totalLength, props, pathRef, handleAnimationStart, handleAnimationEnd) => {
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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_zhnAnimate.Animate, {
    isActive: isAnimationActive,
    begin: animationBegin,
    duration: animationDuration,
    easing: animationEasing,
    from: ANIMATE_CURVE_FROM,
    to: ANIMATE_CURVE_TO,
    onAnimationEnd: handleAnimationEnd,
    onAnimationStart: handleAnimationStart,
    children: _ref => {
      let {
        t
      } = _ref;
      if (prevPoints) {
        const prevPointsDiffFactor = prevPoints.length / points.length,
          stepData = points.map((entry, index) => {
            const prevPointIndex = Math.floor(index * prevPointsDiffFactor);
            if (prevPoints[prevPointIndex]) {
              const prev = prevPoints[prevPointIndex],
                interpolatorX = (0, _DataUtils.interpolateNumber)(prev.x, entry.x),
                interpolatorY = (0, _DataUtils.interpolateNumber)(prev.y, entry.y);
              return {
                ...entry,
                x: interpolatorX(t),
                y: interpolatorY(t)
              };
            }
            // magic number of faking previous x and y location
            if (animateNewValues) {
              const interpolatorX = (0, _DataUtils.interpolateNumber)(width * 2, entry.x),
                interpolatorY = (0, _DataUtils.interpolateNumber)(height / 2, entry.y);
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
        return renderCurveStatically(stepData, clipPathProps, props, pathRef);
      }
      const interpolator = (0, _DataUtils.interpolateNumber)(0, totalLength),
        curLength = interpolator(t);
      let currentStrokeDasharray;
      if (strokeDasharray) {
        const lines = `${strokeDasharray}`.split(/[,\s]+/gim).map(num => parseFloat(num));
        currentStrokeDasharray = _getStrokeDasharray(curLength, totalLength, lines);
      } else {
        currentStrokeDasharray = `${curLength}px ${totalLength - curLength}px`;
      }
      return renderCurveStatically(points, clipPathProps, props, pathRef, {
        strokeDasharray: currentStrokeDasharray
      });
    }
  }, `line-${animationId}`);
};
const renderCurve = (clipPathProps, prevPoints, totalLength, props, refPath, handleAnimationStart, handleAnimationEnd) => {
  const {
    points,
    isAnimationActive
  } = props;
  return isAnimationActive && points && points.length
  //&& ((!prevPoints && totalLength > 0) || !_isEqual(prevPoints, points))
  && (!prevPoints && totalLength > 0 || prevPoints !== points) ? renderCurveWithAnimation(clipPathProps, prevPoints, totalLength, props, refPath, handleAnimationStart, handleAnimationEnd) : renderCurveStatically(points, clipPathProps, props, refPath);
};
exports.renderCurve = renderCurve;
//# sourceMappingURL=LineRenderFn.js.map