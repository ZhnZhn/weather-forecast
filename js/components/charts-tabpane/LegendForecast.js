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

var S_ROOT_DIV = {
  margin: '1rem 0 0 3rem'
},
    S_INLINE = {
  display: 'inline-block'
},
    S_COL_MR1 = (0, _extends2["default"])({}, S_INLINE, {
  marginRight: '1rem'
}),
    S_COL_ML1 = (0, _extends2["default"])({}, S_INLINE, {
  marginLeft: '1rem'
});

var areEqual = function areEqual(prevProps, nextProps) {
  return prevProps.filtered === nextProps.filtered && prevProps.isSnow === nextProps.isSnow;
};

var LegendForecast = function LegendForecast(_ref) {
  var isSnow = _ref.isSnow,
      filtered = _ref.filtered,
      onFilter = _ref.onFilter;
  var styles = (0, _crForecastLegendStyle["default"])(filtered);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: S_ROOT_DIV,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: S_COL_MR1,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendCell["default"], {
        titleStyle: styles.tempMorn,
        title: "T Morn",
        onClick: function onClick() {
          return onFilter('tempMorn');
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgCircle["default"], (0, _extends2["default"])({}, _Label["default"].CIRCLE_TEMP_MORN))
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendCell["default"], {
        titleStyle: styles.tempDay,
        title: "T Day",
        onClick: function onClick() {
          return onFilter('tempDay');
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgCircle["default"], (0, _extends2["default"])({}, _Label["default"].CIRCLE_TEMP_DAY))
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: S_INLINE,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendCell["default"], {
        titleStyle: styles.tempEve,
        title: "T Eve",
        onClick: function onClick() {
          return onFilter('tempEve');
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgCircle["default"], (0, _extends2["default"])({}, _Label["default"].CIRCLE_TEMP_EVE))
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendCell["default"], {
        titleStyle: styles.tempNight,
        title: "T Night",
        onClick: function onClick() {
          return onFilter('tempNight');
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgCircle["default"], (0, _extends2["default"])({}, _Label["default"].CIRCLE_TEMP_NIGHT))
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: S_COL_ML1,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendCell["default"], {
        titleStyle: styles.tempMax,
        title: "T Max",
        onClick: function onClick() {
          return onFilter('tempMax');
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgCircle["default"], (0, _extends2["default"])({}, _Label["default"].CIRCLE_TEMP_MAX))
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendCell["default"], {
        titleStyle: styles.tempMin,
        title: "T Min",
        onClick: function onClick() {
          return onFilter('tempMin');
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgCircle["default"], (0, _extends2["default"])({}, _Label["default"].CIRCLE_TEMP_MIN))
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: S_COL_ML1,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendCell["default"], {
        titleStyle: styles.rain,
        title: "Rain",
        onClick: function onClick() {
          return onFilter('rain');
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgRect["default"], (0, _extends2["default"])({}, _Label["default"].RECT_RAIN))
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendCell["default"], {
        titleStyle: styles.speed,
        title: "Wind",
        onClick: function onClick() {
          return onFilter('speed');
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgCircle["default"], (0, _extends2["default"])({}, _Label["default"].CIRCLE_SPEED))
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: S_COL_ML1,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendCell["default"], {
        titleStyle: styles.pressure,
        title: "Pressure",
        onClick: function onClick() {
          return onFilter('pressure');
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgCircle["default"], (0, _extends2["default"])({}, _Label["default"].CIRCLE_PRESSURE))
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendCell["default"], {
        titleStyle: styles.humidity,
        title: "Humidity",
        onClick: function onClick() {
          return onFilter('humidity');
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgCircle["default"], (0, _extends2["default"])({}, _Label["default"].CIRCLE_HUMIDITY))
      })]
    }), isSnow && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: S_COL_ML1,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendCell["default"], {
        titleStyle: styles.snow,
        title: "Snow",
        onClick: function onClick() {
          return onFilter('snow');
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgRect["default"], (0, _extends2["default"])({}, _Label["default"].RECT_SNOW))
      })
    })]
  });
};

var _default = (0, _uiApi.memo)(LegendForecast, areEqual);

exports["default"] = _default;
//# sourceMappingURL=LegendForecast.js.map