"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.ErrorBar = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _Layer = require("../container/Layer");
var _ReactUtils = require("../util/ReactUtils");
var _react = require("react");
var _jsxRuntime = require("react/jsx-runtime");
var _excluded = ["offset", "layout", "width", "dataKey", "data", "dataPointFormatter", "xAxis", "yAxis"];
var CL_ERR_BAR = "recharts-errorBar",
  CL_ERR_BARS = CL_ERR_BAR + "s";
var _isArr = Array.isArray;
var _crLine = function _crLine(x1, y1, x2, y2) {
  return {
    x1: x1,
    y1: y1,
    x2: x2,
    y2: y2
  };
};
var ErrorBar = function ErrorBar(props) {
  var offset = props.offset,
    layout = props.layout,
    width = props.width,
    dataKey = props.dataKey,
    data = props.data,
    dataPointFormatter = props.dataPointFormatter,
    xAxis = props.xAxis,
    yAxis = props.yAxis,
    restProps = (0, _objectWithoutPropertiesLoose2["default"])(props, _excluded),
    svgProps = (0, _ReactUtils.filterProps)(restProps),
    errorBars = data.map(function (entry, i) {
      var _dataPointFormatter = dataPointFormatter(entry, dataKey),
        x = _dataPointFormatter.x,
        y = _dataPointFormatter.y,
        value = _dataPointFormatter.value,
        errorVal = _dataPointFormatter.errorVal;
      if (!errorVal) {
        return null;
      }
      var lineCoordinates = [],
        _ref = _isArr(errorVal) ? errorVal : [errorVal, errorVal],
        lowBound = _ref[0],
        highBound = _ref[1];
      if (layout === 'vertical') {
        // error bar for horizontal charts, the y is fixed, x is a range value
        var scale = xAxis.scale,
          yMid = y + offset,
          yMin = yMid + width,
          yMax = yMid - width,
          xMin = scale(value - lowBound),
          xMax = scale(value + highBound);

        // the right line of |--|
        lineCoordinates.push(_crLine(xMax, yMin, xMax, yMax));
        // the middle line of |--|
        lineCoordinates.push(_crLine(xMin, yMid, xMax, yMid));
        // the left line of |--|
        lineCoordinates.push(_crLine(xMin, yMin, xMin, yMax));
      } else if (layout === 'horizontal') {
        // error bar for horizontal charts, the x is fixed, y is a range value
        var _scale = yAxis.scale,
          xMid = x + offset,
          _xMin = xMid - width,
          _xMax = xMid + width,
          _yMin = _scale(value - lowBound),
          _yMax = _scale(value + highBound);

        // the top line
        lineCoordinates.push(_crLine(_xMin, _yMax, _xMax, _yMax));
        // the middle line
        lineCoordinates.push(_crLine(xMid, _yMin, xMid, _yMax));
        // the bottom line
        lineCoordinates.push(_crLine(_xMin, _yMin, _xMax, _yMin));
      }
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Layer.Layer, (0, _extends2["default"])({
        className: CL_ERR_BAR
      }, svgProps, {
        children: lineCoordinates.map(function (coordinates, index) {
          return /*#__PURE__*/(0, _react.createElement)("line", (0, _extends2["default"])({}, coordinates, {
            key: "line-" + index
          }));
        })
      }), "bar-" + i);
    });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Layer.Layer, {
    className: CL_ERR_BARS,
    children: errorBars
  });
};
exports.ErrorBar = ErrorBar;
ErrorBar.defaultProps = {
  stroke: 'black',
  strokeWidth: 1.5,
  width: 5,
  offset: 0,
  layout: 'horizontal'
};
ErrorBar.displayName = 'ErrorBar';
//# sourceMappingURL=ErrorBar.js.map