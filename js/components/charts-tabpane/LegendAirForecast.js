"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _LegendRowSvg = _interopRequireDefault(require("./LegendRowSvg"));
var _Label = require("./Label.Style");
var _jsxRuntime = require("react/jsx-runtime");
const S_MT_1REM = {
    marginTop: '1rem'
  },
  CONFIGS_ROW_1 = [{
    id: 'aqi',
    titleStyle: _Label.S_SPEED,
    svgStyle: _Label.S_CIRCLE_SPEED
  }, {
    id: 'no2'
  }, {
    id: 'o3'
  }, {
    id: 'pm10',
    title: 'PM10'
  }, {
    id: 'pm2_5',
    title: 'PM2.5'
  }],
  CONFIGS_ROW_2 = [{
    id: 'co',
    titleStyle: _Label.S_PRESSURE,
    svgStyle: _Label.S_CIRCLE_PRESSURE
  }, {
    id: 'no'
  }, {
    id: 'nh3'
  }, {
    id: 'so2'
  }];
const LegendAirForecast = _ref => {
  let {
    filtered,
    onFilter
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendRowSvg.default, {
      style: S_MT_1REM,
      configs: CONFIGS_ROW_1,
      filtered: filtered,
      onFilter: onFilter
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendRowSvg.default, {
      style: S_MT_1REM,
      configs: CONFIGS_ROW_2,
      filtered: filtered,
      onFilter: onFilter
    })]
  });
};
var _default = exports.default = LegendAirForecast;
//# sourceMappingURL=LegendAirForecast.js.map