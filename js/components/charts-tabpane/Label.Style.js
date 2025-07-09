"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.S_TOOLTIP_ROW = exports.S_TOOLTIP = exports.S_TEMP_NIGHT = exports.S_TEMP_MIN = exports.S_TEMP_MAX = exports.S_TEMP_DAY = exports.S_SPEED = exports.S_SNOW = exports.S_SERIA = exports.S_RECT_SNOW = exports.S_RECT_RAIN = exports.S_RAIN = exports.S_PRESSURE = exports.S_POINTER = exports.S_LABEL = exports.S_HUMIDITY = exports.S_FILTERED = exports.S_DAY = exports.S_CIRCLE_TEMP_NIGHT = exports.S_CIRCLE_TEMP_MORN = exports.S_CIRCLE_TEMP_MIN = exports.S_CIRCLE_TEMP_MAX = exports.S_CIRCLE_TEMP_EVE = exports.S_CIRCLE_TEMP_DAY = exports.S_CIRCLE_SPEED = exports.S_CIRCLE_SERIA = exports.S_CIRCLE_PRESSURE = exports.S_CIRCLE_HUMIDITY = exports.S_CAPTION = void 0;
var _uiTheme = require("../styles/uiTheme");
var _SeriesColor = _interopRequireDefault(require("./SeriesColor"));
const _crCircleStyle = function (stroke, fill) {
  if (stroke === void 0) {
    stroke = 'green';
  }
  return {
    stroke,
    fill: fill || stroke
  };
};
const _crSpanStyle = function (color) {
  if (color === void 0) {
    color = 'green';
  }
  return {
    color,
    fontWeight: 'bold'
  };
};
const CAPTION_STYLE = {
  display: 'inline-block',
  color: _uiTheme.LABEL_COLOR,
  fontWeight: 'bold'
};
const S_TOOLTIP = exports.S_TOOLTIP = {
  ..._uiTheme.CHART_POPUP,
  padding: 8
};
const S_TOOLTIP_ROW = exports.S_TOOLTIP_ROW = {
  paddingTop: 8
};
const S_LABEL = exports.S_LABEL = {
  ...CAPTION_STYLE,
  width: 50
};
const S_CAPTION = exports.S_CAPTION = {
  ...CAPTION_STYLE,
  paddingRight: 4
};
const S_DAY = exports.S_DAY = _crSpanStyle(_uiTheme.DAY_COLOR);
const S_CIRCLE_SPEED = exports.S_CIRCLE_SPEED = _crCircleStyle(_SeriesColor.default.SPEED, "none");
const S_SPEED = exports.S_SPEED = _crSpanStyle(_SeriesColor.default.SPEED);
const S_CIRCLE_HUMIDITY = exports.S_CIRCLE_HUMIDITY = _crCircleStyle(_SeriesColor.default.SPEED);
const S_HUMIDITY = exports.S_HUMIDITY = _crSpanStyle(_SeriesColor.default.SPEED);

//CIRCLE_RAIN : _crCircleStyle(SC.RAIN),
const S_RECT_RAIN = exports.S_RECT_RAIN = {
  stroke: _SeriesColor.default.RAIN
};
const S_RAIN = exports.S_RAIN = _crSpanStyle(_SeriesColor.default.RAIN);
const S_RECT_SNOW = exports.S_RECT_SNOW = {
  stroke: _SeriesColor.default.SNOW
};
const S_SNOW = exports.S_SNOW = _crSpanStyle(_SeriesColor.default.SNOW);
const S_CIRCLE_TEMP_MAX = exports.S_CIRCLE_TEMP_MAX = _crCircleStyle(_SeriesColor.default.TEMP_MAX, 'none');
const S_TEMP_MAX = exports.S_TEMP_MAX = _crSpanStyle(_SeriesColor.default.TEMP_MAX);
const S_CIRCLE_TEMP_MIN = exports.S_CIRCLE_TEMP_MIN = _crCircleStyle(_SeriesColor.default.TEMP_MIN, 'none');
const S_TEMP_MIN = exports.S_TEMP_MIN = _crSpanStyle(_SeriesColor.default.TEMP_MIN);
const S_CIRCLE_TEMP_MORN = exports.S_CIRCLE_TEMP_MORN = _crCircleStyle(_uiTheme.TEMP_DAY_COLOR, 'none');
const S_CIRCLE_TEMP_DAY = exports.S_CIRCLE_TEMP_DAY = _crCircleStyle(_uiTheme.TEMP_DAY_COLOR);
const S_TEMP_DAY = exports.S_TEMP_DAY = _crSpanStyle(_uiTheme.TEMP_DAY_COLOR);
const S_CIRCLE_TEMP_EVE = exports.S_CIRCLE_TEMP_EVE = _crCircleStyle(_uiTheme.TEMP_NIGHT_COLOR, 'none');
const S_CIRCLE_TEMP_NIGHT = exports.S_CIRCLE_TEMP_NIGHT = _crCircleStyle(_uiTheme.TEMP_NIGHT_COLOR);
const S_TEMP_NIGHT = exports.S_TEMP_NIGHT = _crSpanStyle(_uiTheme.TEMP_NIGHT_COLOR);
const S_CIRCLE_PRESSURE = exports.S_CIRCLE_PRESSURE = _crCircleStyle(_SeriesColor.default.PRESSURE);
const S_PRESSURE = exports.S_PRESSURE = _crSpanStyle(_SeriesColor.default.PRESSURE);
const S_SERIA = exports.S_SERIA = _crSpanStyle(_SeriesColor.default.SERIA);
const S_CIRCLE_SERIA = exports.S_CIRCLE_SERIA = _crCircleStyle(_SeriesColor.default.SERIA);
const S_POINTER = exports.S_POINTER = {
  lineHeight: 2,
  cursor: 'pointer'
};
const S_FILTERED = exports.S_FILTERED = {
  color: _SeriesColor.default.FILTERED
};
//# sourceMappingURL=Label.Style.js.map