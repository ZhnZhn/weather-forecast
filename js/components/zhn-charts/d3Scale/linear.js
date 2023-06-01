"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.scaleLinear = scaleLinear;
var _d3Array = require("./d3Array");
var _continuous = require("./continuous.js");
var _init = require("./init.js");
var _tickFormat = _interopRequireDefault(require("./tickFormat.js"));
function linearish(scale) {
  var domain = scale.domain;
  scale.ticks = function (count) {
    var d = domain();
    return (0, _d3Array.ticks)(d[0], d[d.length - 1], count == null ? 10 : count);
  };
  scale.tickFormat = function (count, specifier) {
    var d = domain();
    return (0, _tickFormat["default"])(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
  };
  scale.nice = function (count) {
    if (count == null) count = 10;
    var d = domain(),
      i0 = 0,
      i1 = d.length - 1,
      start = d[i0],
      stop = d[i1],
      prestep,
      step,
      maxIter = 10;
    if (stop < start) {
      step = start;
      start = stop;
      stop = step;
      step = i0;
      i0 = i1;
      i1 = step;
    }
    while (maxIter-- > 0) {
      step = (0, _d3Array.tickIncrement)(start, stop, count);
      if (step === prestep) {
        d[i0] = start;
        d[i1] = stop;
        return domain(d);
      } else if (step > 0) {
        start = Math.floor(start / step) * step;
        stop = Math.ceil(stop / step) * step;
      } else if (step < 0) {
        start = Math.ceil(start * step) / step;
        stop = Math.floor(stop * step) / step;
      } else {
        break;
      }
      prestep = step;
    }
    return scale;
  };
  return scale;
}
function scaleLinear() {
  var scale = (0, _continuous.continuous)();
  scale.copy = function () {
    return (0, _continuous.copy)(scale, scaleLinear());
  };
  _init.initRange.apply(scale, arguments);
  return linearish(scale);
}
//# sourceMappingURL=linear.js.map