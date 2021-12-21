"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _theme = require("../styles/theme");

var _SeriesColor = _interopRequireDefault(require("./SeriesColor"));

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
    //width: 645,
    //height: 300,
    margin: {
      top: 20,
      right: 10,
      bottom: 30,
      left: -20
    }
  },
  HourlyChart: {
    //width: 645,
    //height: 300,
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
  YAxisPressure: _crYAxisStyle(_SeriesColor["default"].PRESSURE),
  CartesianGrid: {
    stroke: "#555",
    vertical: false
  },
  LinePressure: _crLineStyle({
    stroke: _SeriesColor["default"].PRESSURE,
    dash: "5 5"
  }),
  LineRain: _crLineStyle({
    stroke: _SeriesColor["default"].RAIN,
    dash: "5 5"
  }),
  LineSpeed: _crLineStyle({
    stroke: _SeriesColor["default"].SPEED,
    fill: '#808080',
    dash: "5 5"
  }),
  LineHumidity: _crLineStyle({
    stroke: _SeriesColor["default"].SPEED
  }),
  LineTempMax: _crLineStyle({
    stroke: _SeriesColor["default"].TEMP_MAX,
    fill: "#808080",
    dash: "5 5"
  }),
  LineTempMin: _crLineStyle({
    stroke: _SeriesColor["default"].TEMP_MIN,
    fill: "#808080",
    dash: "5 5"
  }),
  LineTempMorn: _crLineStyle({
    stroke: _theme.COLOR.TEMP_DAY.color,
    fill: "#808080",
    dash: "5 5"
  }),
  LineTempDay: _crLineStyle({
    stroke: _theme.COLOR.TEMP_DAY.color
  }),
  LineTempEve: _crLineStyle({
    stroke: _theme.COLOR.TEMP_NIGHT.color,
    fill: "#808080",
    dash: "5 5"
  }),
  LineTempNight: _crLineStyle({
    stroke: _theme.COLOR.TEMP_NIGHT.color
  })
};
var _default = STYLE;
exports["default"] = _default;
//# sourceMappingURL=Chart.Style.js.map