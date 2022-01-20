"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _uiApi = require("../uiApi");

var _LegendRowSvg = _interopRequireDefault(require("./LegendRowSvg"));

var _Label = _interopRequireDefault(require("./Label.Style"));

var _jsxRuntime = require("react/jsx-runtime");

var S_ROW = {
  margin: '1rem 0 0 2rem'
},
    CONFIGS_ROW_1 = [{
  id: 'tempDay',
  title: 'T Day',
  titleStyle: _Label["default"].TEMP_DAY,
  svgStyle: _Label["default"].CIRCLE_TEMP_DAY
}, {
  id: 'tempMorn',
  title: 'T Morn',
  titleStyle: _Label["default"].TEMP_DAY,
  svgStyle: _Label["default"].CIRCLE_TEMP_MORN
}, {
  id: 'tempMax',
  title: 'T Max',
  titleStyle: _Label["default"].TEMP_MAX,
  svgStyle: _Label["default"].CIRCLE_TEMP_MAX
}, {
  id: 'pressure',
  titleStyle: _Label["default"].PRESSURE,
  svgStyle: _Label["default"].CIRCLE_PRESSURE
}, {
  id: 'rain',
  titleStyle: _Label["default"].RAIN,
  svgType: 'rect',
  svgStyle: _Label["default"].RECT_RAIN
}, {
  id: 'snow',
  titleStyle: _Label["default"].SNOW,
  svgType: 'rect',
  svgStyle: _Label["default"].RECT_SNOW
}],
    CONFIGS_ROW_2 = [{
  id: 'tempEve',
  title: 'T Eve',
  titleStyle: _Label["default"].TEMP_NIGHT,
  svgStyle: _Label["default"].CIRCLE_TEMP_EVE
}, {
  id: 'tempNight',
  title: 'T Night',
  titleStyle: _Label["default"].TEMP_NIGHT,
  svgStyle: _Label["default"].CIRCLE_TEMP_NIGHT
}, {
  id: 'tempMin',
  title: 'T Min',
  titleStyle: _Label["default"].TEMP_MIN,
  svgStyle: _Label["default"].CIRCLE_TEMP_MIN
}, {
  id: 'humidity',
  titleStyle: _Label["default"].HUMIDITY,
  svgStyle: _Label["default"].CIRCLE_HUMIDITY
}, {
  id: 'speed',
  title: 'Wind',
  titleStyle: _Label["default"].SPEED,
  svgStyle: _Label["default"].CIRCLE_SPEED
}];

var LegendForecast = function LegendForecast(_ref) {
  var isNot = _ref.isNot,
      filtered = _ref.filtered,
      onFilter = _ref.onFilter;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendRowSvg["default"], {
      style: S_ROW,
      notIs: isNot,
      configs: CONFIGS_ROW_1,
      filtered: filtered,
      onFilter: onFilter
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendRowSvg["default"], {
      style: S_ROW,
      notIs: isNot,
      configs: CONFIGS_ROW_2,
      filtered: filtered,
      onFilter: onFilter
    })]
  });
};

var _default = (0, _uiApi.memo)(LegendForecast);

exports["default"] = _default;
//# sourceMappingURL=LegendForecast.js.map