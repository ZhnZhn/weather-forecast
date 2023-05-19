"use strict";

exports.__esModule = true;
exports.configSpring = exports.configEasing = exports.configBezier = void 0;
/*
configBezier arguments should be one of
'ease', 'ease-in', 'ease-out', ease-in-out',
'linear', 'spring', 'cubic-bezier(x1,y1,x2,y2)

configBezier arguments should be
x1, y1, x2, y2 of [0, 1]

configEasing first argument type should be
function or string
*/

var ACCURACY = 1e-4;
var cubicBezierFactor = function cubicBezierFactor(c1, c2) {
  return [0, 3 * c1, 3 * c2 - 6 * c1, 3 * c1 - 3 * c2 + 1];
};
var multyTime = function multyTime(params, t) {
  return params.map(function (param, i) {
    return param * Math.pow(t, i);
  }).reduce(function (pre, curr) {
    return pre + curr;
  });
};
var cubicBezier = function cubicBezier(c1, c2) {
  return function (t) {
    return multyTime(cubicBezierFactor(c1, c2), t);
  };
};
var derivativeCubicBezier = function derivativeCubicBezier(c1, c2) {
  return function (t) {
    var params = cubicBezierFactor(c1, c2),
      newParams = [].concat(params.map(function (param, i) {
        return param * i;
      }).slice(1), [0]);
    return multyTime(newParams, t);
  };
};

// calculate cubic-bezier using Newton's method
var configBezier = function configBezier() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  var x1 = args[0],
    y1 = args[1],
    x2 = args[2],
    y2 = args[3];
  if (args.length === 1) {
    switch (args[0]) {
      case 'linear':
        x1 = 0.0;
        y1 = 0.0;
        x2 = 1.0;
        y2 = 1.0;
        break;
      case 'ease':
        x1 = 0.25;
        y1 = 0.1;
        x2 = 0.25;
        y2 = 1.0;
        break;
      case 'ease-in':
        x1 = 0.42;
        y1 = 0.0;
        x2 = 1.0;
        y2 = 1.0;
        break;
      case 'ease-out':
        x1 = 0.42;
        y1 = 0.0;
        x2 = 0.58;
        y2 = 1.0;
        break;
      case 'ease-in-out':
        x1 = 0.0;
        y1 = 0.0;
        x2 = 0.58;
        y2 = 1.0;
        break;
      default:
        {
          var easing = args[0].split('(');
          if (easing[0] === 'cubic-bezier' && easing[1].split(')')[0].split(',').length === 4) {
            var _easing$1$split$0$spl = easing[1].split(')')[0].split(',').map(function (x) {
              return parseFloat(x);
            });
            x1 = _easing$1$split$0$spl[0];
            y1 = _easing$1$split$0$spl[1];
            x2 = _easing$1$split$0$spl[2];
            y2 = _easing$1$split$0$spl[3];
          }
        }
    }
  }
  var curveX = cubicBezier(x1, x2),
    curveY = cubicBezier(y1, y2),
    derCurveX = derivativeCubicBezier(x1, x2),
    rangeValue = function rangeValue(value) {
      return value > 1 ? 1 : value < 0 ? 0 : value;
    };
  var bezier = function bezier(_t) {
    var t = _t > 1 ? 1 : _t;
    var x = t;
    for (var i = 0; i < 8; ++i) {
      var evalT = curveX(x) - t,
        derVal = derCurveX(x);
      if (Math.abs(evalT - t) < ACCURACY || derVal < ACCURACY) {
        return curveY(x);
      }
      x = rangeValue(x - evalT / derVal);
    }
    return curveY(x);
  };
  bezier.isStepper = false;
  return bezier;
};
exports.configBezier = configBezier;
var configSpring = function configSpring(config) {
  if (config === void 0) {
    config = {};
  }
  var _config = config,
    _config$stiff = _config.stiff,
    stiff = _config$stiff === void 0 ? 100 : _config$stiff,
    _config$damping = _config.damping,
    damping = _config$damping === void 0 ? 8 : _config$damping,
    _config$dt = _config.dt,
    dt = _config$dt === void 0 ? 17 : _config$dt,
    stepper = function stepper(currX, destX, currV) {
      var FSpring = -(currX - destX) * stiff,
        FDamping = currV * damping,
        newV = currV + (FSpring - FDamping) * dt / 1000,
        newX = currV * dt / 1000 + currX;
      return Math.abs(newX - destX) < ACCURACY && Math.abs(newV) < ACCURACY ? [destX, 0] : [newX, newV];
    };
  stepper.isStepper = true;
  stepper.dt = dt;
  return stepper;
};
exports.configSpring = configSpring;
var configEasing = function configEasing() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }
  var easing = args[0];
  if (typeof easing === 'string') {
    switch (easing) {
      case 'ease':
      case 'ease-in-out':
      case 'ease-out':
      case 'ease-in':
      case 'linear':
        return configBezier(easing);
      case 'spring':
        return configSpring();
      default:
        if (easing.split('(')[0] === 'cubic-bezier') {
          return configBezier(easing);
        }
    }
  }
  if (typeof easing === 'function') {
    return easing;
  }
  return null;
};
exports.configEasing = configEasing;
//# sourceMappingURL=easing.js.map