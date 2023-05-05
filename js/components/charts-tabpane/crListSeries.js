"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _Chart = require("../charts/Chart");
var _Chart2 = _interopRequireDefault(require("./Chart.Style"));
var _jsxRuntime = require("react/jsx-runtime");
var _crDataKey = function _crDataKey(filtered, propName) {
    return filtered[propName] ? 'empty' : propName;
  },
  DF_IS_NOT = Object.create(null);
var crListSeries = function crListSeries(configs, filtered, isNot) {
  if (isNot === void 0) {
    isNot = DF_IS_NOT;
  }
  return configs.map(function (_ref) {
    var id = _ref.id,
      type = _ref.type,
      _ref$yId = _ref.yId,
      yId = _ref$yId === void 0 ? 1 : _ref$yId,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? _Chart2["default"].LineTempNight : _ref$style;
    if (isNot[id]) {
      return null;
    }
    var SeriaComp = type === 'bar' ? _Chart.Bar : _Chart.Line;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(SeriaComp, (0, _extends2["default"])({}, style, {
      connectNulls: true,
      yAxisId: yId,
      dataKey: _crDataKey(filtered, id)
    }), id);
  });
};
var _default = crListSeries;
exports["default"] = _default;
//# sourceMappingURL=crListSeries.js.map