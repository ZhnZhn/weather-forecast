"use strict";

exports.__esModule = true;
exports.withPath = withPath;
var _d3Path = require("./d3Path");
var _helperFns = require("./helperFns");
var mathFloor = Math.floor;
function withPath(shape) {
  var digits = 3;
  shape.digits = function (_) {
    if ((0, _helperFns.isUndef)(_)) return digits;
    if (_ == null) {
      digits = null;
    } else {
      var d = mathFloor(_);
      if (!(d >= 0)) throw new RangeError("invalid digits: " + _);
      digits = d;
    }
    return shape;
  };
  return function () {
    return new _d3Path.Path(digits);
  };
}
//# sourceMappingURL=path.js.map