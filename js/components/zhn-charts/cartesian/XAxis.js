"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.XAxis = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _cartesianFn = require("./cartesianFn");
var XAxis = function XAxis() {
  return null;
};
exports.XAxis = XAxis;
XAxis.displayName = 'XAxis';
XAxis.defaultProps = (0, _extends2["default"])({}, _cartesianFn.DF_AXIS_PROPS, {
  orientation: 'bottom',
  width: 0,
  height: 30,
  xAxisId: 0,
  type: 'category',
  padding: {
    left: 0,
    right: 0
  }
});
//# sourceMappingURL=XAxis.js.map