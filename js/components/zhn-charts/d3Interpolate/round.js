"use strict";

exports.__esModule = true;
exports["default"] = _default;
function _default(a, b) {
  return a = +a, b = +b, function (t) {
    return Math.round(a * (1 - t) + b * t);
  };
}
//# sourceMappingURL=round.js.map