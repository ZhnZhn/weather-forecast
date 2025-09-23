"use strict";

var _ChartUtils = require("../ChartUtils");
describe('calculateActiveTickIndex', () => {
  const fn = _ChartUtils.calculateActiveTickIndex,
    ticks = [{
      coordinate: 0,
      index: 0,
      value: 'a'
    }, {
      coordinate: 12,
      index: 1,
      value: 'b'
    }, {
      coordinate: 14,
      index: 2,
      value: 'c'
    }, {
      coordinate: 15,
      index: 3,
      value: 'd'
    }];
  it('should return correct tick index', () => {
    expect(fn(12, ticks, [], 'radiusAxis', [0, 100])).toBe(1);
  });
  it('should return nearest tick index', () => {
    expect(fn(-1, ticks, [], 'radiusAxis', [0, 100])).toBe(0);
    expect(fn(16, ticks, [], 'radiusAxis', [0, 100])).toBe(3);
  });
});
//# sourceMappingURL=ChartUtils.test.js.map