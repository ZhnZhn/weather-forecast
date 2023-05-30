"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _decimalLight = _interopRequireDefault(require("../decimalLight"));
var _testIsint = function _testIsint(strOrNumber, expected) {
  var decimalValue = new _decimalLight["default"](strOrNumber);
  expect(decimalValue.isint()).toBe(expected);
};
describe('decimal light isint', function () {
  test('should return boolean isint', function () {
    _decimalLight["default"].precision = 20;
    _decimalLight["default"].rounding = 4;
    _decimalLight["default"].toExpNeg = -7;
    _decimalLight["default"].toExpPos = 21;
    _testIsint(1, true);
    _testIsint('-0.1', false);
    _testIsint('0.0000000', true);
    _testIsint(-0, true);
    _testIsint('-1.234e+2', false);
    _testIsint('5e-200', false);
    _testIsint('1.0000000000000000000001', false);
    _testIsint('0.999999999999999999999', false);
    _testIsint('4e4', true);
    _testIsint('-4e4', true);
  });
});
//# sourceMappingURL=isint.test.js.map