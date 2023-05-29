import {
  getDigitCount,
  rangeStep,
  getByPow10
} from '../arithmetic';

describe('getDigitCount', ()=>{
  const fn = getDigitCount;
  test('should return count of digit',()=>{
    expect(fn(1289)).toBe(4)
    expect(fn(0.0912)).toBe(-1)
    expect(fn(0)).toBe(1)
    expect(fn(1.1e+21)).toBe(22)
    expect(fn(1.1e-21)).toBe(-20)
    expect(fn(12345.67)).toBe(5)
    expect(fn(-12345.67)).toBe(5)
    expect(fn(-0.0000007)).toBe(-6)
  })
})

describe('rangeStep',()=>{
  const fn = rangeStep
  test('should return right step', () => {
    //fn(start, end, step)
    //integer case
    expect(fn(14, 20, 3)).toEqual([14, 17])
    //float case
    expect(fn(0.1, 0.85, 0.1)).toEqual([
      0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8
    ])
    //small float case
    expect(fn(0, 0.0000035000000000000004, 3.5000000000000004e-7)).toEqual([
      0,
      3.5000000000000004e-7,
      7.000000000000001e-7,
      0.0000010500000000000001,
      0.0000014000000000000001,
      0.0000017500000000000002,
      0.0000021000000000000002,
      0.0000024500000000000003,
      0.0000028000000000000003,
      0.0000031500000000000003
    ])
    //integer start case
    expect(fn(1, 2, 0.1)).toEqual([
      1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9
    ])

  })
})

describe('getByPow10',()=>{
  const fn = getByPow10;
  test('should return number 10 pow by',()=>{
    expect(fn(0)).toBe(1)
    expect(fn(1)).toBe(10)
    expect(fn(-1)).toBe(0.1)
    expect(fn(-4)).toBe(0.0001)
    expect(fn(-5)).toBe(0.00001)
  })
})
