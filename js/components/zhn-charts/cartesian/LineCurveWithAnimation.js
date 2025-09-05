"use strict";

exports.__esModule = true;
exports.LineCurveWithAnimation = void 0;
var _zhnAnimate = require("../../zhn-animate");
var _DataUtils = require("../util/DataUtils");
var _LineCurveStatically = require("./LineCurveStatically");
var _jsxRuntime = require("react/jsx-runtime");
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
const _mathFloor = Math.floor;
const _crStepItem = (entry, prev, animateNewValues, width, height, t) => {
  const [x, y] = prev ? [(0, _DataUtils.getInterpolatedNumber)(prev.x, entry.x, t), (0, _DataUtils.getInterpolatedNumber)(prev.y, entry.y, t)]
  // magic number of faking previous x and y location
  : animateNewValues ? [(0, _DataUtils.getInterpolatedNumber)(width * 2, entry.x, t), (0, _DataUtils.getInterpolatedNumber)(height / 2, entry.y, t)] : [entry.x, entry.y];
  return {
    ...entry,
    x,
    y
  };
};
const _crCurrentStrokeDashArray = (curLength, totalLength, strokeDasharray) => strokeDasharray ? _getStrokeDasharray(curLength, totalLength, `${strokeDasharray}`.split(/[,\s]+/gim).map(num => parseFloat(num)) // lines
) : `${curLength}px ${totalLength - curLength}px`;
const LineCurveWithAnimation = _ref => {
  let {
    clipPathProps,
    prevPoints,
    totalLength,
    props,
    refPath,
    handleAnimationStart,
    handleAnimationEnd
  } = _ref;
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
    onAnimationEnd: handleAnimationEnd,
    onAnimationStart: handleAnimationStart,
    children: _ref2 => {
      let {
        t
      } = _ref2;
      let prevPointsDiffFactor;
      const [_points, options] = prevPoints ? (prevPointsDiffFactor = prevPoints.length / points.length, [points.map((entry, index) => _crStepItem(entry, prevPoints[_mathFloor(index * prevPointsDiffFactor)], animateNewValues, width, height, t))]) : [points, {
        strokeDasharray: _crCurrentStrokeDashArray((0, _DataUtils.getInterpolatedNumber)(0, totalLength, t), totalLength, strokeDasharray)
      }];
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_LineCurveStatically.LineCurveStatically, {
        points: _points,
        clipPathProps: clipPathProps,
        props: props,
        refPath: refPath,
        options: options
      });
    }
  }, `line-${animationId}`);
};
exports.LineCurveWithAnimation = LineCurveWithAnimation;
//# sourceMappingURL=LineCurveWithAnimation.js.map