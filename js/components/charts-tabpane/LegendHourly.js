"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _LegendCell = _interopRequireDefault(require("./LegendCell"));

var _SvgCircle = _interopRequireDefault(require("./SvgCircle"));

var _SvgRect = _interopRequireDefault(require("./SvgRect"));

var _Label = _interopRequireDefault(require("./Label.Style"));

var _jsxRuntime = require("react/jsx-runtime");

var LS_ROOT = {
  marginTop: '1rem'
},
    LS_ITEM = {
  display: 'inline-block',
  marginRight: '1rem',
  padding: '0 4px 4px 4px'
};

var _crLabelStyle = function _crLabelStyle(is, style) {
  return is ? style : (0, _extends2["default"])({}, style, _Label["default"].FILTERED);
};

var LegendHourly = function LegendHourly(_ref) {
  var isRain = _ref.isRain,
      isSnow = _ref.isSnow,
      filtered = _ref.filtered,
      onFilter = _ref.onFilter;

  var _tempStyle = _crLabelStyle(!filtered.temp, _Label["default"].SERIA),
      _pressureStyle = _crLabelStyle(!filtered.pressure, _Label["default"].PRESSURE),
      _rainStyle = _crLabelStyle(!filtered.rain, _Label["default"].RAIN),
      _snowStyle = _crLabelStyle(!filtered.snow, _Label["default"].SNOW),
      _speedStyle = _crLabelStyle(!filtered.speed, _Label["default"].SPEED);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: LS_ROOT,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendCell["default"], {
      style: LS_ITEM,
      titleStyle: _tempStyle,
      title: "T",
      onClick: function onClick() {
        return onFilter('temp');
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgCircle["default"], (0, _extends2["default"])({}, _Label["default"].CIRCLE_SERIA))
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendCell["default"], {
      style: LS_ITEM,
      titleStyle: _pressureStyle,
      title: "Pressure",
      onClick: function onClick() {
        return onFilter('pressure');
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgCircle["default"], (0, _extends2["default"])({}, _Label["default"].CIRCLE_PRESSURE))
    }), isRain && /*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendCell["default"], {
      style: LS_ITEM,
      titleStyle: _rainStyle,
      title: "Rain",
      onClick: function onClick() {
        return onFilter('rain');
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgRect["default"], (0, _extends2["default"])({}, _Label["default"].RECT_RAIN))
    }), isSnow && /*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendCell["default"], {
      style: LS_ITEM,
      titleStyle: _snowStyle,
      title: "Snow",
      onClick: function onClick() {
        return onFilter('snow');
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgRect["default"], (0, _extends2["default"])({}, _Label["default"].RECT_SNOW))
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendCell["default"], {
      style: LS_ITEM,
      titleStyle: _speedStyle,
      title: "Wind",
      onClick: function onClick() {
        return onFilter('speed');
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgCircle["default"], (0, _extends2["default"])({}, _Label["default"].CIRCLE_SPEED))
    })]
  });
};

var _default = LegendHourly;
exports["default"] = _default;
//# sourceMappingURL=LegendHourly.js.map