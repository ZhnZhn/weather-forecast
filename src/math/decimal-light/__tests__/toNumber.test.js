import Decimal from '../decimalLight';

const _testToNumber = (
  n,
  expected
) => {
  expect(new Decimal(n)
   .toNumber()
 ).toBe(expected);
}

describe('decimal light toNumber', () => {
  test('should return number', function () {
    Decimal.precision = 20
    Decimal.rounding = 4
    Decimal.toExpNeg = -7
    Decimal.toExpPos = 21

    _testToNumber(1, 1);
    _testToNumber('1', 1);
    _testToNumber('1.0', 1);
    _testToNumber('1e+0', 1);
    _testToNumber('1e-0', 1);

    _testToNumber(-1, -1);
    _testToNumber('-1', -1);
    _testToNumber('-1.0', -1);
    _testToNumber('-1e+0', -1);
    _testToNumber('-1e-0', -1);

    _testToNumber('123.456789876543', 123.456789876543);
    _testToNumber('-123.456789876543', -123.456789876543);

    _testToNumber('1.1102230246251565e-16', 1.1102230246251565e-16);
    _testToNumber('-1.1102230246251565e-16', -1.1102230246251565e-16);

    _testToNumber('9007199254740991', 9007199254740991);
    _testToNumber('-9007199254740991', -9007199254740991);

    _testToNumber('5e-324', 5e-324);
    _testToNumber('1.7976931348623157e+308', 1.7976931348623157e+308);

    _testToNumber('9.999999e+9000000000000000', 1 / 0);
    _testToNumber('-9.999999e+9000000000000000', -1 / 0);
    _testToNumber('1e-9000000000000000', 0);
    _testToNumber('-1e-9000000000000000', -0);
  });
});
