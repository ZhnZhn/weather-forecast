"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _LegendRowSvg = _interopRequireDefault(require("./LegendRowSvg"));
var _Label = require("./Label.Style");
var _jsxRuntime = require("react/jsx-runtime");
const S_ROW = {
    margin: '1rem 0 0 2rem'
  },
  CONFIGS_ROW_1 = [{
    id: 'tempDay',
    title: 'T Day',
    titleStyle: _Label.S_TEMP_DAY,
    svgStyle: _Label.S_CIRCLE_TEMP_DAY
  }, {
    id: 'tempMorn',
    title: 'T Morn',
    titleStyle: _Label.S_TEMP_DAY,
    svgStyle: _Label.S_CIRCLE_TEMP_MORN
  }, {
    id: 'tempMax',
    title: 'T Max',
    titleStyle: _Label.S_TEMP_MAX,
    svgStyle: _Label.S_CIRCLE_TEMP_MAX
  }, {
    id: 'pressure',
    titleStyle: _Label.S_PRESSURE,
    svgStyle: _Label.S_CIRCLE_PRESSURE
  }, {
    id: 'rain',
    titleStyle: _Label.S_RAIN,
    svgType: 'rect',
    svgStyle: _Label.S_RECT_RAIN
  }, {
    id: 'snow',
    titleStyle: _Label.S_SNOW,
    svgType: 'rect',
    svgStyle: _Label.S_RECT_SNOW
  }],
  CONFIGS_ROW_2 = [{
    id: 'tempEve',
    title: 'T Eve',
    titleStyle: _Label.S_TEMP_NIGHT,
    svgStyle: _Label.S_CIRCLE_TEMP_EVE
  }, {
    id: 'tempNight',
    title: 'T Night',
    titleStyle: _Label.S_TEMP_NIGHT,
    svgStyle: _Label.S_CIRCLE_TEMP_NIGHT
  }, {
    id: 'tempMin',
    title: 'T Min',
    titleStyle: _Label.S_TEMP_MIN,
    svgStyle: _Label.S_CIRCLE_TEMP_MIN
  }, {
    id: 'humidity',
    titleStyle: _Label.S_HUMIDITY,
    svgStyle: _Label.S_CIRCLE_HUMIDITY
  }, {
    id: 'speed',
    title: 'Wind',
    titleStyle: _Label.S_SPEED,
    svgStyle: _Label.S_CIRCLE_SPEED
  }];
const LegendForecast = _ref => {
  let {
    isNot,
    filtered,
    onFilter
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendRowSvg.default, {
      style: S_ROW,
      notIs: isNot,
      configs: CONFIGS_ROW_1,
      filtered: filtered,
      onFilter: onFilter
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendRowSvg.default, {
      style: S_ROW,
      notIs: isNot,
      configs: CONFIGS_ROW_2,
      filtered: filtered,
      onFilter: onFilter
    })]
  });
};
var _default = exports.default = (0, _uiApi.memo)(LegendForecast);
//# sourceMappingURL=LegendForecast.js.map