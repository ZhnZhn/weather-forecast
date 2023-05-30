import Decimal from '../../../../math/decimal-light/decimalLight';

/**
 *
 * [0.1, 1), 0
 * [0.01, 0.1), -1
 * [0.001, 0.01), -2
 *
 * @param  {Number} value
 * @return {Integer}
 */
const _mathAbs = Math.abs
, _mathLog = Math.log
, _mathFloor = Math.floor
, _mathPow = Math.pow
, LOG_10 = _mathLog(10);
export const getDigitCount = (
  value
) => value === 0
  ? 1
  : _mathFloor(
      _mathLog(_mathAbs(value)) / LOG_10
    ) + 1


/**
 *
 * @param  {Decimal} start
 * @param  {Decimal} end
 * @param  {Decimal} step
 * @return {Array}
 */
export const rangeStep = (
  start,
  end,
  step
) => {
  const result = [];
  let num = new Decimal(start)
  , i = 0;
  // magic number to prevent infinite loop
  while (num.lt(end) && i < 100000) {
    result.push(num.toNumber());

    num = num.add(step);
    i++;
  }

  return result;
}


//new Decimal(10).pow(digitCount)
/**
 *
 * @param  {number} n
 * @return {number}
 */
export const getByPow10 = (
  n
) => {
  if (n >= 0) return _mathPow(10, n);

  const _absN = _mathAbs(n);
  let str = '0.';
  for(let i=1; i<_absN; i++) {
    str = str + '0'
  }
  str = str + '1'
  return Decimal(str).toNumber();
}
