"use strict";

exports.__esModule = true;
exports.default = void 0;
const _isArr = Array.isArray;
const _getPayload = _ref => {
  let {
    active,
    payload
  } = _ref;
  return active && _isArr(payload) ? (payload[0] || {}).payload : void 0;
};
const fTooltip = crTooltip => props => {
  const payload = _getPayload(props);
  return payload ? crTooltip(payload, props) : null;
};
var _default = exports.default = fTooltip;
//# sourceMappingURL=fTooltip.js.map