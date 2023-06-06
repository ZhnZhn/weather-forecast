"use strict";

exports.__esModule = true;
exports.assertPathEqual = assertPathEqual;
var reNumber = /[-+]?(?:\d+\.\d+|\d+\.|\.\d+|\d+)(?:[eE][-]?\d+)?/g;
function formatNumber(s) {
  return Math.abs((s = +s) - Math.round(s)) < 1e-6 ? Math.round(s) : s.toFixed(6);
}
function normalizePath(path) {
  return path.replace(reNumber, formatNumber);
}
function assertPathEqual(actual, expected) {
  expect(normalizePath(actual + "")).toBe(normalizePath(expected + ""));
}
describe('d3Path', function () {
  test('d3Path helper functions', function () {
    expect(true).toBe(true);
  });
});
//# sourceMappingURL=asserts.test.js.map