"use strict";

var _d3Array = require("../d3Array");
describe('d3Scale tickStep', function () {
  var fn = _d3Array.tickStep;
  it("tickStep(start, stop, count) returns NaN if any argument is NaN", function () {
    expect(fn(NaN, 1, 1)).toBe(NaN);
    expect(fn(0, NaN, 1)).toBe(NaN);
    expect(fn(0, 1, NaN)).toBe(NaN);
    expect(fn(NaN, NaN, 1)).toBe(NaN);
    expect(fn(0, NaN, NaN)).toBe(NaN);
    expect(fn(NaN, 1, NaN)).toBe(NaN);
    expect(fn(NaN, NaN, NaN)).toBe(NaN);
  });
  it("tickStep(start, stop, count) returns NaN or 0 if start === stop", function () {
    expect(fn(1, 1, -1)).toBe(NaN);
    expect(fn(1, 1, 0)).toBe(NaN);
    expect(fn(1, 1, NaN)).toBe(NaN);
    expect(fn(1, 1, 1)).toBe(0);
    expect(fn(1, 1, 10)).toBe(0);
  });
  it("tickStep(start, stop, count) returns 0 or Infinity if count is not positive", function () {
    expect(fn(0, 1, -1)).toBe(Infinity);
    expect(fn(0, 1, 0)).toBe(Infinity);
  });
  it("tickStep(start, stop, count) returns 0 if count is infinity", function () {
    expect(fn(0, 1, Infinity)).toBe(0);
  });
  it("tickStep(start, stop, count) returns approximately count + 1 tickStep when start < stop", function () {
    expect(fn(0, 1, 10)).toBe(0.1);
    expect(fn(0, 1, 9)).toBe(0.1);
    expect(fn(0, 1, 8)).toBe(0.1);
    expect(fn(0, 1, 7)).toBe(0.2);
    expect(fn(0, 1, 6)).toBe(0.2);
    expect(fn(0, 1, 5)).toBe(0.2);
    expect(fn(0, 1, 4)).toBe(0.2);
    expect(fn(0, 1, 3)).toBe(0.5);
    expect(fn(0, 1, 2)).toBe(0.5);
    expect(fn(0, 1, 1)).toBe(1.0);
    expect(fn(0, 10, 10)).toBe(1);
    expect(fn(0, 10, 9)).toBe(1);
    expect(fn(0, 10, 8)).toBe(1);
    expect(fn(0, 10, 7)).toBe(2);
    expect(fn(0, 10, 6)).toBe(2);
    expect(fn(0, 10, 5)).toBe(2);
    expect(fn(0, 10, 4)).toBe(2);
    expect(fn(0, 10, 3)).toBe(5);
    expect(fn(0, 10, 2)).toBe(5);
    expect(fn(0, 10, 1)).toBe(10);
    expect(fn(-10, 10, 10)).toBe(2);
    expect(fn(-10, 10, 9)).toBe(2);
    expect(fn(-10, 10, 8)).toBe(2);
    expect(fn(-10, 10, 7)).toBe(2);
    expect(fn(-10, 10, 6)).toBe(5);
    expect(fn(-10, 10, 5)).toBe(5);
    expect(fn(-10, 10, 4)).toBe(5);
    expect(fn(-10, 10, 3)).toBe(5);
    expect(fn(-10, 10, 2)).toBe(10);
    expect(fn(-10, 10, 1)).toBe(20);
  });
  it("tickStep(start, stop, count) returns -tickStep(stop, start, count)", function () {
    expect(fn(0, 1, 10)).toBe(-(0, _d3Array.tickStep)(1, 0, 10));
    expect(fn(0, 1, 9)).toBe(-(0, _d3Array.tickStep)(1, 0, 9));
    expect(fn(0, 1, 8)).toBe(-(0, _d3Array.tickStep)(1, 0, 8));
    expect(fn(0, 1, 7)).toBe(-(0, _d3Array.tickStep)(1, 0, 7));
    expect(fn(0, 1, 6)).toBe(-(0, _d3Array.tickStep)(1, 0, 6));
    expect(fn(0, 1, 5)).toBe(-(0, _d3Array.tickStep)(1, 0, 5));
    expect(fn(0, 1, 4)).toBe(-(0, _d3Array.tickStep)(1, 0, 4));
    expect(fn(0, 1, 3)).toBe(-(0, _d3Array.tickStep)(1, 0, 3));
    expect(fn(0, 1, 2)).toBe(-(0, _d3Array.tickStep)(1, 0, 2));
    expect(fn(0, 1, 1)).toBe(-(0, _d3Array.tickStep)(1, 0, 1));
    expect(fn(0, 10, 10)).toBe(-(0, _d3Array.tickStep)(10, 0, 10));
    expect(fn(0, 10, 9)).toBe(-(0, _d3Array.tickStep)(10, 0, 9));
    expect(fn(0, 10, 8)).toBe(-(0, _d3Array.tickStep)(10, 0, 8));
    expect(fn(0, 10, 7)).toBe(-(0, _d3Array.tickStep)(10, 0, 7));
    expect(fn(0, 10, 6)).toBe(-(0, _d3Array.tickStep)(10, 0, 6));
    expect(fn(0, 10, 5)).toBe(-(0, _d3Array.tickStep)(10, 0, 5));
    expect(fn(0, 10, 4)).toBe(-(0, _d3Array.tickStep)(10, 0, 4));
    expect(fn(0, 10, 3)).toBe(-(0, _d3Array.tickStep)(10, 0, 3));
    expect(fn(0, 10, 2)).toBe(-(0, _d3Array.tickStep)(10, 0, 2));
    expect(fn(0, 10, 1)).toBe(-(0, _d3Array.tickStep)(10, 0, 1));
    expect(fn(-10, 10, 10)).toBe(-(0, _d3Array.tickStep)(10, -10, 10));
    expect(fn(-10, 10, 9)).toBe(-(0, _d3Array.tickStep)(10, -10, 9));
    expect(fn(-10, 10, 8)).toBe(-(0, _d3Array.tickStep)(10, -10, 8));
    expect(fn(-10, 10, 7)).toBe(-(0, _d3Array.tickStep)(10, -10, 7));
    expect(fn(-10, 10, 6)).toBe(-(0, _d3Array.tickStep)(10, -10, 6));
    expect(fn(-10, 10, 5)).toBe(-(0, _d3Array.tickStep)(10, -10, 5));
    expect(fn(-10, 10, 4)).toBe(-(0, _d3Array.tickStep)(10, -10, 4));
    expect(fn(-10, 10, 3)).toBe(-(0, _d3Array.tickStep)(10, -10, 3));
    expect(fn(-10, 10, 2)).toBe(-(0, _d3Array.tickStep)(10, -10, 2));
    expect(fn(-10, 10, 1)).toBe(-(0, _d3Array.tickStep)(10, -10, 1));
  });
});
//# sourceMappingURL=d3Array-tickStep.test.js.map