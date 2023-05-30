"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _decimalLight = _interopRequireDefault(require("../decimalLight"));
var _testLt = function _testLt(a, b, expected) {
  var decimalValue = new _decimalLight["default"](a);
  expect(decimalValue.lt(b)).toBe(expected);
};
var _testLte = function _testLte(a, b, expected) {
  var decimalValue = new _decimalLight["default"](a);
  expect(decimalValue.lte(b)).toBe(expected);
};
describe('decimal light lt, lte', function () {
  test('should return boolean value from lt, lte', function () {
    _testLt('0.0000000', 0.0001, true);
    _testLte('0.0000000', -0, true);
    _testLt(1, 1.001, true);
    _testLte(1, 2, true);
    _testLt('-0.1', -0.01, true);
    _testLte('-0.1', -1, false);
    _testLt(-0, 0, false);
    _testLt(-0, 0.1, true);
    _testLte(-0, 0, true);
    _testLt('5e-200', 6e-200, true);
    _testLte('5e-200', 5.1e-200, true);
    _testLt('-1.234e+2', -123.39999, true);
    _testLte('-1.234e+2', '-123.4e+0', true);
    _testLt(10, 10, false);
    _testLt(10, 2, false);
    _testLte(10, 20, true);
    _testLt(1.23001e-2, 1.23e-2, false);
    _testLt(1e-2, 9.999999e-3, false);
    _testLt(1.23001e+2, 1.23e+2, false);
    _testLt(9.999999e+2, 1e+3, true);
    _testLte(1.23001e-2, 1.23e-2, false);
    _testLte(1e-2, 9.999999e-3, false);
    _testLte(1.23001e+2, 1.23e+2, false);
    _testLte(9.999999e+2, 1e+3, true);
    _testLt(1.23e-2, 1.23001e-2, true);
    _testLt(9.999999e-3, 1e-2, true);
    _testLt(1.23e+2, 1.23001e+2, true);
    _testLt(1e+3, 9.9999999e+2, false);
    _testLte(1.23e-2, 1.23001e-2, true);
    _testLte(9.999999e-3, 1e-2, true);
    _testLte(1.23e+2, 1.23001e+2, true);
    _testLte(1e+3, 9.9999999e+2, false);
  });
});
//# sourceMappingURL=lt.test.js.map