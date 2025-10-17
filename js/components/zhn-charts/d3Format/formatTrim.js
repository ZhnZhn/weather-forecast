"use strict";

exports.__esModule = true;
exports.default = void 0;
// Trims insignificant zeros, e.g., replaces 1.2000k with 1.2k.
var _default = s => {
  let n = s.length,
    i = 1,
    i0 = -1,
    i1;
  out: for (; i < n; ++i) {
    switch (s[i]) {
      case ".":
        i0 = i1 = i;
        break;
      case "0":
        if (i0 === 0) i0 = i;
        i1 = i;
        break;
      default:
        if (!+s[i]) break out;
        if (i0 > 0) i0 = 0;
        break;
    }
  }
  return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
};
exports.default = _default;
//# sourceMappingURL=formatTrim.js.map