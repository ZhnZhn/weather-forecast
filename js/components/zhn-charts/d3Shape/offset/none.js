"use strict";

exports.__esModule = true;
exports["default"] = _default;
function _default(series, order) {
  if (!((n = series.length) > 1)) return;
  var i,
    j,
    s0,
    s1 = series[order[0]],
    n,
    m = s1.length;
  for (i = 1; i < n; ++i) {
    s0 = s1;
    s1 = series[order[i]];
    for (j = 0; j < m; ++j) {
      s1[j][1] += s1[j][0] = isNaN(s0[j][1]) ? s0[j][0] : s0[j][1];
    }
  }
}
//# sourceMappingURL=none.js.map