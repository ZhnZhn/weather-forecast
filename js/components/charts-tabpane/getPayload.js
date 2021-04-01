"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _isArr = Array.isArray;

var getPayload = function getPayload(_ref) {
  var active = _ref.active,
      payload = _ref.payload;

  if (!(active && _isArr(payload))) {
    return;
  }

  return (payload[0] || {}).payload;
};

var _default = getPayload;
exports["default"] = _default;
//# sourceMappingURL=getPayload.js.map