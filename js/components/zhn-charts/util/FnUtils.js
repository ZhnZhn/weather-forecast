"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports._throttle = exports._range = void 0;
var _isTypeFn = require("../../../utils/isTypeFn");
var _throttleFn = _interopRequireDefault(require("../../../utils/throttleFn"));
const _throttle = exports._throttle = _throttleFn.default;
const _range = (startValue, endValue) => {
  const isEndDef = !(0, _isTypeFn.isUndef)(endValue);
  endValue = isEndDef ? endValue : startValue;
  startValue = isEndDef ? startValue : 0;
  const _diff = endValue - startValue,
    increment = Math.sign(_diff) || 1,
    length = Math.abs(_diff / increment),
    {
      result
    } = Array.from({
      length
    }).reduce(_ref => {
      let {
        result,
        current
      } = _ref;
      return {
        result: [...result, current],
        current: current + increment
      };
    }, {
      current: startValue,
      result: []
    });
  return result;
};
exports._range = _range;
//# sourceMappingURL=FnUtils.js.map