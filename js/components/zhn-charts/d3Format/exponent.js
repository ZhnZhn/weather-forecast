"use strict";

exports.__esModule = true;
exports.default = void 0;
var _formatDecimal = require("./formatDecimal");
var _default = x => (x = (0, _formatDecimal.formatDecimalParts)(Math.abs(x)), x ? x[1] : NaN);
exports.default = _default;
//# sourceMappingURL=exponent.js.map