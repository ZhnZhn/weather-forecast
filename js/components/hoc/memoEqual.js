"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _uiApi = require("../uiApi");

var _areEqual = function _areEqual() {
  return true;
},
    memoEqual = function memoEqual(Comp) {
  return (0, _uiApi.memo)(Comp, _areEqual);
};

var _default = memoEqual;
exports["default"] = _default;
//# sourceMappingURL=memoEqual.js.map