"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _LegendCellCircle = _interopRequireDefault(require("./LegendCellCircle"));

var _Label = _interopRequireDefault(require("./Label.Style"));

var _jsxRuntime = require("react/jsx-runtime");

var S_MT_1REM = {
  marginTop: '1rem'
};

var _crLabelStyle = function _crLabelStyle(is, style) {
  if (style === void 0) {
    style = _Label["default"].SERIA;
  }

  return is ? (0, _extends2["default"])({}, style, _Label["default"].FILTERED) : style;
};

var LegendAirForecast = function LegendAirForecast(_ref) {
  var filtered = _ref.filtered,
      onFilter = _ref.onFilter;

  var _aqiStyle = _crLabelStyle(filtered.aqi, _Label["default"].SPEED),
      _coStyle = _crLabelStyle(filtered.co, _Label["default"].PRESSURE),
      _no2Style = _crLabelStyle(filtered.no2),
      _o3Style = _crLabelStyle(filtered.o3),
      _pm2_5Style = _crLabelStyle(filtered.pm2_5),
      _pm10Style = _crLabelStyle(filtered.pm10),
      _noStyle = _crLabelStyle(filtered.no),
      _nh3Style = _crLabelStyle(filtered.nh3),
      _so2Style = _crLabelStyle(filtered.so2);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: S_MT_1REM,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendCellCircle["default"], {
        title: "AQI",
        titleStyle: _aqiStyle,
        circleStyle: _Label["default"].CIRCLE_SPEED,
        onClick: function onClick() {
          return onFilter('aqi');
        }
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendCellCircle["default"], {
        title: "NO2",
        titleStyle: _no2Style,
        onClick: function onClick() {
          return onFilter('no2');
        }
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendCellCircle["default"], {
        title: "O3",
        titleStyle: _o3Style,
        onClick: function onClick() {
          return onFilter('o3');
        }
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendCellCircle["default"], {
        title: "PM10",
        titleStyle: _pm10Style,
        onClick: function onClick() {
          return onFilter('pm10');
        }
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendCellCircle["default"], {
        title: "PM2.5",
        titleStyle: _pm2_5Style,
        onClick: function onClick() {
          return onFilter('pm2_5');
        }
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: S_MT_1REM,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendCellCircle["default"], {
        title: "CO",
        titleStyle: _coStyle,
        circleStyle: _Label["default"].CIRCLE_PRESSURE,
        onClick: function onClick() {
          return onFilter('co');
        }
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendCellCircle["default"], {
        title: "NO",
        titleStyle: _noStyle,
        onClick: function onClick() {
          return onFilter('no');
        }
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendCellCircle["default"], {
        title: "NH3",
        titleStyle: _nh3Style,
        onClick: function onClick() {
          return onFilter('nh3');
        }
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendCellCircle["default"], {
        title: "SO2",
        titleStyle: _so2Style,
        onClick: function onClick() {
          return onFilter('so2');
        }
      })]
    })]
  });
};

var _default = LegendAirForecast;
exports["default"] = _default;
//# sourceMappingURL=LegendAirForecast.js.map