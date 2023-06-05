"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var debounceFn = function debounceFn(func, delay, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
    leading = _ref.leading;
  var timerId;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (!timerId && leading) {
      func.apply(void 0, args);
    }
    clearTimeout(timerId);
    timerId = setTimeout(function () {
      return func.apply(void 0, args);
    }, delay);
  };
};
var _default = debounceFn;
exports["default"] = _default;
//# sourceMappingURL=debounceFn.js.map