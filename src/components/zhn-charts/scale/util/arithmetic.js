import Decimal from 'decimal.js-light';

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
