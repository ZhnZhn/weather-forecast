"use strict";

exports.__esModule = true;
exports.renderVerticalStripes = exports.renderVertical = exports.renderHorizontalStripes = exports.renderHorizontal = exports.crGridPoints = void 0;
var _FnUtils = require("../util/FnUtils");
var _ReactUtils = require("../util/ReactUtils");
var _cartesianFn = require("./cartesianFn");
var _CL = require("../CL");
var _react = require("react");
var _jsxRuntime = require("react/jsx-runtime");
const _crLineElement = _ref => {
  let {
    x1,
    y1,
    x2,
    y2,
    key,
    ...restProps
  } = _ref;
  return /*#__PURE__*/(0, _react.createElement)("line", {
    ...(0, _ReactUtils.filterProps)(restProps),
    x1: x1,
    y1: y1,
    x2: x2,
    y2: y2,
    fill: "none",
    key: key
  });
};
const _renderLineItem = (0, _cartesianFn.fCreateElement)(_crLineElement);
const _isPoints = points => points && points.length;
const _crPoints = (points, pointsGenerator, generatorOptions) => !_isPoints(points) && (0, _FnUtils._isFn)(pointsGenerator) ? pointsGenerator(generatorOptions) : points;
const crGridPoints = props => {
  const {
      horizontalCoordinatesGenerator,
      verticalCoordinatesGenerator,
      xAxis,
      yAxis,
      offset,
      chartWidth,
      chartHeight
    } = props,
    _generatorOptions = {
      width: chartWidth,
      height: chartHeight,
      offset
    };
  return [_crPoints(props.horizontalPoints, horizontalCoordinatesGenerator, {
    ..._generatorOptions,
    yAxis
  }), _crPoints(props.verticalPoints, verticalCoordinatesGenerator, {
    ..._generatorOptions,
    xAxis
  })];
};
exports.crGridPoints = crGridPoints;
const renderHorizontal = (horizontalPoints, props) => {
  const {
    x,
    width,
    horizontal
  } = props;
  if (!_isPoints(horizontalPoints)) {
    return null;
  }
  const items = horizontalPoints.map((entry, i) => _renderLineItem(horizontal, {
    ...props,
    x1: x,
    y1: entry,
    x2: x + width,
    y2: entry,
    key: `line-${i}`,
    index: i
  }));
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
    className: _CL.CL_GRID_HORIZONTAL,
    children: items
  });
};
exports.renderHorizontal = renderHorizontal;
const renderVertical = (verticalPoints, props) => {
  const {
    y,
    height,
    vertical
  } = props;
  if (!_isPoints(verticalPoints)) {
    return null;
  }
  const items = verticalPoints.map((entry, i) => _renderLineItem(vertical, {
    ...props,
    x1: entry,
    y1: y,
    x2: entry,
    y2: y + height,
    key: `line-${i}`,
    index: i
  }));
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
    className: _CL.CL_GRID_VERTICAL,
    children: items
  });
};
exports.renderVertical = renderVertical;
const renderVerticalStripes = (verticalPoints, props) => {
  const {
    verticalFill
  } = props;
  if (!_isPoints(verticalFill)) {
    return null;
  }
  const {
      fillOpacity,
      x,
      y,
      width,
      height
    } = props,
    roundedSortedVerticalPoints = verticalPoints.map(e => Math.round(e + x - x)).sort((a, b) => a - b);
  if (x !== roundedSortedVerticalPoints[0]) {
    roundedSortedVerticalPoints.unshift(0);
  }
  const items = roundedSortedVerticalPoints.map((entry, i) => {
    const lastStripe = !roundedSortedVerticalPoints[i + 1],
      lineWidth = lastStripe ? x + width - entry : roundedSortedVerticalPoints[i + 1] - entry;
    if (lineWidth <= 0) {
      return null;
    }
    const colorIndex = i % verticalFill.length;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
      x: entry,
      y: y,
      width: lineWidth,
      height: height,
      stroke: "none",
      fill: verticalFill[colorIndex],
      fillOpacity: fillOpacity,
      className: _CL.CL_BG
    }, `react-${i}`);
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
    className: _CL.CL_STRIPES_VERTICAL,
    children: items
  });
};
exports.renderVerticalStripes = renderVerticalStripes;
const renderHorizontalStripes = (horizontalPoints, props) => {
  const {
    horizontalFill
  } = props;
  if (!_isPoints(horizontalFill)) {
    return null;
  }
  const {
      fillOpacity,
      x,
      y,
      width,
      height
    } = props,
    roundedSortedHorizontalPoints = horizontalPoints.map(e => Math.round(e + y - y)).sort((a, b) => a - b);
  if (y !== roundedSortedHorizontalPoints[0]) {
    roundedSortedHorizontalPoints.unshift(0);
  }
  const items = roundedSortedHorizontalPoints.map((entry, i) => {
    const lastStripe = !roundedSortedHorizontalPoints[i + 1],
      lineHeight = lastStripe ? y + height - entry : roundedSortedHorizontalPoints[i + 1] - entry;
    if (lineHeight <= 0) {
      return null;
    }
    const colorIndex = i % horizontalFill.length;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
      y: entry,
      x: x,
      height: lineHeight,
      width: width,
      stroke: "none",
      fill: horizontalFill[colorIndex],
      fillOpacity: fillOpacity,
      className: _CL.CL_BG
    }, `react-${i}`);
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
    className: _CL.CL_STRIPES_HORIZONTAL,
    children: items
  });
};
exports.renderHorizontalStripes = renderHorizontalStripes;
//# sourceMappingURL=CartesianGridRenderFn.js.map