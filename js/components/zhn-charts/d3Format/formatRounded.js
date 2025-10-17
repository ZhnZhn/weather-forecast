"use strict";

exports.__esModule = true;
exports.default = void 0;
var _formatDecimal = require("./formatDecimal");
var _default = (x, p) => {
  let d = (0, _formatDecimal.formatDecimalParts)(x, p);
  if (!d) return x + "";
  let coefficient = d[0],
    exponent = d[1];
  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1) : coefficient + new Array(exponent - coefficient.length + 2).join("0");
};
exports.default = _default;
//# sourceMappingURL=formatRounded.js.map