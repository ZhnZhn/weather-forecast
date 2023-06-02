"use strict";

exports.__esModule = true;
exports["default"] = _default;
var _formatDecimal = require("./formatDecimal.js");
function _default(x) {
  x = (0, _formatDecimal.formatDecimalParts)(Math.abs(x));
  return x ? x[1] : NaN;
}
//# sourceMappingURL=exponent.js.map