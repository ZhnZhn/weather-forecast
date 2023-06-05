"use strict";

exports.__esModule = true;
exports["default"] = _default;
exports.extend = extend;
function _default(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}
//# sourceMappingURL=define.js.map