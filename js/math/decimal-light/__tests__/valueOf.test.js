"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _decimalLight = _interopRequireDefault(require("../decimalLight"));
var _testValueOf = function _testValueOf(strOrNumber, expected) {
  expect(new _decimalLight["default"](strOrNumber).valueOf()).toBe(expected);
};
describe('decimal light valueOf', function () {
  test('should return str value result from valueOf', function () {
    _decimalLight["default"].precision = 20;
    _decimalLight["default"].rounding = 4;
    _decimalLight["default"].toExpNeg = -9e15;
    _decimalLight["default"].toExpPos = 9e15;
    _testValueOf(0, '0');
    _testValueOf('0', '0');
    _testValueOf(1, '1');
    _testValueOf(9, '9');
    _testValueOf(90, '90');
    _testValueOf(90.12, '90.12');
    _testValueOf(0.1, '0.1');
    _testValueOf(0.01, '0.01');
    _testValueOf(0.0123, '0.0123');
    _testValueOf('111111111111111111111', '111111111111111111111');
    _testValueOf('1111111111111111111111', '1111111111111111111111');
    _testValueOf('11111111111111111111111', '11111111111111111111111');
    _testValueOf(0.00001, '0.00001');
    _testValueOf(0.000001, '0.000001');
    _testValueOf(-0, '0');
    _testValueOf('-0', '0');
    _testValueOf(-1, '-1');
    _testValueOf(-9, '-9');
    _testValueOf(-90, '-90');
    _testValueOf(-90.12, '-90.12');
    _testValueOf(-0.1, '-0.1');
    _testValueOf(-0.01, '-0.01');
    _testValueOf(-0.0123, '-0.0123');
    _testValueOf('-111111111111111111111', '-111111111111111111111');
    _testValueOf('-1111111111111111111111', '-1111111111111111111111');
    _testValueOf('-11111111111111111111111', '-11111111111111111111111');
    _testValueOf(-0.00001, '-0.00001');
    _testValueOf(-0.000001, '-0.000001');

    // Exponential format
    _decimalLight["default"].toExpNeg = _decimalLight["default"].toExpPos = 0;
    _testValueOf(0.0000001, '1e-7');
    _testValueOf(0.000000123, '1.23e-7');
    _testValueOf(0.000000012, '1.2e-8');
    _testValueOf(-0.0000001, '-1e-7');
    _testValueOf(-0.000000123, '-1.23e-7');
    _testValueOf(-0.000000012, '-1.2e-8');
    _testValueOf(0.00000001, '1e-8');
    _testValueOf(0.000000012, '1.2e-8');
    _testValueOf(0.0000000123, '1.23e-8');
    _testValueOf(-0.00000001, '-1e-8');
    _testValueOf(-0.000000012, '-1.2e-8');
    _testValueOf(-0.0000000123, '-1.23e-8');
    _testValueOf('573447902457635.174479825134', '5.73447902457635174479825134e+14');
    _testValueOf('10.7688', '1.07688e+1');
    _testValueOf('3171194102379077141557759899.307946350455841', '3.171194102379077141557759899307946350455841e+27');
    _testValueOf('49243534668981911776986533197425948906.34579', '4.924353466898191177698653319742594890634579e+37');
    _testValueOf('6855582439265693973.28633907445409866949445343654692955', '6.85558243926569397328633907445409866949445343654692955e+18');
    _testValueOf('1', '1e+0');
  });
});
//# sourceMappingURL=valueOf.test.js.map