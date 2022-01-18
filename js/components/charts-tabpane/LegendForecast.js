"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _uiApi = require("../uiApi");

var _SvgCircle = _interopRequireDefault(require("./SvgCircle"));

var _SvgRect = _interopRequireDefault(require("./SvgRect"));

var _LegendCell = _interopRequireDefault(require("./LegendCell"));

var _crForecastLegendStyle = _interopRequireDefault(require("./crForecastLegendStyle"));

var _Label = _interopRequireDefault(require("./Label.Style"));

var _jsxRuntime = require("react/jsx-runtime");

var K = {
  T_DAY: 'tempDay',
  T_NIGHT: 'tempNight',
  T_MORN: 'tempMorn',
  T_EVE: 'tempEve',
  T_MAX: 'tempMax',
  T_MIN: 'tempMin',
  RAIN: 'rain',
  SPEED: 'speed',
  PRESSURE: 'pressure',
  HUMIDITY: 'humidity'
};
var S_ROOT_DIV = {
  margin: '1rem 0 0 3rem'
},
    S_COL_1 = {
  display: 'inline-block',
  marginRight: '1rem'
},
    S_COL_2 = {
  display: 'inline-block'
},
    S_COL_3 = {
  display: 'inline-block',
  marginLeft: '1rem'
};

var areEqual = function areEqual(prevProps, nextProps) {
  return prevProps.filtered === nextProps.filtered;
};

var LegendForecast = function LegendForecast(_ref) {
  var filtered = _ref.filtered,
      onFilter = _ref.onFilter;
  var styles = (0, _crForecastLegendStyle["default"])(filtered);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: S_ROOT_DIV,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: S_COL_1,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendCell["default"], {
        titleStyle: styles.tempMorn,
        title: "T Morn",
        onClick: function onClick() {
          return onFilter(K.T_MORN);
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgCircle["default"], (0, _extends2["default"])({}, _Label["default"].CIRCLE_TEMP_MORN))
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendCell["default"], {
        titleStyle: styles.tempDay,
        title: "T Day",
        onClick: function onClick() {
          return onFilter(K.T_DAY);
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgCircle["default"], (0, _extends2["default"])({}, _Label["default"].CIRCLE_TEMP_DAY))
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: S_COL_2,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendCell["default"], {
        titleStyle: styles.tempEve,
        title: "T Eve",
        onClick: function onClick() {
          return onFilter(K.T_EVE);
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgCircle["default"], (0, _extends2["default"])({}, _Label["default"].CIRCLE_TEMP_EVE))
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendCell["default"], {
        titleStyle: styles.tempNight,
        title: "T Night",
        onClick: function onClick() {
          return onFilter(K.T_NIGHT);
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgCircle["default"], (0, _extends2["default"])({}, _Label["default"].CIRCLE_TEMP_NIGHT))
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: S_COL_3,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendCell["default"], {
        titleStyle: styles.tempMax,
        title: "T Max",
        onClick: function onClick() {
          return onFilter(K.T_MAX);
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgCircle["default"], (0, _extends2["default"])({}, _Label["default"].CIRCLE_TEMP_MAX))
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendCell["default"], {
        titleStyle: styles.tempMin,
        title: "T Min",
        onClick: function onClick() {
          return onFilter(K.T_MIN);
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgCircle["default"], (0, _extends2["default"])({}, _Label["default"].CIRCLE_TEMP_MIN))
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: S_COL_3,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendCell["default"], {
        titleStyle: styles.rain,
        title: "Rain",
        onClick: function onClick() {
          return onFilter(K.RAIN);
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgRect["default"], (0, _extends2["default"])({}, _Label["default"].RECT_RAIN))
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendCell["default"], {
        titleStyle: styles.speed,
        title: "Wind",
        onClick: function onClick() {
          return onFilter(K.SPEED);
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgCircle["default"], (0, _extends2["default"])({}, _Label["default"].CIRCLE_SPEED))
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: S_COL_3,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendCell["default"], {
        titleStyle: styles.pressure,
        title: "Pressure",
        onClick: function onClick() {
          return onFilter(K.PRESSURE);
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgCircle["default"], (0, _extends2["default"])({}, _Label["default"].CIRCLE_PRESSURE))
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendCell["default"], {
        titleStyle: styles.humidity,
        title: "Humidity",
        onClick: function onClick() {
          return onFilter(K.HUMIDITY);
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgCircle["default"], (0, _extends2["default"])({}, _Label["default"].CIRCLE_HUMIDITY))
      })]
    })]
  });
};

var _default = (0, _uiApi.memo)(LegendForecast, areEqual);

exports["default"] = _default;
//# sourceMappingURL=LegendForecast.js.map