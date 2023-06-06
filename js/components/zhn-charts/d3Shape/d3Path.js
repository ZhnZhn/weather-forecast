"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.Path = void 0;
exports.path = path;
exports.pathRound = pathRound;
var _taggedTemplateLiteralLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteralLoose"));
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14;
var pi = Math.PI,
  tau = 2 * pi,
  epsilon = 1e-6,
  tauEpsilon = tau - epsilon;
function append(strings) {
  this._ += strings[0];
  for (var i = 1, n = strings.length; i < n; ++i) {
    this._ += arguments[i] + strings[i];
  }
}
function appendRound(digits) {
  var d = Math.floor(digits);
  if (!(d >= 0)) throw new Error("invalid digits: " + digits);
  if (d > 15) return append;
  var k = Math.pow(10, d);
  return function (strings) {
    this._ += strings[0];
    for (var i = 1, n = strings.length; i < n; ++i) {
      this._ += Math.round(arguments[i] * k) / k + strings[i];
    }
  };
}
var Path = /*#__PURE__*/function () {
  function Path(digits) {
    this._x0 = this._y0 =
    // start of current subpath
    this._x1 = this._y1 = null; // end of current subpath
    this._ = "";
    this._append = digits == null ? append : appendRound(digits);
  }
  var _proto = Path.prototype;
  _proto.moveTo = function moveTo(x, y) {
    this._append(_templateObject || (_templateObject = (0, _taggedTemplateLiteralLoose2["default"])(["M", ",", ""])), this._x0 = this._x1 = +x, this._y0 = this._y1 = +y);
  };
  _proto.closePath = function closePath() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._append(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteralLoose2["default"])(["Z"])));
    }
  };
  _proto.lineTo = function lineTo(x, y) {
    this._append(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteralLoose2["default"])(["L", ",", ""])), this._x1 = +x, this._y1 = +y);
  };
  _proto.quadraticCurveTo = function quadraticCurveTo(x1, y1, x, y) {
    this._append(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteralLoose2["default"])(["Q", ",", ",", ",", ""])), +x1, +y1, this._x1 = +x, this._y1 = +y);
  };
  _proto.bezierCurveTo = function bezierCurveTo(x1, y1, x2, y2, x, y) {
    this._append(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteralLoose2["default"])(["C", ",", ",", ",", ",", ",", ""])), +x1, +y1, +x2, +y2, this._x1 = +x, this._y1 = +y);
  };
  _proto.arcTo = function arcTo(x1, y1, x2, y2, r) {
    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;

    // Is the radius negative? Error.
    if (r < 0) throw new Error("negative radius: " + r);
    var x0 = this._x1,
      y0 = this._y1,
      x21 = x2 - x1,
      y21 = y2 - y1,
      x01 = x0 - x1,
      y01 = y0 - y1,
      l01_2 = x01 * x01 + y01 * y01;

    // Is this path empty? Move to (x1,y1).
    if (this._x1 === null) {
      this._append(_templateObject6 || (_templateObject6 = (0, _taggedTemplateLiteralLoose2["default"])(["M", ",", ""])), this._x1 = x1, this._y1 = y1);
    }

    // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
    else if (!(l01_2 > epsilon)) ;

    // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
    // Equivalently, is (x1,y1) coincident with (x2,y2)?
    // Or, is the radius zero? Line to (x1,y1).
    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {
      this._append(_templateObject7 || (_templateObject7 = (0, _taggedTemplateLiteralLoose2["default"])(["L", ",", ""])), this._x1 = x1, this._y1 = y1);
    }

    // Otherwise, draw an arc!
    else {
      var x20 = x2 - x0,
        y20 = y2 - y0,
        l21_2 = x21 * x21 + y21 * y21,
        l20_2 = x20 * x20 + y20 * y20,
        l21 = Math.sqrt(l21_2),
        l01 = Math.sqrt(l01_2),
        l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
        t01 = l / l01,
        t21 = l / l21;

      // If the start tangent is not coincident with (x0,y0), line to.
      if (Math.abs(t01 - 1) > epsilon) {
        this._append(_templateObject8 || (_templateObject8 = (0, _taggedTemplateLiteralLoose2["default"])(["L", ",", ""])), x1 + t01 * x01, y1 + t01 * y01);
      }
      this._append(_templateObject9 || (_templateObject9 = (0, _taggedTemplateLiteralLoose2["default"])(["A", ",", ",0,0,", ",", ",", ""])), r, r, +(y01 * x20 > x01 * y20), this._x1 = x1 + t21 * x21, this._y1 = y1 + t21 * y21);
    }
  };
  _proto.arc = function arc(x, y, r, a0, a1, ccw) {
    x = +x, y = +y, r = +r, ccw = !!ccw;

    // Is the radius negative? Error.
    if (r < 0) throw new Error("negative radius: " + r);
    var dx = r * Math.cos(a0),
      dy = r * Math.sin(a0),
      x0 = x + dx,
      y0 = y + dy,
      cw = 1 ^ ccw,
      da = ccw ? a0 - a1 : a1 - a0;

    // Is this path empty? Move to (x0,y0).
    if (this._x1 === null) {
      this._append(_templateObject10 || (_templateObject10 = (0, _taggedTemplateLiteralLoose2["default"])(["M", ",", ""])), x0, y0);
    }

    // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
    else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
      this._append(_templateObject11 || (_templateObject11 = (0, _taggedTemplateLiteralLoose2["default"])(["L", ",", ""])), x0, y0);
    }

    // Is this arc empty? WeÔÇÖre done.
    if (!r) return;

    // Does the angle go the wrong way? Flip the direction.
    if (da < 0) da = da % tau + tau;

    // Is this a complete circle? Draw two arcs to complete the circle.
    if (da > tauEpsilon) {
      this._append(_templateObject12 || (_templateObject12 = (0, _taggedTemplateLiteralLoose2["default"])(["A", ",", ",0,1,", ",", ",", "A", ",", ",0,1,", ",", ",", ""])), r, r, cw, x - dx, y - dy, r, r, cw, this._x1 = x0, this._y1 = y0);
    }

    // Is this arc non-empty? Draw an arc!
    else if (da > epsilon) {
      this._append(_templateObject13 || (_templateObject13 = (0, _taggedTemplateLiteralLoose2["default"])(["A", ",", ",0,", ",", ",", ",", ""])), r, r, +(da >= pi), cw, this._x1 = x + r * Math.cos(a1), this._y1 = y + r * Math.sin(a1));
    }
  };
  _proto.rect = function rect(x, y, w, h) {
    this._append(_templateObject14 || (_templateObject14 = (0, _taggedTemplateLiteralLoose2["default"])(["M", ",", "h", "v", "h", "Z"])), this._x0 = this._x1 = +x, this._y0 = this._y1 = +y, w = +w, +h, -w);
  };
  _proto.toString = function toString() {
    return this._;
  };
  return Path;
}();
exports.Path = Path;
function path() {
  return new Path();
}

// Allow instanceof d3.path
path.prototype = Path.prototype;
function pathRound(digits) {
  if (digits === void 0) {
    digits = 3;
  }
  return new Path(+digits);
}
//# sourceMappingURL=d3Path.js.map