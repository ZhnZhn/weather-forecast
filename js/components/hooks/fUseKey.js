"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _uiApi = require("../uiApi");

/*eslint-disable react-hooks/exhaustive-deps */
var fUseKey = function fUseKey(isKey) {
  return function (fn, deps) {
    return (0, _uiApi.useCallback)(function (event) {
      if (isKey(event)) {
        event.preventDefault();
        event.stopPropagation();
        fn(event);
      }
    }, deps || []);
  };
};
/*eslint-enable react-hooks/exhaustive-deps */


var _default = fUseKey;
exports["default"] = _default;
//# sourceMappingURL=fUseKey.js.map