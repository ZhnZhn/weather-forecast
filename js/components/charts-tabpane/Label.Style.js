"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _theme = require("../styles/theme");

var _SeriesColor = _interopRequireDefault(require("./SeriesColor"));

var _crCircleStyle = function _crCircleStyle(stroke, fill) {
  if (stroke === void 0) {
    stroke = 'green';
  }

  return {
    stroke: stroke,
    fill: fill || stroke
  };
};

var _crSpanStyle = function _crSpanStyle(color) {
  if (color === void 0) {
    color = 'green';
  }

  return {
    color: color,
    fontWeight: 'bold'
  };
};

var CAPTION_STYLE = {
  display: 'inline-block',
  color: _theme.COLOR.LABEL.color,
  fontWeight: 'bold'
};
var STYLE = {
  ROOT_DIV: (0, _extends2["default"])({}, _theme.POPUP.CHART, {
    padding: 8
  }),
  LABEL: (0, _extends2["default"])({}, CAPTION_STYLE, {
    width: 50
  }),
  CAPTION: (0, _extends2["default"])({}, CAPTION_STYLE, {
    paddingRight: 4
  }),
  ROW: {
    paddingTop: 8
  },
  DAY: _crSpanStyle(_theme.COLOR.DAY.color),
  CIRCLE_SPEED: _crCircleStyle(_SeriesColor["default"].SPEED, "none"),
  SPEED: _crSpanStyle(_SeriesColor["default"].SPEED),
  CIRCLE_HUMIDITY: _crCircleStyle(_SeriesColor["default"].SPEED),
  HUMIDITY: _crSpanStyle(_SeriesColor["default"].SPEED),
  //CIRCLE_RAIN : _crCircleStyle(SC.RAIN),
  RECT_RAIN: {
    stroke: _SeriesColor["default"].RAIN
  },
  RAIN: _crSpanStyle(_SeriesColor["default"].RAIN),
  RECT_SNOW: {
    stroke: _SeriesColor["default"].SNOW
  },
  SNOW: _crSpanStyle(_SeriesColor["default"].SNOW),
  CIRCLE_TEMP_MAX: _crCircleStyle(_SeriesColor["default"].TEMP_MAX, 'none'),
  TEMP_MAX: _crSpanStyle(_SeriesColor["default"].TEMP_MAX),
  CIRCLE_TEMP_MIN: _crCircleStyle(_SeriesColor["default"].TEMP_MIN, 'none'),
  TEMP_MIN: _crSpanStyle(_SeriesColor["default"].TEMP_MIN),
  CIRCLE_TEMP_MORN: _crCircleStyle(_theme.COLOR.TEMP_DAY.color, 'none'),
  CIRCLE_TEMP_DAY: _crCircleStyle(_theme.COLOR.TEMP_DAY.color),
  TEMP_DAY: _crSpanStyle(_theme.COLOR.TEMP_DAY.color),
  CIRCLE_TEMP_EVE: _crCircleStyle(_theme.COLOR.TEMP_NIGHT.color, 'none'),
  CIRCLE_TEMP_NIGHT: _crCircleStyle(_theme.COLOR.TEMP_NIGHT.color),
  TEMP_NIGHT: _crSpanStyle(_theme.COLOR.TEMP_NIGHT.color),
  CIRCLE_PRESSURE: _crCircleStyle(_SeriesColor["default"].PRESSURE),
  PRESSURE: _crSpanStyle(_SeriesColor["default"].PRESSURE),
  SERIA: _crSpanStyle(_SeriesColor["default"].SERIA),
  CIRCLE_SERIA: _crCircleStyle(_SeriesColor["default"].SERIA),
  POINTER: {
    lineHeight: 2,
    cursor: 'pointer'
  },
  FILTERED: {
    color: _SeriesColor["default"].FILTERED
  }
};
var _default = STYLE;
exports["default"] = _default;
//# sourceMappingURL=Label.Style.js.map