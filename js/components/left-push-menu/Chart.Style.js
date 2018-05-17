'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _theme = require('../styles/theme');

var _fnLine = function _fnLine(_ref) {
  var stroke = _ref.stroke,
      fill = _ref.fill,
      _ref$dash = _ref.dash,
      dash = _ref$dash === undefined ? null : _ref$dash;

  if (!fill) {
    fill = stroke;
  }
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

var _fnYAxis = function _fnYAxis(color) {
  return {
    axisLine: { stroke: color },
    tickLine: { stroke: color },
    tick: { stroke: color, fill: color }
  };
};

var STYLE = {
  ComposedChart: {
    //width: 645,
    //height: 300,
    margin: { top: 20, right: -10, bottom: 30, left: -20 }
  },
  HourlyChart: {
    //width: 645,
    //height: 300,
    margin: { top: 20, right: 10, bottom: 30, left: 20 }
  },
  XAxis: {
    tickSize: 16,
    tick: {
      stroke: _theme.COLOR.DAY.color,
      fill: _theme.COLOR.DAY.color
    }
  },
  YAxisSpeed: _fnYAxis('#3F51B5'),
  YAxisRain: _fnYAxis('#0922A5'),
  YAxisPressure: _fnYAxis('#0D2339'),
  CartesianGrid: {
    stroke: "#555",
    vertical: false
  },
  LinePressure: _fnLine({
    stroke: '#0D2339', fill: '#0D2339', dash: "5 5"
  }),
  LineRain: _fnLine({
    stroke: '#0922a5', fill: '#0922a5', dash: "5 5"
  }),
  LineSpeed: _fnLine({
    stroke: '#3f51b5', fill: '#808080', dash: "5 5"
  }),
  LineTempMax: _fnLine({
    stroke: '#F44336', fill: "#808080", dash: "5 5"
  }),
  LineTempMin: _fnLine({
    stroke: '#03a9f4', fill: "#808080", dash: "5 5"
  }),
  LineTempMorn: _fnLine({
    stroke: _theme.COLOR.TEMP_DAY.color, fill: "#808080", dash: "5 5"
  }),
  LineTempDay: _fnLine({ stroke: _theme.COLOR.TEMP_DAY.color }),
  LineTempEve: _fnLine({
    stroke: _theme.COLOR.TEMP_NIGHT.color, fill: "#808080", dash: "5 5"
  }),
  LineTempNight: _fnLine({ stroke: _theme.COLOR.TEMP_NIGHT.color })
};

exports.default = STYLE;
//# sourceMappingURL=Chart.Style.js.map