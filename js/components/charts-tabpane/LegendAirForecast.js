"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _LegendRowCircle = _interopRequireDefault(require("./LegendRowCircle"));

var _Label = _interopRequireDefault(require("./Label.Style"));

var _jsxRuntime = require("react/jsx-runtime");

var S_MT_1REM = {
  marginTop: '1rem'
},
    CONFIGS_ROW_1 = [{
  id: 'aqi',
  tStyle: _Label["default"].SPEED,
  cStyle: _Label["default"].CIRCLE_SPEED
}, {
  id: 'no2'
}, {
  id: 'o3'
}, {
  id: 'pm10'
}, {
  id: 'pm2_5',
  title: 'PM2.5'
}],
    CONFIGS_ROW_2 = [{
  id: 'co',
  tStyle: _Label["default"].PRESSURE,
  cStyle: _Label["default"].CIRCLE_PRESSURE
}, {
  id: 'no'
}, {
  id: 'nh3'
}, {
  id: 'so2'
}];

var LegendAirForecast = function LegendAirForecast(_ref) {
  var filtered = _ref.filtered,
      onFilter = _ref.onFilter;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendRowCircle["default"], {
      style: S_MT_1REM,
      configs: CONFIGS_ROW_1,
      filtered: filtered,
      onFilter: onFilter
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendRowCircle["default"], {
      style: S_MT_1REM,
      configs: CONFIGS_ROW_2,
      filtered: filtered,
      onFilter: onFilter
    })]
  });
};

var _default = LegendAirForecast;
exports["default"] = _default;
//# sourceMappingURL=LegendAirForecast.js.map