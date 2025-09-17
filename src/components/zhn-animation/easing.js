import {
  isStr,
  isFn
} from '../../utils/isTypeFn';
/*
configBezier arguments should be one of
'ease', 'ease-in', 'ease-out', ease-in-out',
'linear', 'spring', 'cubic-bezier(x1,y1,x2,y2)

configBezier arguments should be
x1, y1, x2, y2 of [0, 1]

configEasing first argument type should be
function or string
*/

export const ACCURACY = 1e-4;
const _mathAbs = Math.abs;

const cubicBezierFactor = (
  c1,
  c2
) => [
  0,
  3 * c1,
  3 * c2 - 6 * c1,
  3 * c1 - 3 * c2 + 1,
];

const multyTime = (
  params,
  t
) => params
 .map((param, i) => param * (t ** i))
 .reduce((pre, curr) => pre + curr);

const cubicBezier = (
  c1,
  c2
) => (
  t
) => multyTime(cubicBezierFactor(c1, c2), t);


const derivativeCubicBezier = (
  c1,
  c2
) => (
  t
) => {
  const params = cubicBezierFactor(c1, c2)
  , newParams = [
     ...params.map((param, i) => param * i).slice(1),
     0
  ];

  return multyTime(newParams, t);
};

const BEZIER_CONFIG = {
  linear: [0.0, 0.0, 1.0, 1.0],
  ease: [0.25, 0.1, 0.25, 1.0],
  'ease-in': [0.42, 0.0, 1.0, 1.0],
  'ease-out': [0.42, 0.0, 0.58, 1.0],
  'ease-in-out': [0.0, 0.0, 0.58, 1.0]
};

const _isCubicBezier = (
  token
) => token === 'cubic-bezier';
const _getCubicBezierPoints = (
  pointsToken
) => {
  const _str = pointsToken
    ? pointsToken.split(')')[0]
    : '';
  return _str
    ? _str.split(',')
    : [];
};
const _isCorrectCubicBezierPointsToken = (
  pointsToken
) => _getCubicBezierPoints(pointsToken).length === 4

// calculate cubic-bezier using Newton's method
export const configBezier = (...args) => {
  let [x1, y1, x2, y2] = args;

  if (args.length === 1) {
    const _config = BEZIER_CONFIG[args[0]];
    if (_config) {
      [x1, y1, x2, y2] = _config
    } else {
      const [easing, pointsToken] = args[0].split('(');
      if (_isCubicBezier(easing) && _isCorrectCubicBezierPointsToken(pointsToken)) {
        [x1, y1, x2, y2] = _getCubicBezierPoints(pointsToken)
          .map(x => parseFloat(x));
      }
    }
  }

  const curveX = cubicBezier(x1, x2)
  , curveY = cubicBezier(y1, y2)
  , derCurveX = derivativeCubicBezier(x1, x2)
  , rangeValue = (value) => value > 1
     ? 1
     : value < 0
        ? 0
        : value;

  const bezier = (_t) => {
    const t = _t > 1 ? 1 : _t;
    let x = t;

    for (let i = 0; i < 8; ++i) {
      const evalT = curveX(x) - t
      , derVal = derCurveX(x);

      if (_mathAbs(evalT - t) < ACCURACY || derVal < ACCURACY) {
        return curveY(x);
      }
      x = rangeValue(x - evalT / derVal);
    }
    return curveY(x);
  };

  bezier.isStepper = false;

  return bezier;
};


export const configSpring = (
  config = {}
) => {
  const {
    stiff = 100,
    damping = 8,
    dt = 17
  } = config
  , stepper = (currX, destX, currV) => {
     const FSpring = -(currX - destX) * stiff
     , FDamping = currV * damping
     , newV = currV + (FSpring - FDamping) * dt / 1000
     , newX = currV * dt / 1000 + currX;

     return _mathAbs(newX - destX) < ACCURACY && _mathAbs(newV) < ACCURACY
       ? [destX, 0]
       : [newX, newV];
  };

  stepper.isStepper = true;
  stepper.dt = dt;

  return stepper;
};

export const configEasing = (...args) => {
  const [easing] = args;

  if (isStr(easing)) {
    if (BEZIER_CONFIG[easing] || _isCubicBezier(easing.split('(')[0])) {
      return configBezier(easing);
    }
    if (easing === 'spring') {
      return configSpring();
    }
  }

  return isFn(easing) ? easing : null;
};
