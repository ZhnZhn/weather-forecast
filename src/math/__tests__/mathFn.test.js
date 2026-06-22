import {
  roundSafeByOneDigitsOrEmpty
} from '../mathFn';

describe('roundSafeByOneDigitsOrEmpty', ()=>{
  const fn = roundSafeByOneDigitsOrEmpty;
  test('should round number by two digits', ()=>{
    expect(fn(4.14)).toBe(4.1)
    expect(fn(5.15)).toBe(5.2)

    expect(fn(-4.14)).toBe(-4.1)
    expect(fn(-5.15)).toBe(-5.2)
  })
  test('should return empty string in edge cases', ()=>{
    expect(fn()).toBe('')
    expect(fn(null)).toBe('')
    expect(fn('str')).toBe('')
    expect(fn(true)).toBe('')
    expect(fn(false)).toBe('')
  })
})
