"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.renderDots = exports.renderCurve = void 0;
var _crCn = _interopRequireDefault(require("../../zhn-utils/crCn"));
var _zhnAnimate = require("../../zhn-animate");
var _ReactUtils = require("../util/ReactUtils");
var _DataUtils = require("../util/DataUtils");
var _Curve = require("../shape/Curve");
var _Dot = require("../shape/Dot");
var _Layer = require("../container/Layer");
var _cartesianFn = require("./cartesianFn");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
const _crDotItem = (_ref, option) => {
  let {
    key,
    ...restProps
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Dot.Dot, {
    ...restProps,
    className: (0, _crCn.default)(_CL.CL_LINE_DOT, option && option.className)
  }, key);
};
const _renderDotItem = (0, _cartesianFn.fCreateElement)(_crDotItem);
const renderDots = (needClip, clipPathId, props) => {
  const {
      dot,
      points,
      dataKey
    } = props,
    lineProps = (0, _ReactUtils.filterProps)(props),
    customDotProps = (0, _ReactUtils.filterProps)(dot, true),
    dots = points.map((entry, i) => {
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
        payload: entry.payload
      };
      return _renderDotItem(dot, dotProps);
    });
  const dotsProps = (0, _cartesianFn.crClipPathProps)(needClip, clipPathId);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Layer.Layer, {
    className: _CL.CL_LINE_DOTS,
    ...dotsProps,
    role: "img",
    children: dots
  }, "dots");
};
exports.renderDots = renderDots;
const renderCurveStatically = (points, needClip, clipPathId, props, pathRef, options) => {
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
    ...(0, _cartesianFn.crClipPathProps)(needClip, clipPathId),
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
const renderCurveWithAnimation = (needClip, clipPathId, prevPoints, totalLength, props, pathRef, handleAnimationStart, handleAnimationEnd) => {
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
    children: _ref2 => {
      let {
        t
      } = _ref2;
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
        return renderCurveStatically(stepData, needClip, clipPathId, props, pathRef);
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
      return renderCurveStatically(points, needClip, clipPathId, props, pathRef, {
        strokeDasharray: currentStrokeDasharray
      });
    }
  }, `line-${animationId}`);
};
const renderCurve = (needClip, clipPathId, prevPoints, totalLength, props, refPath, handleAnimationStart, handleAnimationEnd) => {
  const {
    points,
    isAnimationActive
  } = props;
  return isAnimationActive && points && points.length
  //&& ((!prevPoints && totalLength > 0) || !_isEqual(prevPoints, points))
  && (!prevPoints && totalLength > 0 || prevPoints !== points) ? renderCurveWithAnimation(needClip, clipPathId, prevPoints, totalLength, props, refPath, handleAnimationStart, handleAnimationEnd) : renderCurveStatically(points, needClip, clipPathId, props, refPath);
};
exports.renderCurve = renderCurve;
//# sourceMappingURL=LineRenderFn.js.map