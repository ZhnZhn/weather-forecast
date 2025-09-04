"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
const usePrevValue = value => {
  const _refPrevValue = (0, _uiApi.useRef)();
  (0, _uiApi.useEffect)(() => {
    _refPrevValue.current = value;
  });
  return _refPrevValue.current;
};
var _default = exports.default = usePrevValue;
//# sourceMappingURL=usePrevValue.js.map