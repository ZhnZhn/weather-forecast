"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _LegendRowSvg = _interopRequireDefault(require("./LegendRowSvg"));
var _Label = require("./Label.Style");
var _jsxRuntime = require("react/jsx-runtime");
const LS_ROOT = {
    marginTop: '1rem'
  },
  CONFIGS_ROW_1 = [{
    id: 'temp',
    title: 'T'
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
  }, {
    id: 'speed',
    title: 'Wind',
    titleStyle: _Label.S_SPEED,
    svgStyle: _Label.S_CIRCLE_SPEED
  }];
const LegendHourly = _ref => {
  let {
    isNot,
    filtered,
    onFilter
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendRowSvg.default, {
    style: LS_ROOT,
    notIs: isNot,
    configs: CONFIGS_ROW_1,
    filtered: filtered,
    onFilter: onFilter
  });
};
var _default = exports.default = LegendHourly;
//# sourceMappingURL=LegendHourly.js.map