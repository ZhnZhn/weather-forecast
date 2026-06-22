"use strict";

var _arrFn = require("../arrFn");
describe('getByIndexAndProp', () => {
  const fn = _arrFn.getByIndexAndProp;
  test('should safe get from array by index and prop name or default value', () => {
    expect(fn([{
      a: 1
    }], 0, 'a', 10)).toBe(1);
    expect(fn('', 0, 'a', 10)).toBe(10);
    expect(fn(void 0, 0, 'a', 10)).toBe(10);
    expect(fn(null, 0, 'a', 10)).toBe(10);
    expect(fn([], 0, 'a', 10)).toBe(10);
    expect(fn([{}], 0, 'a', 10)).toBe(10);
    expect(fn([{
      b: 1
    }], 0, 'a', 10)).toBe(10);
    expect(fn([{
      a: 1
    }], 1, 'a', 10)).toBe(10);
    expect(fn([{
      a: 1
    }], 0, 'b', 10)).toBe(10);
  });
});
describe('joinByCollon2', () => {
  const fn = _arrFn.joinByCollon2;
  test('should return string with joined by colon tokens', () => {
    expect(fn('a', 'b')).toBe('a: b');
    expect(fn('', 'b')).toBe('b');
    expect(fn('a', '')).toBe('a');
    expect(fn(void 0, 'b')).toBe('b');
    expect(fn('a', void 0)).toBe('a');
    expect(fn(null, 'b')).toBe('b');
    expect(fn('a', null)).toBe('a');
  });
});
//# sourceMappingURL=arrFn.test.js.map