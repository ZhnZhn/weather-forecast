"use strict";

exports.__esModule = true;
exports.ifOverflowMatches = void 0;
var ifOverflowMatches = function ifOverflowMatches(props, value) {
  var _props = props || {},
    _ifOverflow = _props.alwaysShow ? 'extendDomain' : _props.ifOverflow;
  return _ifOverflow === value;
};
exports.ifOverflowMatches = ifOverflowMatches;
//# sourceMappingURL=IfOverflowMatches.js.map