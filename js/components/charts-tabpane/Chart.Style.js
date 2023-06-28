"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.S_YAXIS_SPEED = exports.S_YAXIS_SNOW = exports.S_YAXIS_RAIN = exports.S_YAXIS_PRESSURE = exports.S_XAXIS = exports.S_LINE_TEMP_NIGHT = exports.S_LINE_TEMP_MORNING = exports.S_LINE_TEMP_MIN = exports.S_LINE_TEMP_MAX = exports.S_LINE_TEMP_EVE = exports.S_LINE_TEMP_DAY = exports.S_LINE_SPEED = exports.S_LINE_RAIN = exports.S_LINE_PRESSURE = exports.S_LINE_HUMIDITY = exports.S_HOURLY_CHART = exports.S_COMPOSED_CHART = exports.S_CARTESIAN_GRID = exports.S_BAR_SNOW = exports.S_BAR_RAIN = void 0;
var _theme = require("../styles/theme");
var _SeriesColor = _interopRequireDefault(require("./SeriesColor"));
const DF_DASH_FILL = '#808080';
const _crDotStyle = function (r, fill, stroke, strokeWidth) {
  if (strokeWidth === void 0) {
    strokeWidth = 2;
  }
  return {
    r,
    fill,
    stroke,
    strokeWidth,
    strokeDasharray: null
  };
};
const _crLineStyle = _ref => {
  let {
    stroke,
    fill = stroke,
    dash = null
  } = _ref;
  return {
    type: "monotone",
    stroke: stroke,
    strokeWidth: 2,
    strokeDasharray: dash,
    dot: _crDotStyle(6, fill, stroke),
    activeDot: _crDotStyle(10, fill, stroke)
  };
};
const _crLineDashStyle = (stroke, fill) => _crLineStyle({
  stroke,
  fill,
  dash: "5 5"
});
const _crBarStyle = fill => ({
  barSize: 20,
  fill
});
const _crYAxisStyle = color => ({
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
});
const _CHART_MARGIN = {
  top: 24,
  right: 10,
  bottom: 30
};
const S_COMPOSED_CHART = {
  margin: {
    ..._CHART_MARGIN,
    left: -20
  }
};
exports.S_COMPOSED_CHART = S_COMPOSED_CHART;
const S_HOURLY_CHART = {
  margin: {
    ..._CHART_MARGIN,
    left: 20
  }
};
exports.S_HOURLY_CHART = S_HOURLY_CHART;
const S_XAXIS = {
  tickSize: 16,
  tick: {
    style: {
      fontWeight: 100
    },
    stroke: _theme.COLOR.DAY.color,
    fill: _theme.COLOR.DAY.color
  }
};
exports.S_XAXIS = S_XAXIS;
const S_YAXIS_SPEED = _crYAxisStyle(_SeriesColor.default.SPEED);
exports.S_YAXIS_SPEED = S_YAXIS_SPEED;
const S_YAXIS_RAIN = _crYAxisStyle(_SeriesColor.default.RAIN);
exports.S_YAXIS_RAIN = S_YAXIS_RAIN;
const S_YAXIS_SNOW = _crYAxisStyle(_SeriesColor.default.SNOW);
exports.S_YAXIS_SNOW = S_YAXIS_SNOW;
const S_YAXIS_PRESSURE = _crYAxisStyle(_SeriesColor.default.PRESSURE);
exports.S_YAXIS_PRESSURE = S_YAXIS_PRESSURE;
const S_CARTESIAN_GRID = {
  stroke: "#555",
  vertical: false
};
exports.S_CARTESIAN_GRID = S_CARTESIAN_GRID;
const S_LINE_PRESSURE = _crLineDashStyle(_SeriesColor.default.PRESSURE);
exports.S_LINE_PRESSURE = S_LINE_PRESSURE;
const S_LINE_RAIN = _crLineDashStyle(_SeriesColor.default.RAIN);
exports.S_LINE_RAIN = S_LINE_RAIN;
const S_LINE_SPEED = _crLineDashStyle(_SeriesColor.default.SPEED, DF_DASH_FILL);
exports.S_LINE_SPEED = S_LINE_SPEED;
const S_LINE_HUMIDITY = _crLineStyle({
  stroke: _SeriesColor.default.SPEED
});
exports.S_LINE_HUMIDITY = S_LINE_HUMIDITY;
const S_LINE_TEMP_MAX = _crLineDashStyle(_SeriesColor.default.TEMP_MAX, DF_DASH_FILL);
exports.S_LINE_TEMP_MAX = S_LINE_TEMP_MAX;
const S_LINE_TEMP_MIN = _crLineDashStyle(_SeriesColor.default.TEMP_MIN, DF_DASH_FILL);
exports.S_LINE_TEMP_MIN = S_LINE_TEMP_MIN;
const S_LINE_TEMP_MORNING = _crLineDashStyle(_theme.COLOR.TEMP_DAY.color, DF_DASH_FILL);
exports.S_LINE_TEMP_MORNING = S_LINE_TEMP_MORNING;
const S_LINE_TEMP_DAY = _crLineStyle({
  stroke: _theme.COLOR.TEMP_DAY.color
});
exports.S_LINE_TEMP_DAY = S_LINE_TEMP_DAY;
const S_LINE_TEMP_EVE = _crLineDashStyle(_theme.COLOR.TEMP_NIGHT.color, DF_DASH_FILL);
exports.S_LINE_TEMP_EVE = S_LINE_TEMP_EVE;
const S_LINE_TEMP_NIGHT = _crLineStyle({
  stroke: _theme.COLOR.TEMP_NIGHT.color
});
exports.S_LINE_TEMP_NIGHT = S_LINE_TEMP_NIGHT;
const S_BAR_RAIN = _crBarStyle(_SeriesColor.default.RAIN);
exports.S_BAR_RAIN = S_BAR_RAIN;
const S_BAR_SNOW = _crBarStyle(_SeriesColor.default.SNOW);
exports.S_BAR_SNOW = S_BAR_SNOW;
//# sourceMappingURL=Chart.Style.js.map