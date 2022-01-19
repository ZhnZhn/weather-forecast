"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _LegendRowSvg = _interopRequireDefault(require("./LegendRowSvg"));

var _Label = _interopRequireDefault(require("./Label.Style"));

var _jsxRuntime = require("react/jsx-runtime");

var LS_ROOT = {
  marginTop: '1rem'
},
    CONFIGS_ROW_1 = [{
  id: 'temp',
  title: 'T'
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
}, {
  id: 'speed',
  title: 'Wind',
  titleStyle: _Label["default"].SPEED,
  svgStyle: _Label["default"].CIRCLE_SPEED
}];

var LegendHourly = function LegendHourly(_ref) {
  var isNot = _ref.isNot,
      filtered = _ref.filtered,
      onFilter = _ref.onFilter;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendRowSvg["default"], {
    style: LS_ROOT,
    notIs: isNot,
    configs: CONFIGS_ROW_1,
    filtered: filtered,
    onFilter: onFilter
  });
};

var _default = LegendHourly;
exports["default"] = _default;
//# sourceMappingURL=LegendHourly.js.map