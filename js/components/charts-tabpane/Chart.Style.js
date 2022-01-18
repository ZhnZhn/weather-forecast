"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _theme = require("../styles/theme");

var _SeriesColor = _interopRequireDefault(require("./SeriesColor"));

var DF_DASH_FILL = '#808080';

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
    dot: {
      r: 6,
      strokeWidth: 2,
      strokeDasharray: null,
      stroke: stroke,
      fill: fill
    },
    activeDot: {
      r: 10,
      strokeWidth: 2,
      strokeDasharray: null,
      stroke: stroke,
      fill: fill
    }
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

var STYLE = {
  ComposedChart: {
    margin: {
      top: 20,
      right: 10,
      bottom: 30,
      left: -20
    }
  },
  HourlyChart: {
    margin: {
      top: 24,
      right: 10,
      bottom: 30,
      left: 20
    }
  },
  XAxis: {
    tickSize: 16,
    tick: {
      stroke: _theme.COLOR.DAY.color,
      fill: _theme.COLOR.DAY.color
    }
  },
  YAxisSpeed: _crYAxisStyle(_SeriesColor["default"].SPEED),
  YAxisRain: _crYAxisStyle(_SeriesColor["default"].RAIN),
  YAxisSnow: _crYAxisStyle(_SeriesColor["default"].SNOW),
  YAxisPressure: _crYAxisStyle(_SeriesColor["default"].PRESSURE),
  CartesianGrid: {
    stroke: "#555",
    vertical: false
  },
  LinePressure: _crLineDashStyle(_SeriesColor["default"].PRESSURE),
  LineRain: _crLineDashStyle(_SeriesColor["default"].RAIN),
  LineSpeed: _crLineDashStyle(_SeriesColor["default"].SPEED, DF_DASH_FILL),
  LineHumidity: _crLineStyle({
    stroke: _SeriesColor["default"].SPEED
  }),
  LineTempMax: _crLineDashStyle(_SeriesColor["default"].TEMP_MAX, DF_DASH_FILL),
  LineTempMin: _crLineDashStyle(_SeriesColor["default"].TEMP_MIN, DF_DASH_FILL),
  LineTempMorn: _crLineDashStyle(_theme.COLOR.TEMP_DAY.color, DF_DASH_FILL),
  LineTempDay: _crLineStyle({
    stroke: _theme.COLOR.TEMP_DAY.color
  }),
  LineTempEve: _crLineDashStyle(_theme.COLOR.TEMP_NIGHT.color, DF_DASH_FILL),
  LineTempNight: _crLineStyle({
    stroke: _theme.COLOR.TEMP_NIGHT.color
  }),
  BarRain: _crBarStyle(_SeriesColor["default"].RAIN),
  BarSnow: _crBarStyle(_SeriesColor["default"].SNOW)
};
var _default = STYLE;
exports["default"] = _default;
//# sourceMappingURL=Chart.Style.js.map