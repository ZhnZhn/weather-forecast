"use strict";

exports.__esModule = true;
exports.S_YAXIS_SPEED = exports.S_YAXIS_SNOW = exports.S_YAXIS_RAIN = exports.S_YAXIS_PRESSURE = exports.S_XAXIS = exports.S_LINE_TEMP_NIGHT = exports.S_LINE_TEMP_MORNING = exports.S_LINE_TEMP_MIN = exports.S_LINE_TEMP_MAX = exports.S_LINE_TEMP_EVE = exports.S_LINE_TEMP_DAY = exports.S_LINE_SPEED = exports.S_LINE_RAIN = exports.S_LINE_PRESSURE = exports.S_LINE_HUMIDITY = exports.S_HOURLY_CHART = exports.S_COMPOSED_CHART = exports.S_CARTESIAN_GRID = exports.S_BAR_SNOW = exports.S_BAR_RAIN = void 0;
var _uiTheme = require("../styles/uiTheme");
var _SeriesColor = require("./SeriesColor");
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
const S_COMPOSED_CHART = exports.S_COMPOSED_CHART = {
  margin: Object.assign({}, _CHART_MARGIN, {
    left: -20
  })
};
const S_HOURLY_CHART = exports.S_HOURLY_CHART = {
  margin: Object.assign({}, _CHART_MARGIN, {
    left: 20
  })
};
const S_XAXIS = exports.S_XAXIS = {
  tickSize: 16,
  tick: {
    style: {
      fontWeight: 100
    },
    stroke: _uiTheme.DAY_COLOR,
    fill: _uiTheme.DAY_COLOR
  }
};
const S_YAXIS_SPEED = exports.S_YAXIS_SPEED = _crYAxisStyle(_SeriesColor.SPEED_COLOR);
const S_YAXIS_RAIN = exports.S_YAXIS_RAIN = _crYAxisStyle(_SeriesColor.RAIN_COLOR);
const S_YAXIS_SNOW = exports.S_YAXIS_SNOW = _crYAxisStyle(_SeriesColor.SNOW_COLOR);
const S_YAXIS_PRESSURE = exports.S_YAXIS_PRESSURE = _crYAxisStyle(_SeriesColor.PRESSURE_COLOR);
const S_CARTESIAN_GRID = exports.S_CARTESIAN_GRID = {
  stroke: "#555",
  vertical: false
};
const S_LINE_PRESSURE = exports.S_LINE_PRESSURE = _crLineDashStyle(_SeriesColor.PRESSURE_COLOR);
const S_LINE_RAIN = exports.S_LINE_RAIN = _crLineDashStyle(_SeriesColor.RAIN_COLOR);
const S_LINE_SPEED = exports.S_LINE_SPEED = _crLineDashStyle(_SeriesColor.SPEED_COLOR, DF_DASH_FILL);
const S_LINE_HUMIDITY = exports.S_LINE_HUMIDITY = _crLineStyle({
  stroke: _SeriesColor.SPEED_COLOR
});
const S_LINE_TEMP_MAX = exports.S_LINE_TEMP_MAX = _crLineDashStyle(_SeriesColor.TEMP_MAX_COLOR, DF_DASH_FILL);
const S_LINE_TEMP_MIN = exports.S_LINE_TEMP_MIN = _crLineDashStyle(_SeriesColor.TEMP_MIN_COLOR, DF_DASH_FILL);
const S_LINE_TEMP_MORNING = exports.S_LINE_TEMP_MORNING = _crLineDashStyle(_uiTheme.TEMP_DAY_COLOR, DF_DASH_FILL);
const S_LINE_TEMP_DAY = exports.S_LINE_TEMP_DAY = _crLineStyle({
  stroke: _uiTheme.TEMP_DAY_COLOR
});
const S_LINE_TEMP_EVE = exports.S_LINE_TEMP_EVE = _crLineDashStyle(_uiTheme.TEMP_NIGHT_COLOR, DF_DASH_FILL);
const S_LINE_TEMP_NIGHT = exports.S_LINE_TEMP_NIGHT = _crLineStyle({
  stroke: _uiTheme.TEMP_NIGHT_COLOR
});
const S_BAR_RAIN = exports.S_BAR_RAIN = _crBarStyle(_SeriesColor.RAIN_COLOR);
const S_BAR_SNOW = exports.S_BAR_SNOW = _crBarStyle(_SeriesColor.SNOW_COLOR);
//# sourceMappingURL=Chart.Style.js.map