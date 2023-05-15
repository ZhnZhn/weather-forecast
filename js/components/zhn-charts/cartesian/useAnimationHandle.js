"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _uiApi = require("../../uiApi");
var FN_NOOP = function FN_NOOP() {};
var useAnimationHandle = function useAnimationHandle(props) {
  var _props$onAnimationSta = props.onAnimationStart,
    onAnimationStart = _props$onAnimationSta === void 0 ? FN_NOOP : _props$onAnimationSta,
    _props$onAnimationEnd = props.onAnimationEnd,
    onAnimationEnd = _props$onAnimationEnd === void 0 ? FN_NOOP : _props$onAnimationEnd,
    _useState = (0, _uiApi.useState)(false),
    isAnimationFinished = _useState[0],
    setIsAnimationFinished = _useState[1],
    handleAnimationStart = (0, _uiApi.useCallback)(function () {
      setIsAnimationFinished(false);
      onAnimationStart();
    }, [onAnimationStart]),
    handleAnimationEnd = (0, _uiApi.useCallback)(function () {
      setIsAnimationFinished(true);
      onAnimationEnd();
    }, [onAnimationEnd]);
  return [isAnimationFinished, handleAnimationStart, handleAnimationEnd];
};
var _default = useAnimationHandle;
exports["default"] = _default;
//# sourceMappingURL=useAnimationHandle.js.map