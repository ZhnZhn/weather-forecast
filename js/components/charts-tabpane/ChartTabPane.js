"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _handlers = require("../../flux/handlers");
var _TabPane = _interopRequireDefault(require("../zhn-tab/TabPane"));
var _Tab = _interopRequireDefault(require("../zhn-tab/Tab"));
var _ChartForecast = _interopRequireDefault(require("./ChartForecast"));
var _ChartHourly = _interopRequireDefault(require("./ChartHourly"));
var _ChartUvi = _interopRequireDefault(require("./ChartUvi"));
var _ChartAirForecast = _interopRequireDefault(require("./ChartAirForecast"));
var _jsxRuntime = require("react/jsx-runtime");
const TOKEN_WEATHER_FORECASTS = "Weather forecasts";
const S_TABS = {
  textAlign: 'left'
};
const ChartTabPane = () => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TabPane.default, {
  ariaLabel: TOKEN_WEATHER_FORECASTS,
  id: "ctb",
  width: "100%",
  tabsStyle: S_TABS,
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Tab.default, {
    title: "7 Days",
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ChartForecast.default, {})
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tab.default, {
    title: "5 Days/3 Hours",
    onClick: _handlers.requestHourly,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ChartHourly.default, {})
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tab.default, {
    title: "UV index",
    onClick: _handlers.requestUvi,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ChartUvi.default, {})
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tab.default, {
    title: "Air Forecast",
    onClick: _handlers.requestAirForecast,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ChartAirForecast.default, {})
  })]
});
var _default = exports.default = ChartTabPane;
//# sourceMappingURL=ChartTabPane.js.map