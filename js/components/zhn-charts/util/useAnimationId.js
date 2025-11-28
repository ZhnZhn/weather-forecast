"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../../uiApi");
var _DataUtils = require("./DataUtils");
const useAnimationId = function (input, prefix) {
  if (prefix === void 0) {
    prefix = 'animation-';
  }
  const _refAnimationId = (0, _uiApi.useRef)(null);
  if ((0, _uiApi.getRefValue)(_refAnimationId) === null) {
    (0, _uiApi.setRefValue)(_refAnimationId, (0, _DataUtils.uniqueId)(prefix));
  }
  const _refPrevProps = (0, _uiApi.useRef)(input);
  if ((0, _uiApi.getRefValue)(_refPrevProps) !== input) {
    (0, _uiApi.setRefValue)(_refAnimationId, (0, _DataUtils.uniqueId)(prefix));
    (0, _uiApi.setRefValue)(_refPrevProps, input);
  }
  return (0, _uiApi.getRefValue)(_refAnimationId);
};
var _default = exports.default = useAnimationId;
//# sourceMappingURL=useAnimationId.js.map