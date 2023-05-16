"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.renderVerticalStripes = exports.renderVertical = exports.renderHorizontalStripes = exports.renderHorizontal = exports.renderBackground = exports.CL_CARTESIAN_GRID = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _ReactUtils = require("../util/ReactUtils");
var _cartesianFn = require("./cartesianFn");
var _react = require("react");
var _jsxRuntime = require("react/jsx-runtime");
var _excluded = ["x1", "y1", "x2", "y2", "key"];
var CL_CARTESIAN_GRID = "recharts-cartesian-grid";
exports.CL_CARTESIAN_GRID = CL_CARTESIAN_GRID;
var CL_GRID_HORIZONTAL = CL_CARTESIAN_GRID + "-horizontal",
  CL_GRID_VERTICAL = CL_CARTESIAN_GRID + "-vertical",
  CL_BG = CL_CARTESIAN_GRID + "-bg",
  CL_STRIPES_HORIZONTAL = CL_CARTESIAN_GRID + "stripes-horizontal",
  CL_STRIPES_VERTICAL = CL_CARTESIAN_GRID + "stripes-vertical";
var _crLineElement = function _crLineElement(_ref) {
  var x1 = _ref.x1,
    y1 = _ref.y1,
    x2 = _ref.x2,
    y2 = _ref.y2,
    key = _ref.key,
    restProps = (0, _objectWithoutPropertiesLoose2["default"])(_ref, _excluded);
  return /*#__PURE__*/(0, _react.createElement)("line", (0, _extends2["default"])({}, (0, _ReactUtils.filterProps)(restProps), {
    x1: x1,
    y1: y1,
    x2: x2,
    y2: y2,
    fill: "none",
    key: key
  }));
};
var _renderLineItem = (0, _cartesianFn.fCreateElement)(_crLineElement);
var renderHorizontal = function renderHorizontal(horizontalPoints, props) {
  var x = props.x,
    width = props.width,
    horizontal = props.horizontal;
  if (!horizontalPoints || !horizontalPoints.length) {
    return null;
  }
  var items = horizontalPoints.map(function (entry, i) {
    return _renderLineItem(horizontal, (0, _extends2["default"])({}, props, {
      x1: x,
      y1: entry,
      x2: x + width,
      y2: entry,
      key: "line-" + i,
      index: i
    }));
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
    className: CL_GRID_HORIZONTAL,
    children: items
  });
};
exports.renderHorizontal = renderHorizontal;
var renderVertical = function renderVertical(verticalPoints, props) {
  var y = props.y,
    height = props.height,
    vertical = props.vertical;
  if (!verticalPoints || !verticalPoints.length) {
    return null;
  }
  var items = verticalPoints.map(function (entry, i) {
    return _renderLineItem(vertical, (0, _extends2["default"])({}, props, {
      x1: entry,
      y1: y,
      x2: entry,
      y2: y + height,
      key: "line-" + i,
      index: i
    }));
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
    className: CL_GRID_VERTICAL,
    children: items
  });
};
exports.renderVertical = renderVertical;
var renderVerticalStripes = function renderVerticalStripes(verticalPoints, props) {
  var verticalFill = props.verticalFill;
  if (!verticalFill || !verticalFill.length) {
    return null;
  }
  var fillOpacity = props.fillOpacity,
    x = props.x,
    y = props.y,
    width = props.width,
    height = props.height,
    roundedSortedVerticalPoints = verticalPoints.map(function (e) {
      return Math.round(e + x - x);
    }).sort(function (a, b) {
      return a - b;
    });
  if (x !== roundedSortedVerticalPoints[0]) {
    roundedSortedVerticalPoints.unshift(0);
  }
  var items = roundedSortedVerticalPoints.map(function (entry, i) {
    var lastStripe = !roundedSortedVerticalPoints[i + 1],
      lineWidth = lastStripe ? x + width - entry : roundedSortedVerticalPoints[i + 1] - entry;
    if (lineWidth <= 0) {
      return null;
    }
    var colorIndex = i % verticalFill.length;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
      x: entry,
      y: y,
      width: lineWidth,
      height: height,
      stroke: "none",
      fill: verticalFill[colorIndex],
      fillOpacity: fillOpacity,
      className: CL_BG
    }, "react-" + i);
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
    className: CL_STRIPES_VERTICAL,
    children: items
  });
};
exports.renderVerticalStripes = renderVerticalStripes;
var renderHorizontalStripes = function renderHorizontalStripes(horizontalPoints, props) {
  var horizontalFill = props.horizontalFill;
  if (!horizontalFill || !horizontalFill.length) {
    return null;
  }
  var fillOpacity = props.fillOpacity,
    x = props.x,
    y = props.y,
    width = props.width,
    height = props.height,
    roundedSortedHorizontalPoints = horizontalPoints.map(function (e) {
      return Math.round(e + y - y);
    }).sort(function (a, b) {
      return a - b;
    });
  if (y !== roundedSortedHorizontalPoints[0]) {
    roundedSortedHorizontalPoints.unshift(0);
  }
  var items = roundedSortedHorizontalPoints.map(function (entry, i) {
    var lastStripe = !roundedSortedHorizontalPoints[i + 1],
      lineHeight = lastStripe ? y + height - entry : roundedSortedHorizontalPoints[i + 1] - entry;
    if (lineHeight <= 0) {
      return null;
    }
    var colorIndex = i % horizontalFill.length;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
      y: entry,
      x: x,
      height: lineHeight,
      width: width,
      stroke: "none",
      fill: horizontalFill[colorIndex],
      fillOpacity: fillOpacity,
      className: CL_BG
    }, "react-" + i);
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
    className: CL_STRIPES_HORIZONTAL,
    children: items
  });
};
exports.renderHorizontalStripes = renderHorizontalStripes;
var renderBackground = function renderBackground(props) {
  var fill = props.fill;
  if (!fill || fill === 'none') {
    return null;
  }
  var fillOpacity = props.fillOpacity,
    x = props.x,
    y = props.y,
    width = props.width,
    height = props.height;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
    x: x,
    y: y,
    width: width,
    height: height,
    stroke: "none",
    fill: fill,
    fillOpacity: fillOpacity,
    className: CL_BG
  });
};
exports.renderBackground = renderBackground;
//# sourceMappingURL=CartesianGridRenderFn.js.map