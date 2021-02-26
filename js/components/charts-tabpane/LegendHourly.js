"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("../_react"));

var _LegendCell = _interopRequireDefault(require("./LegendCell"));

var _SvgCircle = _interopRequireDefault(require("./SvgCircle"));

var _SvgRect = _interopRequireDefault(require("./SvgRect"));

var _Label = _interopRequireDefault(require("./Label.Style"));

var L_S = {
  ROOT: {
    marginTop: '1rem'
  },
  ITEM: {
    display: 'inline-block',
    marginRight: '1rem',
    paddingLeft: 4,
    paddingRight: 4,
    paddingBottom: 4
  }
};

var _crLabelStyle = function _crLabelStyle(is, style) {
  return is ? style : (0, _extends2["default"])({}, style, _Label["default"].FILTERED);
};

var LegendHourly = function LegendHourly(_ref) {
  var filtered = _ref.filtered,
      onFilter = _ref.onFilter;

  var _tempStyle = _crLabelStyle(!filtered.temp, _Label["default"].SERIA),
      _pressureStyle = _crLabelStyle(!filtered.pressure, _Label["default"].PRESSURE),
      _rainStyle = _crLabelStyle(!filtered.rain, _Label["default"].RAIN),
      _speedStyle = _crLabelStyle(!filtered.speed, _Label["default"].SPEED);

  return /*#__PURE__*/_react["default"].createElement("div", {
    style: L_S.ROOT
  }, /*#__PURE__*/_react["default"].createElement(_LegendCell["default"], {
    style: L_S.ITEM,
    titleStyle: _tempStyle,
    title: "T",
    onClick: function onClick() {
      return onFilter('temp');
    }
  }, /*#__PURE__*/_react["default"].createElement(_SvgCircle["default"], _Label["default"].CIRCLE_SERIA)), /*#__PURE__*/_react["default"].createElement(_LegendCell["default"], {
    style: L_S.ITEM,
    titleStyle: _pressureStyle,
    title: "Pressure",
    onClick: function onClick() {
      return onFilter('pressure');
    }
  }, /*#__PURE__*/_react["default"].createElement(_SvgCircle["default"], _Label["default"].CIRCLE_PRESSURE)), /*#__PURE__*/_react["default"].createElement(_LegendCell["default"], {
    style: L_S.ITEM,
    titleStyle: _rainStyle,
    title: "Rain",
    onClick: function onClick() {
      return onFilter('rain');
    }
  }, /*#__PURE__*/_react["default"].createElement(_SvgRect["default"], _Label["default"].RECT_RAIN)), /*#__PURE__*/_react["default"].createElement(_LegendCell["default"], {
    style: L_S.ITEM,
    titleStyle: _speedStyle,
    title: "Speed",
    onClick: function onClick() {
      return onFilter('speed');
    }
  }, /*#__PURE__*/_react["default"].createElement(_SvgCircle["default"], _Label["default"].CIRCLE_SPEED)));
};

var _default = LegendHourly;
exports["default"] = _default;
//# sourceMappingURL=LegendHourly.js.map