"use strict";

exports.__esModule = true;
exports.symbolWye = exports.symbolTriangle = exports.symbolStar = exports.symbolSquare = exports.symbolDiamond = exports.symbolCross = exports.symbolCircle = void 0;
var _math = require("./math");
var symbolCircle = {
  draw: function draw(context, size) {
    var r = (0, _math.sqrt)(size / _math.pi);
    context.moveTo(r, 0);
    context.arc(0, 0, r, 0, _math.tau);
  }
};
exports.symbolCircle = symbolCircle;
var symbolCross = {
  draw: function draw(context, size) {
    var r = (0, _math.sqrt)(size / 5) / 2;
    context.moveTo(-3 * r, -r);
    context.lineTo(-r, -r);
    context.lineTo(-r, -3 * r);
    context.lineTo(r, -3 * r);
    context.lineTo(r, -r);
    context.lineTo(3 * r, -r);
    context.lineTo(3 * r, r);
    context.lineTo(r, r);
    context.lineTo(r, 3 * r);
    context.lineTo(-r, 3 * r);
    context.lineTo(-r, r);
    context.lineTo(-3 * r, r);
    context.closePath();
  }
};
exports.symbolCross = symbolCross;
var tan30 = (0, _math.sqrt)(1 / 3);
var tan30_2 = tan30 * 2;
var symbolDiamond = {
  draw: function draw(context, size) {
    var y = (0, _math.sqrt)(size / tan30_2);
    var x = y * tan30;
    context.moveTo(0, -y);
    context.lineTo(x, 0);
    context.lineTo(0, y);
    context.lineTo(-x, 0);
    context.closePath();
  }
};
exports.symbolDiamond = symbolDiamond;
var symbolSquare = {
  draw: function draw(context, size) {
    var w = (0, _math.sqrt)(size);
    var x = -w / 2;
    context.rect(x, x, w, w);
  }
};
exports.symbolSquare = symbolSquare;
var ka = 0.89081309152928522810;
var kr = (0, _math.sin)(_math.pi / 10) / (0, _math.sin)(7 * _math.pi / 10);
var kx = (0, _math.sin)(_math.tau / 10) * kr;
var ky = -(0, _math.cos)(_math.tau / 10) * kr;
var symbolStar = {
  draw: function draw(context, size) {
    var r = (0, _math.sqrt)(size * ka);
    var x = kx * r;
    var y = ky * r;
    context.moveTo(0, -r);
    context.lineTo(x, y);
    for (var i = 1; i < 5; ++i) {
      var _a = _math.tau * i / 5;
      var _c = (0, _math.cos)(_a);
      var _s = (0, _math.sin)(_a);
      context.lineTo(_s * r, -_c * r);
      context.lineTo(_c * x - _s * y, _s * x + _c * y);
    }
    context.closePath();
  }
};
exports.symbolStar = symbolStar;
var sqrt3 = (0, _math.sqrt)(3);
var symbolTriangle = {
  draw: function draw(context, size) {
    var y = -(0, _math.sqrt)(size / (sqrt3 * 3));
    context.moveTo(0, y * 2);
    context.lineTo(-sqrt3 * y, -y);
    context.lineTo(sqrt3 * y, -y);
    context.closePath();
  }
};
exports.symbolTriangle = symbolTriangle;
var c = -0.5;
var s = (0, _math.sqrt)(3) / 2;
var k = 1 / (0, _math.sqrt)(12);
var a = (k / 2 + 1) * 3;
var symbolWye = {
  draw: function draw(context, size) {
    var r = (0, _math.sqrt)(size / a);
    var x0 = r / 2,
      y0 = r * k;
    var x1 = x0,
      y1 = r * k + r;
    var x2 = -x1,
      y2 = y1;
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(c * x0 - s * y0, s * x0 + c * y0);
    context.lineTo(c * x1 - s * y1, s * x1 + c * y1);
    context.lineTo(c * x2 - s * y2, s * x2 + c * y2);
    context.lineTo(c * x0 + s * y0, c * y0 - s * x0);
    context.lineTo(c * x1 + s * y1, c * y1 - s * x1);
    context.lineTo(c * x2 + s * y2, c * y2 - s * x2);
    context.closePath();
  }
};
exports.symbolWye = symbolWye;
//# sourceMappingURL=symbolShapes.js.map