"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("../_react"));

var useCallback = _react["default"].useCallback;
/*eslint-disable react-hooks/exhaustive-deps */

var fUseKey = function fUseKey(isKey) {
  return function (fn, deps) {
    return useCallback(function (event) {
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