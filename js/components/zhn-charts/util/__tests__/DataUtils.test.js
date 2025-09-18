"use strict";

var _DataUtils = require("../DataUtils");
describe('mathSign', () => {
  const fn = _DataUtils.mathSign;
  it('should return sign of number', () => {
    expect(fn(0)).toBe(0);
    expect(fn(-0)).toBe(0);
    expect(fn(100)).toBe(1);
    expect(fn(-100)).toBe(-1);
  });
});
describe('isPercent', () => {
  const fn = _DataUtils.isPercent;
  it('should return boolean is string correct percent value', () => {
    expect(fn('0%')).toBe(true);
    expect(fn('10%')).toBe(true);
    expect(fn('0')).toBe(false);
    expect(fn('%')).toBe(true);
    expect(fn('%%')).toBe(false);
    expect(fn('0%%')).toBe(false);
  });
});
describe('uniqueId', () => {
  const fn = _DataUtils.uniqueId;
  test('should return unique ID independent of prefix', () => {
    expect(fn()).toEqual('1');
    expect(fn()).toEqual('2');
    expect(fn('')).toEqual('3');
    expect(fn('prefix')).toEqual('prefix4');
    expect(fn()).toEqual('5');
  });
});
describe('getPercentValue', () => {
  const fn = _DataUtils.getPercentValue;
  it('getPercentValue("25%", 1) should return 0.25 ', () => {
    expect(fn('25%', 1)).toBe(0.25);
  });
  it('getPercentValue("25%", "a") should return 0 ', () => {
    expect(fn('25%', 'a')).toBe(0);
  });
  it('getPercentValue(1)) should return 1', () => {
    expect(fn(1, void 0)).toBe(1);
  });
  it('getPercentValue("120%", 100)) should return 120', () => {
    expect(fn('120%', 100)).toBe(120);
  });
  it('getPercentValue("120%", 100, 0, true)) should return 100', () => {
    expect(fn('120%', 100, 0, true)).toBe(100);
  });
  it('should return defaultValue if percent is neither number not string', () => {
    expect(fn(false, 0, 5)).toEqual(5);
  });
});
describe('hasDuplicate', () => {
  const fn = _DataUtils.hasDuplicate;
  it('of an object should return false when input value is not an array', () => {
    expect(fn({})).toBe(false);
  });
  it('of [12, 12] should return true', () => {
    expect(fn([12, 12])).toBe(true);
  });
  it('["12", 12] should return true due to implicit cast', () => {
    expect(fn(['12', 12])).toBe(true);
  });
  it('[1, 12] should return false', () => {
    expect(fn([1, 12])).toBe(false);
  });
});
describe('interpolateNumber', () => {
  const fn = _DataUtils.interpolateNumber;
  it('should always return a function', () => {
    expect(typeof fn(10, 10)).toBe('function');
  });
  it('should provide interpolator function between two number', () => {
    const _interpolateFn = fn(0, 10);
    expect(_interpolateFn(0.1)).toBe(1);
    expect(_interpolateFn(0.2)).toBe(2);
  });
  it("should provide interpolator function that returns second value if first value isn't a number", () => {
    const _interpolateFn = fn(null, 10);
    expect(_interpolateFn(1)).toBe(10);
    expect(_interpolateFn(2)).toBe(10);
  });
});
describe('getInterpolatedNumber', () => {
  const fn = _DataUtils.getInterpolatedNumber;
  it('should return a number when called with two numbers', () => {
    expect(fn(10, 20, 0.5)).toBe(15);
    expect(fn(10, 20, 0)).toBe(10);
    expect(fn(10, 20, 1)).toBe(20);
    expect(fn(10, 20, 0.25)).toBe(12.5);
    expect(fn(10, 20, 0.75)).toBe(17.5);
    expect(fn(10, 20, 0.1)).toBe(11);
    expect(fn(20, 620, 0.8)).toBe(500);
  });
  it('should return second number if the first is null', () => {
    expect(fn(null, 20, 0.5)).toBe(20);
    expect(fn(null, 20, 0.3)).toBe(20);
    expect(fn(null, 20, 0.9)).toBe(20);
  });
  it('should return null if second number is null', () => {
    expect(fn(10, null, 0.5)).toBeNull();
    expect(fn(null, null, 0.5)).toBeNull();
  });
});
describe('findEntryInArray', () => {
  const fn = _DataUtils.findEntryInArray,
    dataList = [{
      name: 'a',
      a: {
        b: '0'
      }
    }, {
      name: 'b',
      a: {
        b: '1'
      }
    }, {
      name: 'c',
      a: {
        b: '2'
      }
    }];
  it('should work with string key', () => {
    expect(fn(dataList, 'name', 'a')).toStrictEqual(dataList[0]);
  });
  it('should work with string keypath', () => {
    expect(fn(dataList, 'a.b', '1')).toStrictEqual(dataList[1]);
  });
  it('should work with simple function', () => {
    expect(fn(dataList, v => v.a.b, '2')).toStrictEqual(dataList[2]);
  });
  it('should return undefined if first argument is null or undefined or empty array', () => {
    expect(fn(null, 0, '0')).toEqual();
    expect(fn(void 0, 0, '0')).toEqual();
    expect(fn([], 0, '0')).toEqual();
  });
});
//# sourceMappingURL=DataUtils.test.js.map