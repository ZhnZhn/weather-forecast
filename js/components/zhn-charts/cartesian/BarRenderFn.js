"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.renderRectangles = exports.renderErrorBar = exports.renderBackground = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _uiApi = require("../../uiApi");
var _zhnAnimate = require("../../zhn-animate");
var _ReactUtils = require("../util/ReactUtils");
var _DataUtils = require("../util/DataUtils");
var _types = require("../util/types");
var _Rectangle = require("../shape/Rectangle");
var _Layer = require("../container/Layer");
var _ErrorBar = require("./ErrorBar");
var _cartesianFn = require("./cartesianFn");
var _jsxRuntime = require("react/jsx-runtime");
var _react = require("react");
var _excluded = ["value", "background"];
var CL_BAR_RECTANGLES = "recharts-bar-rectangle",
  CL_BAR_BACKGROUND_RECTANGLES = "recharts-bar-background-rectangle";
var _crElementRectangle = function _crElementRectangle(props) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Rectangle.Rectangle, (0, _extends2["default"])({}, props));
};
var _renderRectangle = (0, _cartesianFn.fCreateElement)(_crElementRectangle);
var _renderRectanglesStatically = function _renderRectanglesStatically(data, props) {
  var shape = props.shape,
    baseProps = (0, _ReactUtils.filterProps)(props);
  return data && data.map(function (entry, i) {
    var props = (0, _extends2["default"])({}, baseProps, entry, {
      index: i
    });
    return /*#__PURE__*/(0, _react.createElement)(_Layer.Layer, (0, _extends2["default"])({
      className: CL_BAR_RECTANGLES
    }, (0, _types.adaptEventsOfChild)(props, entry, i), {
      key: "rectangle-" + i,
      role: "img"
    }), _renderRectangle(shape, props));
  });
};
var renderBackground = function renderBackground(props) {
  var data = props.data,
    backgroundProps = (0, _ReactUtils.filterProps)(props.background);
  return data.map(function (entry, i) {
    /*eslint-disable no-unused-vars*/
    var value = entry.value,
      background = entry.background,
      rest = (0, _objectWithoutPropertiesLoose2["default"])(entry, _excluded);
    //value
    /*eslint-enable no-unused-vars*/
    if (!background) {
      return null;
    }
    var _props = (0, _extends2["default"])({}, rest, {
      fill: '#eee'
    }, background, backgroundProps, (0, _types.adaptEventsOfChild)(props, entry, i), {
      index: i,
      key: "background-bar-" + i,
      className: CL_BAR_BACKGROUND_RECTANGLES
    });
    return _renderRectangle(props.background, _props);
  });
};
exports.renderBackground = renderBackground;
var renderErrorBar = function renderErrorBar(needClip, clipPathId, isAnimationFinished, props) {
  if (props.isAnimationActive && !isAnimationFinished) {
    return null;
  }
  var data = props.data,
    xAxis = props.xAxis,
    yAxis = props.yAxis,
    layout = props.layout,
    children = props.children,
    errorBarItems = (0, _ReactUtils.findAllByType)(children, _ErrorBar.ErrorBar);
  if (!errorBarItems) {
    return null;
  }
  var offset = layout === 'vertical' ? data[0].height / 2 : data[0].width / 2,
    errorBarProps = (0, _cartesianFn.crClipPathProps)(needClip, clipPathId);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Layer.Layer, (0, _extends2["default"])({}, errorBarProps, {
    children: errorBarItems.map(function (item, i) {
      return (0, _uiApi.cloneElement)(item, {
        key: "error-bar-" + i,
        data: data,
        xAxis: xAxis,
        yAxis: yAxis,
        layout: layout,
        offset: offset,
        dataPointFormatter: _cartesianFn.dataPointFormatter
      });
    })
  }));
};
exports.renderErrorBar = renderErrorBar;
var ANIMATE_RECT_FROM = {
  t: 0
};
var ANIMATE_RECT_TO = {
  t: 1
};
var _renderRectanglesWithAnimation = function _renderRectanglesWithAnimation(props, prevData, handleAnimationStart, handleAnimationEnd) {
  var data = props.data,
    layout = props.layout,
    isAnimationActive = props.isAnimationActive,
    animationBegin = props.animationBegin,
    animationDuration = props.animationDuration,
    animationEasing = props.animationEasing,
    animationId = props.animationId;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_zhnAnimate.Animate, {
    begin: animationBegin,
    duration: animationDuration,
    isActive: isAnimationActive,
    easing: animationEasing,
    from: ANIMATE_RECT_FROM,
    to: ANIMATE_RECT_TO,
    onAnimationEnd: handleAnimationEnd,
    onAnimationStart: handleAnimationStart,
    children: function children(_ref) {
      var t = _ref.t;
      var stepData = data.map(function (entry, index) {
        var prev = prevData && prevData[index];
        if (prev) {
          var interpolatorX = (0, _DataUtils.interpolateNumber)(prev.x, entry.x),
            interpolatorY = (0, _DataUtils.interpolateNumber)(prev.y, entry.y),
            interpolatorWidth = (0, _DataUtils.interpolateNumber)(prev.width, entry.width),
            interpolatorHeight = (0, _DataUtils.interpolateNumber)(prev.height, entry.height);
          return (0, _extends2["default"])({}, entry, {
            x: interpolatorX(t),
            y: interpolatorY(t),
            width: interpolatorWidth(t),
            height: interpolatorHeight(t)
          });
        }
        if (layout === 'horizontal') {
          var _interpolatorHeight = (0, _DataUtils.interpolateNumber)(0, entry.height),
            h = _interpolatorHeight(t);
          return (0, _extends2["default"])({}, entry, {
            y: entry.y + entry.height - h,
            height: h
          });
        }
        var interpolator = (0, _DataUtils.interpolateNumber)(0, entry.width),
          w = interpolator(t);
        return (0, _extends2["default"])({}, entry, {
          width: w
        });
      });
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Layer.Layer, {
        children: _renderRectanglesStatically(stepData, props)
      });
    }
  }, "bar-" + animationId);
};
var renderRectangles = function renderRectangles(props, prevData, handleAnimationStart, handleAnimationEnd) {
  var data = props.data,
    isAnimationActive = props.isAnimationActive;
  return isAnimationActive && data && data.length
  //&& (!prevData || !_isEqual(prevData, data))
  && (!prevData || prevData !== data) ? _renderRectanglesWithAnimation(props, prevData, handleAnimationStart, handleAnimationEnd) : _renderRectanglesStatically(data, props);
};
exports.renderRectangles = renderRectangles;
//# sourceMappingURL=BarRenderFn.js.map