"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.YAxis = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _cartesianFn = require("./cartesianFn");
var YAxis = function YAxis() {
  return null;
};
exports.YAxis = YAxis;
YAxis.displayName = 'YAxis';
YAxis.defaultProps = (0, _extends2["default"])({}, _cartesianFn.DF_AXIS_PROPS, {
  orientation: 'left',
  width: 60,
  height: 0,
  yAxisId: 0,
  type: 'number',
  padding: {
    top: 0,
    bottom: 0
  }
});
//# sourceMappingURL=YAxis.js.map