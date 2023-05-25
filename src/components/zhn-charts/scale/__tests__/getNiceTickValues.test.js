import { getNiceTickValues } from '../getNiceTickValues';

describe('getNiceTickValues', () => {
  //fn([min, max], count, allowDecimals=true)
  const fn = getNiceTickValues;
  test('of equal values of positive integer has odd tick count', () => {
    expect(fn([5, 5], 3)).toEqual([4, 5, 6]);
  })
  test('of equal values of positive integer has even tick count', () => {
    expect(fn([5, 5], 4)).toEqual([4, 5, 6, 7]);
  })

  test('of equal values of negative integer has odd tick count', () => {
    expect(fn([-5, -5], 5)).toEqual([-7, -6, -5, -4, -3]);
  })
  test('of equal values of negative integer has even tick count', () => {
    expect(fn([-5, -5], 2)).toEqual([-5, -4]);
  })

  test('of equal values all zeros has odd tick count', () => {
    expect(fn([0, 0], 5)).toEqual([0, 1, 2, 3, 4]);
  })
  test('of equal values all zeros has even tick count', () => {
    expect(fn([0, 0], 4)).toEqual([0, 1, 2, 3]);
  })

  test('of equal values of positive pure decomal has odd tick count', () => {
    expect(fn([0.05, 0.05], 3)).toEqual([0.04, 0.05, 0.06]);
  })
  test('of equal values of positive pure decomal has odd tick count not allow decimals', () => {
    expect(fn([0.05, 0.05], 3, false)).toEqual([-1, 0, 1]);
  })
  test('of equal values of positive pure decomal has even tick count', () => {
    expect(fn([0.8, 0.8], 4)).toEqual([0.7, 0.8, 0.9, 1]);
  })
  test('of equal values of positive unpure decomal has odd tick count', () => {
    expect(fn([5.2, 5.2], 3)).toEqual([4, 5, 6]);
  })
  test('of equal values of positive unpure decimals has odd tick count not allow decimals', () => {
    expect(fn([5.2, 5.2], 3, false)).toEqual([4, 5, 6]);
  });
  test('of equal values of positive unpure decomal has even tick count', () => {
    expect(fn([3.92, 3.92], 2)).toEqual([3, 4]);
  });

  test('of equal values of negative pure decomal has odd tick count', () => {
    expect(fn([-0.053, -0.053], 5)).toEqual([
      -0.08, -0.07, -0.06, -0.05, -0.04
    ]);
  });
  test('of equal values of negative pure decomal has odd tick count not allow decimals', () => {
    expect(fn([-0.053, -0.053], 5, false)).toEqual([-3, -2, -1, 0, 1]);
  });
  test('of equal values of negative pure decomal has even tick count', () => {
    expect(fn([-0.832, -0.832], 4)).toEqual([
      -1, -0.9, -0.8, -0.7
    ]);
  });
  test('of equal values of negative unpure decomal has odd tick count', () => {
    expect(fn([-5.2, -5.2], 3)).toEqual([-7, -6, -5]);
  });
  test('of equal values of negative unpure decomal has even tick count', () => {
    expect(fn([-3.92, -3.92], 2)).toEqual([-4, -3]);
  });

  test('of equal values of Infinity', () => {
    expect(fn([Infinity, Infinity], 5)).toEqual([
      Infinity, Infinity, Infinity, Infinity, Infinity
    ]);
  });
  test('of equal values of -Infinity', () => {
    expect(fn([-Infinity, -Infinity], 5)).toEqual([
      -Infinity, -Infinity, -Infinity, -Infinity, -Infinity
    ]);
  });

  test('of unequal values of positive integer', () => {
    expect(fn([1, 5], 5)).toEqual([1, 2, 3, 4, 5])
  });

  test('of unequal values of negative to positive integer & has odd ticks', () => {
    expect(fn([-5, 95], 7)).toEqual([
      -20, 0, 20, 40, 60, 80, 100
    ])
  });
  test('of unequal values of negative integerr', () => {
    expect(fn([-105, -25], 6)).toEqual([
      -120, -100, -80, -60, -40, -20
    ])
  });

  test('of unequal values of min is bigger than max & has odd ticks', () => {
    expect(fn([67, 5], 5)).toEqual([80, 60, 40, 20, 0])
  });
  test('of unequal values of min is bigger than max & has even ticks', () => {
    expect(fn([67, 5], 4)).toEqual([75, 50, 25, 0])
  });

  test('of unequal values of float [39.9156, 42.5401, 5]', () => {
    expect(fn([39.9156, 42.5401], 5)).toEqual([
      39.9, 40.6, 41.3, 42, 42.7
    ])
  });
  test('of unequal values of float [0.3885416666666666, 0.04444444444444451, 5]', () => {
    expect(fn([0.3885416666666666, 0.04444444444444451], 5)).toEqual([
      0.4, 0.3, 0.2, 0.1, 0
    ])
  });
  test('of unequal values of float [-4.10389, 0.59414, 7]', () => {
    expect(fn([-4.10389, 0.59414], 7)).toEqual([
      -4.25, -3.4, -2.55, -1.7, -0.85, 0, 0.85
    ])
  });
  test('of unequal values of float [-4.10389, 0.59414, 7] not allow decimals', () => {
    expect(fn([-4.10389, 0.59414], 7, false)).toEqual([
      -5, -4, -3, -2, -1, 0, 1
    ])
  });

  test('of unequal values of integers [0, 14, 5]', () => {
    expect(fn([0, 14], 5)).toEqual([0, 4, 8, 12, 16])
  });
  test('of unequal values of integers [0, 1, 5]', () => {
    expect(fn([0, 1], 5)).toEqual([0, 0.25, 0.5, 0.75, 1])
  })
  test('of unequal values of integers [0, 1e+100, 6]', () => {
    expect(fn([0, 1e+100], 6)).toEqual([
      0, 2e+99, 4e+99, 6e+99, 8e+99, 1e+100
    ])
  })

  test('of unequal values of Infinity values [-Infinity, Infinity, 5]', () => {
    expect(fn([-Infinity, Infinity], 5)).toEqual([
      -Infinity, Infinity, Infinity, Infinity, Infinity
    ])
  })
  test('of unequal values of Infinity values [-Infinity, 100, 5]', () => {
    expect(fn([-Infinity, 100], 5)).toEqual([
      -Infinity, -Infinity, -Infinity, -Infinity, 100
    ])
  })
  test('of unequal values of Infinity values [-100, Infinity, 5]', () => {
    expect(fn([-100, Infinity], 5)).toEqual([
      -100, Infinity, Infinity, Infinity, Infinity
    ])
  })

  test('of unequal values of very small values [0, 0.000013202017268238587, 5]', () => {
    expect(fn([0, 0.000013202017268238587], 5)).toEqual([
      0, 0.0000035, 0.000007, 0.0000105, 0.000014
    ])
  })
})
