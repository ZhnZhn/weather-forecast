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

// calculate cubic-bezier using Newton's method
export const configBezier = (...args) => {
  let [x1, y1, x2, y2] = args;

  if (args.length === 1) {
    const _config = BEZIER_CONFIG[args[0]];
    if (_config) {
      [x1, y1, x2, y2] = _config
    } else {
      const easing = args[0].split('(');
      if (easing[0] === 'cubic-bezier' && easing[1].split(')')[0].split(',').length === 4) {
        [x1, y1, x2, y2] = easing[1].split(')')[0].split(',').map(x => parseFloat(x));
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

     return Math.abs(newX - destX) < ACCURACY && Math.abs(newV) < ACCURACY
       ? [destX, 0]
       : [newX, newV];
  };

  stepper.isStepper = true;
  stepper.dt = dt;

  return stepper;
};

export const configEasing = (...args) => {
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
