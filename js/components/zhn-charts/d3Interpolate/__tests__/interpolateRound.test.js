"use strict";

var _index = require("../index");
describe('interpolateRound', function () {
  var fn = _index.interpolateRound;
  it("interpolateRound(a, b) interpolates between two numbers a and b, and then rounds", function () {
    var i = fn(10, 42);
    expect(i(0.0)).toBe(10);
    expect(i(0.1)).toBe(13);
    expect(i(0.2)).toBe(16);
    expect(i(0.3)).toBe(20);
    expect(i(0.4)).toBe(23);
    expect(i(0.5)).toBe(26);
    expect(i(0.6)).toBe(29);
    expect(i(0.7)).toBe(32);
    expect(i(0.8)).toBe(36);
    expect(i(0.9)).toBe(39);
    expect(i(1.0)).toBe(42);
  });
  it("interpolateRound(a, b) does not pre-round a and b", function () {
    var i = fn(2.6, 3.6);
    expect(i(0.6)).toBe(3);
  });
  it("interpolateRound(a, b) gives exact ends for t=0 and t=1", function () {
    var a = 2e+42,
      b = 335;
    expect(fn(a, b)(1)).toBe(b);
    expect(fn(a, b)(0)).toBe(a);
  });
});
//# sourceMappingURL=interpolateRound.test.js.map