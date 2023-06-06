"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.scaleBand = scaleBand;
exports.scalePoint = scalePoint;
var _d3Array = require("./d3Array");
var _init = require("./init");
var _ordinal = _interopRequireDefault(require("./ordinal"));
var _helperFns = require("./helperFns");
var mathFloor = Math.floor,
  mathRound = Math.round,
  mathMin = Math.min,
  mathMax = Math.max;
function scaleBand() {
  var scale = (0, _ordinal["default"])().unknown(undefined),
    domain = scale.domain,
    ordinalRange = scale.range,
    r0 = 0,
    r1 = 1,
    step,
    bandwidth,
    round = false,
    paddingInner = 0,
    paddingOuter = 0,
    align = 0.5;
  delete scale.unknown;
  function rescale() {
    var n = domain().length,
      reverse = r1 < r0,
      start = reverse ? r1 : r0,
      stop = reverse ? r0 : r1;
    step = (stop - start) / mathMax(1, n - paddingInner + paddingOuter * 2);
    if (round) step = mathFloor(step);
    start += (stop - start - step * (n - paddingInner)) * align;
    bandwidth = step * (1 - paddingInner);
    if (round) {
      start = mathRound(start);
      bandwidth = mathRound(bandwidth);
    }
    var values = (0, _d3Array.range)(n).map(function (i) {
      return start + step * i;
    });
    return ordinalRange(reverse ? values.reverse() : values);
  }
  scale.domain = function (_) {
    return (0, _helperFns.isUndef)(_) ? domain() : (domain(_), rescale());
  };
  scale.range = function (_) {
    return (0, _helperFns.isUndef)(_) ? [r0, r1] : ((r0 = _[0], r1 = _[1]), r0 = +r0, r1 = +r1, rescale());
  };
  scale.rangeRound = function (_) {
    r0 = _[0];
    r1 = _[1];
    r0 = +r0;
    r1 = +r1;
    round = true;
    return rescale();
  };
  scale.bandwidth = function () {
    return bandwidth;
  };
  scale.step = function () {
    return step;
  };
  scale.round = function (_) {
    return (0, _helperFns.isUndef)(_) ? round : (round = !!_, rescale());
  };
  scale.padding = function (_) {
    return (0, _helperFns.isUndef)(_) ? paddingInner : (paddingInner = mathMin(1, paddingOuter = +_), rescale());
  };
  scale.paddingInner = function (_) {
    return (0, _helperFns.isUndef)(_) ? paddingInner : (paddingInner = mathMin(1, _), rescale());
  };
  scale.paddingOuter = function (_) {
    return (0, _helperFns.isUndef)(_) ? paddingOuter : (paddingOuter = +_, rescale());
  };
  scale.align = function (_) {
    return (0, _helperFns.isUndef)(_) ? align : (align = mathMax(0, mathMin(1, _)), rescale());
  };
  scale.copy = function () {
    return scaleBand(domain(), [r0, r1]).round(round).paddingInner(paddingInner).paddingOuter(paddingOuter).align(align);
  };
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return _init.initRange.apply(rescale(), args);
}
function pointish(scale) {
  var copy = scale.copy;
  scale.padding = scale.paddingOuter;
  delete scale.paddingInner;
  delete scale.paddingOuter;
  scale.copy = function () {
    return pointish(copy());
  };
  return scale;
}
function scalePoint() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }
  return pointish(scaleBand.apply(null, args).paddingInner(1));
}
//# sourceMappingURL=band.js.map