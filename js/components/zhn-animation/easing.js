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

const ACCURACY = 1e-4;
const cubicBezierFactor = (c1, c2) => [0, 3 * c1, 3 * c2 - 6 * c1, 3 * c1 - 3 * c2 + 1];
const multyTime = (params, t) => params.map((param, i) => param * t ** i).reduce((pre, curr) => pre + curr);
const cubicBezier = (c1, c2) => t => multyTime(cubicBezierFactor(c1, c2), t);
const derivativeCubicBezier = (c1, c2) => t => {
  const params = cubicBezierFactor(c1, c2),
    newParams = [...params.map((param, i) => param * i).slice(1), 0];
  return multyTime(newParams, t);
};

// calculate cubic-bezier using Newton's method
const configBezier = function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  let [x1, y1, x2, y2] = args;
  if (args.length === 1) {
    switch (args[0]) {
      case 'linear':
        [x1, y1, x2, y2] = [0.0, 0.0, 1.0, 1.0];
        break;
      case 'ease':
        [x1, y1, x2, y2] = [0.25, 0.1, 0.25, 1.0];
        break;
      case 'ease-in':
        [x1, y1, x2, y2] = [0.42, 0.0, 1.0, 1.0];
        break;
      case 'ease-out':
        [x1, y1, x2, y2] = [0.42, 0.0, 0.58, 1.0];
        break;
      case 'ease-in-out':
        [x1, y1, x2, y2] = [0.0, 0.0, 0.58, 1.0];
        break;
      default:
        {
          const easing = args[0].split('(');
          if (easing[0] === 'cubic-bezier' && easing[1].split(')')[0].split(',').length === 4) {
            [x1, y1, x2, y2] = easing[1].split(')')[0].split(',').map(x => parseFloat(x));
          }
        }
    }
  }
  const curveX = cubicBezier(x1, x2),
    curveY = cubicBezier(y1, y2),
    derCurveX = derivativeCubicBezier(x1, x2),
    rangeValue = value => value > 1 ? 1 : value < 0 ? 0 : value;
  const bezier = _t => {
    const t = _t > 1 ? 1 : _t;
    let x = t;
    for (let i = 0; i < 8; ++i) {
      const evalT = curveX(x) - t,
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
const configSpring = function (config) {
  if (config === void 0) {
    config = {};
  }
  const {
      stiff = 100,
      damping = 8,
      dt = 17
    } = config,
    stepper = (currX, destX, currV) => {
      const FSpring = -(currX - destX) * stiff,
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
const configEasing = function () {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }
  const [easing] = args;
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