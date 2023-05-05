"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.S_YAXIS_SPEED = exports.S_YAXIS_SNOW = exports.S_YAXIS_RAIN = exports.S_YAXIS_PRESSURE = exports.S_XAXIS = exports.S_LINE_TEMP_NIGHT = exports.S_LINE_TEMP_MORNING = exports.S_LINE_TEMP_MIN = exports.S_LINE_TEMP_MAX = exports.S_LINE_TEMP_EVE = exports.S_LINE_TEMP_DAY = exports.S_LINE_SPEED = exports.S_LINE_RAIN = exports.S_LINE_PRESSURE = exports.S_LINE_HUMIDITY = exports.S_HOURLY_CHART = exports.S_COMPOSED_CHART = exports.S_CARTESIAN_GRID = exports.S_BAR_SNOW = exports.S_BAR_RAIN = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _theme = require("../styles/theme");
var _SeriesColor = _interopRequireDefault(require("./SeriesColor"));
var DF_DASH_FILL = '#808080';
var _crDotStyle = function _crDotStyle(r, fill, stroke, strokeWidth) {
  if (strokeWidth === void 0) {
    strokeWidth = 2;
  }
  return {
    r: r,
    fill: fill,
    stroke: stroke,
    strokeWidth: strokeWidth,
    strokeDasharray: null
  };
};
var _crLineStyle = function _crLineStyle(_ref) {
  var stroke = _ref.stroke,
    _ref$fill = _ref.fill,
    fill = _ref$fill === void 0 ? stroke : _ref$fill,
    _ref$dash = _ref.dash,
    dash = _ref$dash === void 0 ? null : _ref$dash;
  return {
    type: "monotone",
    stroke: stroke,
    strokeWidth: 2,
    strokeDasharray: dash,
    dot: _crDotStyle(6, fill, stroke),
    activeDot: _crDotStyle(10, fill, stroke)
  };
};
var _crLineDashStyle = function _crLineDashStyle(stroke, fill) {
  return _crLineStyle({
    stroke: stroke,
    fill: fill,
    dash: "5 5"
  });
};
var _crBarStyle = function _crBarStyle(fill) {
  return {
    barSize: 20,
    fill: fill
  };
};
var _crYAxisStyle = function _crYAxisStyle(color) {
  return {
    axisLine: {
      stroke: color
    },
    tickLine: {
      stroke: color
    },
    tick: {
      stroke: color,
      fill: color
    }
  };
};
var _CHART_MARGIN = {
  top: 24,
  right: 10,
  bottom: 30
};
var S_COMPOSED_CHART = {
  margin: (0, _extends2["default"])({}, _CHART_MARGIN, {
    left: -20
  })
};
exports.S_COMPOSED_CHART = S_COMPOSED_CHART;
var S_HOURLY_CHART = {
  margin: (0, _extends2["default"])({}, _CHART_MARGIN, {
    left: 20
  })
};
exports.S_HOURLY_CHART = S_HOURLY_CHART;
var S_XAXIS = {
  tickSize: 16,
  tick: {
    stroke: _theme.COLOR.DAY.color,
    fill: _theme.COLOR.DAY.color
  }
};
exports.S_XAXIS = S_XAXIS;
var S_YAXIS_SPEED = _crYAxisStyle(_SeriesColor["default"].SPEED);
exports.S_YAXIS_SPEED = S_YAXIS_SPEED;
var S_YAXIS_RAIN = _crYAxisStyle(_SeriesColor["default"].RAIN);
exports.S_YAXIS_RAIN = S_YAXIS_RAIN;
var S_YAXIS_SNOW = _crYAxisStyle(_SeriesColor["default"].SNOW);
exports.S_YAXIS_SNOW = S_YAXIS_SNOW;
var S_YAXIS_PRESSURE = _crYAxisStyle(_SeriesColor["default"].PRESSURE);
exports.S_YAXIS_PRESSURE = S_YAXIS_PRESSURE;
var S_CARTESIAN_GRID = {
  stroke: "#555",
  vertical: false
};
exports.S_CARTESIAN_GRID = S_CARTESIAN_GRID;
var S_LINE_PRESSURE = _crLineDashStyle(_SeriesColor["default"].PRESSURE);
exports.S_LINE_PRESSURE = S_LINE_PRESSURE;
var S_LINE_RAIN = _crLineDashStyle(_SeriesColor["default"].RAIN);
exports.S_LINE_RAIN = S_LINE_RAIN;
var S_LINE_SPEED = _crLineDashStyle(_SeriesColor["default"].SPEED, DF_DASH_FILL);
exports.S_LINE_SPEED = S_LINE_SPEED;
var S_LINE_HUMIDITY = _crLineStyle({
  stroke: _SeriesColor["default"].SPEED
});
exports.S_LINE_HUMIDITY = S_LINE_HUMIDITY;
var S_LINE_TEMP_MAX = _crLineDashStyle(_SeriesColor["default"].TEMP_MAX, DF_DASH_FILL);
exports.S_LINE_TEMP_MAX = S_LINE_TEMP_MAX;
var S_LINE_TEMP_MIN = _crLineDashStyle(_SeriesColor["default"].TEMP_MIN, DF_DASH_FILL);
exports.S_LINE_TEMP_MIN = S_LINE_TEMP_MIN;
var S_LINE_TEMP_MORNING = _crLineDashStyle(_theme.COLOR.TEMP_DAY.color, DF_DASH_FILL);
exports.S_LINE_TEMP_MORNING = S_LINE_TEMP_MORNING;
var S_LINE_TEMP_DAY = _crLineStyle({
  stroke: _theme.COLOR.TEMP_DAY.color
});
exports.S_LINE_TEMP_DAY = S_LINE_TEMP_DAY;
var S_LINE_TEMP_EVE = _crLineDashStyle(_theme.COLOR.TEMP_NIGHT.color, DF_DASH_FILL);
exports.S_LINE_TEMP_EVE = S_LINE_TEMP_EVE;
var S_LINE_TEMP_NIGHT = _crLineStyle({
  stroke: _theme.COLOR.TEMP_NIGHT.color
});
exports.S_LINE_TEMP_NIGHT = S_LINE_TEMP_NIGHT;
var S_BAR_RAIN = _crBarStyle(_SeriesColor["default"].RAIN);
exports.S_BAR_RAIN = S_BAR_RAIN;
var S_BAR_SNOW = _crBarStyle(_SeriesColor["default"].SNOW);
exports.S_BAR_SNOW = S_BAR_SNOW;
//# sourceMappingURL=Chart.Style.js.map