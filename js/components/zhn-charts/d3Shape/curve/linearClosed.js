"use strict";

exports.__esModule = true;
exports["default"] = _default;
var _helperFns = require("../helperFns");
function LinearClosed(context) {
  this._context = context;
}
LinearClosed.prototype = {
  areaStart: _helperFns.noop,
  areaEnd: _helperFns.noop,
  lineStart: function lineStart() {
    this._point = 0;
  },
  lineEnd: function lineEnd() {
    if (this._point) this._context.closePath();
  },
  point: function point(x, y) {
    x = +x;
    y = +y;
    if (this._point) this._context.lineTo(x, y);else this._point = 1, this._context.moveTo(x, y);
  }
};
function _default(context) {
  return new LinearClosed(context);
}
//# sourceMappingURL=linearClosed.js.map