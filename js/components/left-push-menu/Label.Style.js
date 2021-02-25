"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _theme = require("../styles/theme");

var _assign = Object.assign;
/*
const _assign = (...args) => {
  args.unshift({});
  return Object.assign.apply(Object, args);
}
*/

var _crLabelStyle = function _crLabelStyle(is, style) {
  return is ? _assign({}, style, S.POINTER) : _assign({}, style, S.POINTER, S.FILTERED);
};

var _filters;

var _styles = {};

var _crLegendStyles = function _crLegendStyles(filters) {
  if (_filters !== filters) {
    _styles.tempMorn = _crLabelStyle(filters.tempMorn, S.TEMP_DAY);
    _styles.tempDay = _crLabelStyle(filters.tempDay, S.TEMP_DAY);
    _styles.tempEve = _crLabelStyle(filters.tempEve, S.TEMP_NIGHT);
    _styles.tempNight = _crLabelStyle(filters.tempNight, S.TEMP_NIGHT);
    _styles.tempMax = _crLabelStyle(filters.tempMax, S.TEMP_MAX);
    _styles.tempMin = _crLabelStyle(filters.tempMin, S.TEMP_MIN);
    _styles.rain = _crLabelStyle(filters.rain, S.RAIN);
    _styles.speed = _crLabelStyle(filters.speed, S.SPEED);
    return _assign({}, _styles);
  }

  return _styles;
};

var _fnCircle = function _fnCircle(stroke, fill) {
  if (stroke === void 0) {
    stroke = 'green';
  }

  fill = fill ? fill : stroke;
  return {
    stroke: stroke,
    fill: fill
  };
};

var _fnSpan = function _fnSpan(color) {
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
var S = {
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
  DAY: _fnSpan(_theme.COLOR.DAY.color),
  CIRCLE_SPEED: _fnCircle("#3F51B5", "none"),
  SPEED: _fnSpan('#3f51b5'),
  CIRCLE_RAIN: _fnCircle("#0922A5"),
  RECT_RAIN: {
    stroke: '#0922a5'
  },
  RAIN: _fnSpan('#0922a5'),
  CIRCLE_TEMP_MAX: _fnCircle('#F44336', 'none'),
  TEMP_MAX: _fnSpan('#F44336'),
  CIRCLE_TEMP_MIN: _fnCircle('#03A9F4', 'none'),
  TEMP_MIN: _fnSpan('#03a9f4'),
  CIRCLE_TEMP_MORN: _fnCircle(_theme.COLOR.TEMP_DAY.color, 'none'),
  CIRCLE_TEMP_DAY: _fnCircle(_theme.COLOR.TEMP_DAY.color),
  TEMP_DAY: _fnSpan(_theme.COLOR.TEMP_DAY.color),
  CIRCLE_TEMP_EVE: _fnCircle(_theme.COLOR.TEMP_NIGHT.color, 'none'),
  CIRCLE_TEMP_NIGHT: _fnCircle(_theme.COLOR.TEMP_NIGHT.color),
  TEMP_NIGHT: _fnSpan(_theme.COLOR.TEMP_NIGHT.color),
  CIRCLE_PRESSURE: _fnCircle("#0D2339"),
  POINTER: {
    cursor: 'pointer',
    lineHeight: 2
  },
  FILTERED: {
    color: '#9e9e9e'
  },
  crLegendStyles: _crLegendStyles
};
var _default = S;
exports["default"] = _default;
//# sourceMappingURL=Label.Style.js.map