"use strict";

exports.__esModule = true;
exports.continuous = continuous;
exports.copy = void 0;
var _d3Interpolate = require("../d3Interpolate");
var _d3Array = require("./d3Array");
var _helperFns = require("./helperFns");
var arrayFrom = Array.from,
  mathMin = Math.min,
  mathMax = Math.max;
var unit = [0, 1];
var constant = function constant(x) {
    return function () {
      return x;
    };
  },
  number = function number(x) {
    return +x;
  },
  identity = function identity(x) {
    return x;
  },
  normalize = function normalize(a, b) {
    b -= a = +a;
    return b ? function (x) {
      return (x - a) / b;
    } : constant(isNaN(b) ? NaN : 0.5);
  },
  clamper = function clamper(a, b) {
    var _ref = a > b ? [b, a] : [a, b],
      _a = _ref[0],
      _b = _ref[1];
    return function (x) {
      return mathMax(_a, mathMin(_b, x));
    };
  };

// normalize(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
// interpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding range value x in [a,b].
function bimap(domain, range, interpolate) {
  var d0 = domain[0],
    d1 = domain[1],
    r0 = range[0],
    r1 = range[1];
  if (d1 < d0) {
    d0 = normalize(d1, d0);
    r0 = interpolate(r1, r0);
  } else {
    d0 = normalize(d0, d1);
    r0 = interpolate(r0, r1);
  }
  return function (x) {
    return r0(d0(x));
  };
}
function polymap(domain, range, interpolate) {
  var j = mathMin(domain.length, range.length) - 1,
    d = new Array(j),
    r = new Array(j),
    i = -1;

  // Reverse descending domains.
  if (domain[j] < domain[0]) {
    domain = domain.slice().reverse();
    range = range.slice().reverse();
  }
  while (++i < j) {
    d[i] = normalize(domain[i], domain[i + 1]);
    r[i] = interpolate(range[i], range[i + 1]);
  }
  return function (x) {
    var i = (0, _d3Array.bisect)(domain, x, 1, j) - 1;
    return r[i](d[i](x));
  };
}
function transformer() {
  var domain = unit,
    range = unit,
    interpolate = _d3Interpolate.interpolateValue,
    transform,
    untransform,
    unknown,
    clamp = identity,
    piecewise,
    output,
    input;
  function rescale() {
    var n = mathMin(domain.length, range.length);
    if (clamp !== identity) clamp = clamper(domain[0], domain[n - 1]);
    piecewise = n > 2 ? polymap : bimap;
    output = input = null;
    return scale;
  }
  function scale(x) {
    return x == null || isNaN(x = +x) ? unknown : (output || (output = piecewise(domain.map(transform), range, interpolate)))(transform(clamp(x)));
  }
  scale.invert = function (y) {
    return clamp(untransform((input || (input = piecewise(range, domain.map(transform), _d3Interpolate.interpolateNumber)))(y)));
  };
  scale.domain = function (_) {
    return (0, _helperFns.isUndef)(_) ? domain.slice() : (domain = arrayFrom(_, number), rescale());
  };
  scale.range = function (_) {
    return (0, _helperFns.isUndef)(_) ? range.slice() : (range = arrayFrom(_), rescale());
  };
  scale.rangeRound = function (_) {
    range = arrayFrom(_);
    interpolate = _d3Interpolate.interpolateRound;
    return rescale();
  };
  scale.clamp = function (_) {
    return (0, _helperFns.isUndef)(_) ? clamp !== identity : (clamp = _ ? true : identity, rescale());
  };
  scale.interpolate = function (_) {
    return (0, _helperFns.isUndef)(_) ? interpolate : (interpolate = _, rescale());
  };
  scale.unknown = function () {
    return arguments.length ? (unknown = arguments.length <= 0 ? undefined : arguments[0], scale) : unknown;
  };
  return function (t, u) {
    transform = t;
    untransform = u;
    return rescale();
  };
}
var copy = function copy(source, target) {
  return target.domain(source.domain()).range(source.range()).interpolate(source.interpolate()).clamp(source.clamp()).unknown(source.unknown());
};
exports.copy = copy;
function continuous() {
  return transformer()(identity, identity);
}
//# sourceMappingURL=continuous.js.map