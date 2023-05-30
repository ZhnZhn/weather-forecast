import Decimal from '../decimalLight';

const _testIsint = (
  strOrNumber,
  expected
) => {
  const decimalValue = new Decimal(strOrNumber)
  expect(decimalValue.isint()).toBe(expected)
}

describe('decimal light isint', ()=>{
  test('should return boolean isint', ()=>{
    Decimal.precision = 20;
    Decimal.rounding = 4;
    Decimal.toExpNeg = -7;
    Decimal.toExpPos = 21;

    _testIsint(1, true)
    _testIsint('-0.1', false)
    _testIsint('0.0000000', true)
    _testIsint(-0, true)
    _testIsint('-1.234e+2', false)
    _testIsint('5e-200', false)
    _testIsint('1.0000000000000000000001', false)
    _testIsint('0.999999999999999999999', false)
    _testIsint('4e4', true)
    _testIsint('-4e4', true)
  })
})
