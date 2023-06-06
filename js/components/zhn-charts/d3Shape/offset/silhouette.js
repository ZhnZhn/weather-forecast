"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = _default;
var _none = _interopRequireDefault(require("./none"));
function _default(series, order) {
  if (!((n = series.length) > 0)) return;
  var j,
    s0 = series[order[0]],
    n,
    m = s0.length;
  for (j = 0; j < m; ++j) {
    for (var i = 0, y = 0; i < n; ++i) y += series[i][j][1] || 0;
    s0[j][1] += s0[j][0] = -y / 2;
  }
  (0, _none["default"])(series, order);
}
//# sourceMappingURL=silhouette.js.map