import {
  //ACCURACY,
  configBezier,
  //configSpring,
  configEasing
} from '../easing';

describe('configBezier', ()=>{
  const fn = configBezier;
  it('should return a cubic-bezier function when given four numbers', () => {
    const _bezier = fn(0.42, 0, 0.58, 1);
    expect(typeof _bezier).toBe('function');
    expect(_bezier(0)).toBe(0);
    expect(_bezier(0.25)).toBeCloseTo(0.13, 1);
    expect(_bezier(0.5)).toBeCloseTo(0.5, 1);
    expect(_bezier(0.75)).toBeCloseTo(0.87, 1);
    expect(_bezier(1)).toBe(1);
  });

  it('should create bezier function from string input', () => {
    const _bezier = fn('cubic-bezier(0.42,0,0.58,1)');
    expect(typeof _bezier).toBe('function');
    expect(_bezier(0)).toBe(0);
    expect(_bezier(0.25)).toBeCloseTo(0.13, 1);
    expect(_bezier(0.5)).toBeCloseTo(0.5, 1);
    expect(_bezier(0.75)).toBeCloseTo(0.87, 1);
    expect(_bezier(1)).toBe(1);
  });

  it('should create bezier function from string input with spaces', () => {
    const _bezier = fn('cubic-bezier( 0.42 , 0 , 0.58 , 1 )');
    expect(typeof _bezier).toBe('function');
    expect(_bezier(0)).toBe(0);
    expect(_bezier(0.25)).toBeCloseTo(0.13, 1);
    expect(_bezier(0.5)).toBeCloseTo(0.5, 1);
    expect(_bezier(0.75)).toBeCloseTo(0.87, 1);
    expect(_bezier(1)).toBe(1);
  });

  it('should create linear bezier function', () => {
    const _lineraBezier = fn('linear');
    expect(typeof _lineraBezier).toBe('function');
    expect(_lineraBezier(0)).toBe(0);
    expect(_lineraBezier(0.25)).toBeCloseTo(0.25, 4);
    expect(_lineraBezier(0.5)).toBeCloseTo(0.5, 4);
    expect(_lineraBezier(0.75)).toBeCloseTo(0.75, 4);
    expect(_lineraBezier(1)).toBe(1);
  });

  it('should create ease bezier function', () => {
    const _easeBezier = fn('ease');
    expect(typeof _easeBezier).toBe('function');
    expect(_easeBezier(0)).toBe(0);
    expect(_easeBezier(0.25)).toBeCloseTo(0.4, 1);
    expect(_easeBezier(0.5)).toBeCloseTo(0.8, 1);
    expect(_easeBezier(0.75)).toBeCloseTo(0.96, 1);
    expect(_easeBezier(1)).toBe(1);
  });

  it('should create ease-in bezier function', () => {
    const _easeInBezier = fn('ease-in');
    expect(typeof _easeInBezier).toBe('function');
    expect(_easeInBezier(0)).toBeCloseTo(0, 4);
    expect(_easeInBezier(0.25)).toBeCloseTo(0.09, 1);
    expect(_easeInBezier(0.5)).toBeCloseTo(0.31, 1);
    expect(_easeInBezier(0.75)).toBeCloseTo(0.62, 1);
    expect(_easeInBezier(1)).toBe(1);
  });

  it('should create ease-out bezier function', () => {
    const _easeOutBezier = fn('ease-out');
    expect(typeof _easeOutBezier).toBe('function');
    expect(_easeOutBezier(0)).toBeCloseTo(0, 4);
    expect(_easeOutBezier(0.25)).toBeCloseTo(0.13, 1);
    expect(_easeOutBezier(0.5)).toBeCloseTo(0.5, 1);
    expect(_easeOutBezier(0.75)).toBeCloseTo(0.91, 1);
    expect(_easeOutBezier(1)).toBe(1);
  });

  it('should create ease-in-out bezier function', () => {
    const _easeInOutBezier = fn('ease-in-out');
    expect(typeof _easeInOutBezier).toBe('function');
    expect(_easeInOutBezier(0)).toBeCloseTo(0, 4);
    expect(_easeInOutBezier(0.25)).toBeCloseTo(0.37, 1);
    expect(_easeInOutBezier(0.5)).toBeCloseTo(0.68, 1);
    expect(_easeInOutBezier(0.75)).toBeCloseTo(0.9, 1);
    expect(_easeInOutBezier(1)).toBe(1);
  });

  it('should handle extreme bezier curves requiring value clamping', () => {
   // This curve has extreme control points that may cause Newton's method to
   // temporarily go outside [0,1] range during calculations
   const _bezier = fn(0.1, 2.8, 0.9, -1.5);

   expect(_bezier(0)).toBeCloseTo(0);
   expect(_bezier(0.5)).toBeCloseTo(0.61, 1);
   expect(_bezier(1)).toBeCloseTo(1);
 });

 it('should handle bezier curves with numerical instability requiring value clamping', () => {
   // This curve creates a situation where Newton's method will produce values outside [0,1]
   const _bezier = fn(0.01, 5.0, 0.99, -3.0);

   // Test multiple points to increase chance of hitting boundary conditions
   expect(_bezier(0)).toBeCloseTo(0, 2);
   expect(_bezier(0.1)).toBeCloseTo(1.62, 2);
   expect(_bezier(0.3)).toBeCloseTo(1.5, 1);
   expect(_bezier(0.5)).toBeCloseTo(0.875, 2);
   expect(_bezier(0.7)).toBeCloseTo(0.19, 2);
   expect(_bezier(0.9)).toBeCloseTo(-0.15, 2);
   expect(_bezier(1)).toBeCloseTo(1, 2);
 });

 it('should handle bezier curves with negative values during calculation', () => {
   // This bezier curve will cause Newton's method to produce negative values
   // The extreme difference between control points pushes iterations to negative territory
   const _bezier = fn(0.99, -0.1, 0.01, 1.5);

   // Test at specific points that are likely to trigger negative rangeValue clamping
   expect(_bezier(0)).toBeCloseTo(0);
   expect(_bezier(0.2)).toBeCloseTo(0.01, 1);
   expect(_bezier(0.4)).toBeCloseTo(0.13, 1);
   expect(_bezier(0.6)).toBeCloseTo(1.1, 1);
   expect(_bezier(0.8)).toBeCloseTo(1.1, 1);
   expect(_bezier(1)).toBeCloseTo(1);
 });

 // perhaps this shouldn't return a function, but rather throw an error - the output is useless anyway
  it('should return bezier function that returns all NaNs if the input is not a known function', () => {
    const _bezier = fn('invalid');
    expect(typeof _bezier).toBe('function')
    expect(_bezier(0)).toBe(NaN);
    expect(_bezier(0.25)).toBe(NaN);
    expect(_bezier(0.5)).toBe(NaN);
    expect(_bezier(0.75)).toBe(NaN);
    expect(_bezier(1)).toBe(NaN);
  });

})

/*
describe('configSpring', ()=>{
  const fn = configSpring;
  it('should return a stepper function with default config', () => {
    const _spring = fn();
    expect(typeof _spring).toBe('function');
    expect(_spring.isStepper).toBe(true);
    expect(_spring.dt).toBe(17);

    // Test stepper with some inputs
    const [newX, newV] = _spring(0, 1, 0);
    expect(newX).toBeCloseTo(0, 3);
    expect(newV).toBeCloseTo(1.7, 3);

    const [midX, midV] = _spring(0.1, 1, 0);
    expect(midX).toBeCloseTo(0.1, 3);
    expect(midV).toBeCloseTo(1.53, 3);

    const [finalX, finalV] = _spring(0.5, 1, 0);
    expect(finalX).toBeCloseTo(0.5, 3);
    expect(finalV).toBeCloseTo(0.85, 3);
  });

  it('should handle custom config', () => {
    const _customSpring = fn({ stiff: 200, damping: 10, dt: 20 });
    expect(typeof _customSpring).toBe('function');
    expect(_customSpring.dt).toBe(20);

    // Test stepper with some inputs
    const [newX, newV] = _customSpring(0, 1, 0);
    expect(newX).toBeCloseTo(0, 3);
    expect(newV).toBeCloseTo(4, 3);

    const [midX, midV] = _customSpring(0.1, 1, 0);
    expect(midX).toBeCloseTo(0.1, 3);
    expect(midV).toBeCloseTo(3.6, 3);

    const [finalX, finalV] = _customSpring(0.5, 1, 0);
    expect(finalX).toBeCloseTo(0.5, 3);
    expect(finalV).toBeCloseTo(2, 3);
  });

  it('should settle at destination with zero velocity', () => {
    const _spring = fn();
    let x = 0;
    let v = 0;
    const destX = 1;

    // Run the spring simulation until it settles
    for (let i = 0; i < 100; i++) {
      [x, v] = _spring(x, destX, v);
      // If settled, we should break early
      if (Math.abs(x - destX) < ACCURACY && Math.abs(v) < ACCURACY) {
        break;
      }
    }

    // The spring should have settled
    expect(x).toBeCloseTo(destX, 2);
    expect(v).toBeCloseTo(0, 1);
  });
})
*/

describe('configEasing', ()=>{
  const fn = configEasing;
  it('should return the correct bezier function for named easing', () => {
    const easing = fn('ease');
    expect(typeof easing).toBe('function');
  });

  /*
  it('should return stepper function', () => {
    const _spring = fn('spring');
    expect(typeof _spring).toBe('function');
    expect(_spring.isStepper).toBe(true);
    expect(_spring(0, 1, 0)).toEqual([0, 1.7]);
  });
  */

  it('should handle cubic-bezier input', () => {
    const _bezier = fn('cubic-bezier(0.42,0,0.58,1)');
    expect(typeof _bezier).toBe('function');
    expect(_bezier.isStepper).toBe(false);
    expect(_bezier(0.5)).toEqual(0.5);
  });

  it('should handle function inputs', () => {
    const customFunc = () => 7;
    customFunc.isStepper = false; // Simulate a bezier function
    const _result = fn(customFunc);
    expect(_result).toBe(customFunc);
  });

  it('should return null for invalid inputs', () => {
    const _result = fn('invalid');
    expect(_result).toBeNull();
  });

})
