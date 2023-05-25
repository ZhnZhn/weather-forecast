"use strict";

var _getNiceTickValues = require("../getNiceTickValues");
describe("getTickValuesFixedDomain", function () {
  //fn([min, max], count, allowDecimals=true)
  var fn = _getNiceTickValues.getTickValuesFixedDomain;
  test('of unequal values of positive integer', function () {
    expect(fn([1, 7], 5)).toEqual([1, 3, 5, 7]);
  });
  test('of unequal values of negative to positive integer & has odd ticks', function () {
    expect(fn([-5, 95], 7)).toEqual([-5, 15, 35, 55, 75, 95]);
  });
  test('of unequal values of negative integerr', function () {
    expect(fn([-105, -25], 6)).toEqual([-105, -85, -65, -45, -25]);
  });
  test('of unequal values of min is bigger than max & has odd ticks', function () {
    expect(fn([67, 5], 5)).toEqual([67, 45, 25, 5]);
  });
  test('of unequal values of min is bigger than max & has even ticks', function () {
    expect(fn([67, 5], 4)).toEqual([67, 30, 5]);
  });
  test('of unequal values of float [-4.10389, 0.59414, 7]', function () {
    expect(fn([-4.10389, 0.59414], 7)).toEqual([-4.10389, -3.30389, -2.50389, -1.70389, -0.90389, 0.59414]);
  });
  test('of unequal values of float [-4.10389, 0.59414, 7] not allow decimals', function () {
    expect(fn([-4.10389, 0.59414], 7, false)).toEqual([-4.10389, -3.10389, -2.10389, -1.10389, 0.59414]);
  });
  test('of unequal values of integers [0, 14, 5]', function () {
    expect(fn([0, 14], 5)).toEqual([0, 4, 8, 14]);
  });
  test('of unequal values of integers [0, 1e+100, 6]', function () {
    expect(fn([0, 1e+100], 6)).toEqual([0, 2e+99, 4e+99, 6e+99, 8e+99, 1e+100]);
  });
  test('of unequal values of Infinity values [-Infinity, Infinity, 5]', function () {
    expect(fn([-Infinity, Infinity], 5)).toEqual([-Infinity, Infinity]);
  });
  test('of unequal values of Infinity values [-100, Infinity, 5]', function () {
    expect(fn([-100, Infinity], 5)).toEqual([-100, Infinity]);
  });
  test('of unequal values of Infinity values [-Infinity, 100, 5]', function () {
    expect(fn([-Infinity, 100], 5)).toEqual([-Infinity, 100]);
  });
  test('of equal values of positive integer', function () {
    expect(fn([1, 1], 5)).toEqual([1]);
  });
  test('of equal values of Infinity', function () {
    expect(fn([Infinity, Infinity], 5)).toEqual([Infinity, Infinity]);
  });
  test('of equal values of -Infinity', function () {
    expect(fn([-Infinity, -Infinity], 5)).toEqual([-Infinity, -Infinity]);
  });
});
//# sourceMappingURL=getTickValuesFixedDomain.test.js.map