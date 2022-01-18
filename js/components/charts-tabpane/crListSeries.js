"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _Chart = _interopRequireDefault(require("../charts/Chart"));

var _Chart2 = _interopRequireDefault(require("./Chart.Style"));

var _jsxRuntime = require("react/jsx-runtime");

var Line = _Chart["default"].Line;

var _crDataKey = function _crDataKey(filtered, propName) {
  return filtered[propName] ? 'empty' : propName;
};

var crListSeries = function crListSeries(configs, filtered) {
  return configs.map(function (_ref) {
    var id = _ref.id,
        _ref$yId = _ref.yId,
        yId = _ref$yId === void 0 ? 1 : _ref$yId,
        _ref$style = _ref.style,
        style = _ref$style === void 0 ? _Chart2["default"].LineTempNight : _ref$style;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(Line, (0, _extends2["default"])({}, style, {
      connectNulls: true,
      yAxisId: yId,
      dataKey: _crDataKey(filtered, id)
    }), id);
  });
};

var _default = crListSeries;
exports["default"] = _default;
//# sourceMappingURL=crListSeries.js.map