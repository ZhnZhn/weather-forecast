"use strict";

exports.__esModule = true;
exports.default = void 0;
var _Chart = require("../charts/Chart");
var _Chart2 = require("./Chart.Style");
var _jsxRuntime = require("react/jsx-runtime");
const _crDataKey = (filtered, propName) => filtered[propName] ? 'empty' : propName,
  DF_IS_NOT = Object.create(null);
const crListSeries = function (configs, filtered, isNot) {
  if (isNot === void 0) {
    isNot = DF_IS_NOT;
  }
  return configs.map(_ref => {
    let {
      id,
      type,
      yId = 1,
      style = _Chart2.S_LINE_TEMP_NIGHT
    } = _ref;
    if (isNot[id]) {
      return null;
    }
    const _isTypeBar = type === 'bar',
      SeriaComp = _isTypeBar ? _Chart.Bar : _Chart.Line;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(SeriaComp, {
      ...style,
      connectNulls: true,
      yAxisId: yId,
      dataKey: _crDataKey(filtered, id),
      radius: _isTypeBar ? [3, 3, 0, 0] : void 0
    }, id);
  });
};
var _default = exports.default = crListSeries;
//# sourceMappingURL=crListSeries.js.map