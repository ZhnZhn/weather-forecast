"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _handlers = _interopRequireDefault(require("../../flux/handlers"));

var _TabPane = _interopRequireDefault(require("../zhn-atoms/TabPane"));

var _Tab = _interopRequireDefault(require("../zhn-atoms/Tab"));

var _ForecastChart = _interopRequireDefault(require("./ForecastChart"));

var _HourlyChart = _interopRequireDefault(require("./HourlyChart"));

var _UviChart = _interopRequireDefault(require("./UviChart"));

var _AirForecastChart = _interopRequireDefault(require("./AirForecastChart"));

var _jsxRuntime = require("react/jsx-runtime");

var requestHourly = _handlers["default"].requestHourly,
    requestUvi = _handlers["default"].requestUvi,
    requestAirForecast = _handlers["default"].requestAirForecast;
var S_TABS = {
  textAlign: 'left'
};

var ChartTabPane = function ChartTabPane(_ref) {
  var isAir = _ref.isAir;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TabPane["default"], {
    width: "100%",
    tabsStyle: S_TABS,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Tab["default"], {
      title: "7 Days",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ForecastChart["default"], {})
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tab["default"], {
      title: "5 Days/3 Hours",
      onClick: requestHourly,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_HourlyChart["default"], {})
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tab["default"], {
      title: "UV index",
      onClick: requestUvi,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_UviChart["default"], {})
    }), isAir && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tab["default"], {
      title: "Air Forecast",
      onClick: requestAirForecast,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_AirForecastChart["default"], {})
    })]
  }, "1");
};

var _default = ChartTabPane;
exports["default"] = _default;
//# sourceMappingURL=ChartTabPane.js.map