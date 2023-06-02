"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.renderErrorBar = exports.renderDots = exports.renderCurve = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _uiApi = require("../../uiApi");
var _crCn = _interopRequireDefault(require("../../zhn-utils/crCn"));
var _zhnAnimate = require("../../zhn-animate");
var _ReactUtils = require("../util/ReactUtils");
var _DataUtils = require("../util/DataUtils");
var _Curve = require("../shape/Curve");
var _Dot = require("../shape/Dot");
var _Layer = require("../container/Layer");
var _ErrorBar = require("./ErrorBar");
var _cartesianFn = require("./cartesianFn");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
var _excluded = ["type", "layout", "connectNulls", "ref"];
var _crDotItem = function _crDotItem(props, option) {
  var className = (0, _crCn["default"])(_CL.CL_LINE_DOT, option && option.className);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Dot.Dot, (0, _extends2["default"])({}, props, {
    className: className
  }));
};
var _renderDotItem = (0, _cartesianFn.fCreateElement)(_crDotItem);
var renderDots = function renderDots(needClip, clipPathId, isAnimationFinished, props) {
  if (props.isAnimationActive && !isAnimationFinished) {
    return null;
  }
  var dot = props.dot,
    points = props.points,
    dataKey = props.dataKey,
    lineProps = (0, _ReactUtils.filterProps)(props),
    customDotProps = (0, _ReactUtils.filterProps)(dot, true),
    dots = points.map(function (entry, i) {
      var dotProps = (0, _extends2["default"])({
        key: "dot-" + i,
        r: 3
      }, lineProps, customDotProps, {
        value: entry.value,
        dataKey: dataKey,
        cx: entry.x,
        cy: entry.y,
        index: i,
        payload: entry.payload
      });
      return _renderDotItem(dot, dotProps);
    });
  var dotsProps = (0, _cartesianFn.crClipPathProps)(needClip, clipPathId);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Layer.Layer, (0, _extends2["default"])({
    className: _CL.CL_LINE_DOTS
  }, dotsProps, {
    role: "img",
    children: dots
  }), "dots");
};
exports.renderDots = renderDots;
var renderErrorBar = function renderErrorBar(needClip, clipPathId, isAnimationFinished, props) {
  if (props.isAnimationActive && !isAnimationFinished) {
    return null;
  }
  var points = props.points,
    xAxis = props.xAxis,
    yAxis = props.yAxis,
    layout = props.layout,
    children = props.children,
    errorBarItems = (0, _ReactUtils.findAllByType)(children, _ErrorBar.ErrorBar);
  if (!errorBarItems) {
    return null;
  }
  var errorBarProps = (0, _cartesianFn.crClipPathProps)(needClip, clipPathId);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Layer.Layer, (0, _extends2["default"])({}, errorBarProps, {
    children: errorBarItems.map(function (item, i) {
      return (0, _uiApi.cloneElement)(item, {
        key: "bar-" + i,
        data: points,
        xAxis: xAxis,
        yAxis: yAxis,
        layout: layout,
        dataPointFormatter: _cartesianFn.dataPointFormatter
      });
    })
  }));
};
exports.renderErrorBar = renderErrorBar;
var renderCurveStatically = function renderCurveStatically(points, needClip, clipPathId, props, pathRef, options) {
  /*eslint-disable no-unused-vars*/
  var type = props.type,
    layout = props.layout,
    connectNulls = props.connectNulls,
    ref = props.ref,
    restProps = (0, _objectWithoutPropertiesLoose2["default"])(props, _excluded);
  //ref
  /*eslint-enable no-unused-vars*/
  var curveProps = (0, _extends2["default"])({}, (0, _ReactUtils.filterProps)(restProps, true), {
    fill: 'none',
    className: _CL.CL_LINE_CURVE
  }, (0, _cartesianFn.crClipPathProps)(needClip, clipPathId), {
    points: points
  }, options, {
    type: type,
    layout: layout,
    connectNulls: connectNulls
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Curve.Curve, (0, _extends2["default"])({}, curveProps, {
    pathRef: pathRef
  }));
};
var _repeat = function _repeat(lines, count) {
  var linesUnit = lines.length % 2 !== 0 ? [].concat(lines, [0]) : lines;
  var result = [];
  for (var i = 0; i < count; ++i) {
    result = [].concat(result, linesUnit);
  }
  return result;
};
var _getStrokeDasharray = function _getStrokeDasharray(length, totalLength, lines) {
  var lineLength = lines.reduce(function (pre, next) {
      return pre + next;
    }),
    count = Math.floor(length / lineLength),
    remainLength = length % lineLength,
    restLength = totalLength - length;
  var remainLines = [];
  for (var i = 0, sum = 0;; sum += lines[i], ++i) {
    if (sum + lines[i] > remainLength) {
      remainLines = [].concat(lines.slice(0, i), [remainLength - sum]);
      break;
    }
  }
  var emptyLines = remainLines.length % 2 === 0 ? [0, restLength] : [restLength];
  return [].concat(_repeat(lines, count), remainLines, emptyLines).map(function (line) {
    return line + "px";
  }).join(', ');
};
var ANIMATE_CURVE_FROM = {
  t: 0
};
var ANIMATE_CURVE_TO = {
  t: 1
};
var renderCurveWithAnimation = function renderCurveWithAnimation(needClip, clipPathId, prevPoints, totalLength, props, pathRef, handleAnimationStart, handleAnimationEnd) {
  var points = props.points,
    strokeDasharray = props.strokeDasharray,
    isAnimationActive = props.isAnimationActive,
    animationBegin = props.animationBegin,
    animationDuration = props.animationDuration,
    animationEasing = props.animationEasing,
    animationId = props.animationId,
    animateNewValues = props.animateNewValues,
    width = props.width,
    height = props.height;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_zhnAnimate.Animate, {
    begin: animationBegin,
    duration: animationDuration,
    isActive: isAnimationActive,
    easing: animationEasing,
    from: ANIMATE_CURVE_FROM,
    to: ANIMATE_CURVE_TO,
    onAnimationEnd: handleAnimationEnd,
    onAnimationStart: handleAnimationStart,
    children: function children(_ref) {
      var t = _ref.t;
      if (prevPoints) {
        var prevPointsDiffFactor = prevPoints.length / points.length,
          stepData = points.map(function (entry, index) {
            var prevPointIndex = Math.floor(index * prevPointsDiffFactor);
            if (prevPoints[prevPointIndex]) {
              var prev = prevPoints[prevPointIndex],
                interpolatorX = (0, _DataUtils.interpolateNumber)(prev.x, entry.x),
                interpolatorY = (0, _DataUtils.interpolateNumber)(prev.y, entry.y);
              return (0, _extends2["default"])({}, entry, {
                x: interpolatorX(t),
                y: interpolatorY(t)
              });
            }
            // magic number of faking previous x and y location
            if (animateNewValues) {
              var _interpolatorX = (0, _DataUtils.interpolateNumber)(width * 2, entry.x),
                _interpolatorY = (0, _DataUtils.interpolateNumber)(height / 2, entry.y);
              return (0, _extends2["default"])({}, entry, {
                x: _interpolatorX(t),
                y: _interpolatorY(t)
              });
            }
            return (0, _extends2["default"])({}, entry, {
              x: entry.x,
              y: entry.y
            });
          });
        return renderCurveStatically(stepData, needClip, clipPathId, props, pathRef);
      }
      var interpolator = (0, _DataUtils.interpolateNumber)(0, totalLength),
        curLength = interpolator(t);
      var currentStrokeDasharray;
      if (strokeDasharray) {
        var lines = ("" + strokeDasharray).split(/[,\s]+/gim).map(function (num) {
          return parseFloat(num);
        });
        currentStrokeDasharray = _getStrokeDasharray(curLength, totalLength, lines);
      } else {
        currentStrokeDasharray = curLength + "px " + (totalLength - curLength) + "px";
      }
      return renderCurveStatically(points, needClip, clipPathId, props, pathRef, {
        strokeDasharray: currentStrokeDasharray
      });
    }
  }, "line-" + animationId);
};
var renderCurve = function renderCurve(needClip, clipPathId, prevPoints, totalLength, props, refPath, handleAnimationStart, handleAnimationEnd) {
  var points = props.points,
    isAnimationActive = props.isAnimationActive;
  return isAnimationActive && points && points.length
  //&& ((!prevPoints && totalLength > 0) || !_isEqual(prevPoints, points))
  && (!prevPoints && totalLength > 0 || prevPoints !== points) ? renderCurveWithAnimation(needClip, clipPathId, prevPoints, totalLength, props, refPath, handleAnimationStart, handleAnimationEnd) : renderCurveStatically(points, needClip, clipPathId, props, refPath);
};
exports.renderCurve = renderCurve;
//# sourceMappingURL=LineRenderFn.js.map