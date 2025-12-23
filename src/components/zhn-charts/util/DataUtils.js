import {
  isArr,
  isNaN,
  isStr,
  isNumber,
  isObj
} from '../../../utils/isTypeFn';

export {
  isNumber,
  isPositiveNumber,
  isNumOrStr
} from '../../../utils/isTypeFn';

const _getObjectKeys = Object.keys;

export const mathAbs = Math.abs

export const mathSign = (
  value
) => value === 0
  ? 0
  : value > 0
  ? 1
  : -1

export const isPercent = (
  value
) => isStr(value)
  && value.indexOf('%') === value.length - 1

let idCounter = 0;
export const uniqueId = (
  prefix
) => {
  const id = ++idCounter;
  return `${prefix || ''}${id}`;
};

/**
 * Get percent value of a total value
 * @param {number|string} percent A percent
 * @param {number} totalValue     Total value
 * @param {number} defaultValue   The value returned when percent is undefined or invalid
 * @param {boolean} validate      If set to be true, the result will be validated
 * @return {number} value
 */
export const getPercentValue = (
  percent,
  totalValue,
  defaultValue = 0,
  validate = !1
) => {
  if (!isNumber(percent) && !isStr(percent)) {
    return defaultValue;
  }

  const value = isPercent(percent)
    ? (totalValue * parseFloat(percent.slice(0, percent.indexOf('%')))) / 100
    : +percent;

  return isNaN(value)
    ? defaultValue
    : validate && value > totalValue
    ? totalValue
    : value;
}

export const getAnyElementOfObject = (obj) => {
  if (!isObj(obj)) {
    return null;
  }

  const keys = _getObjectKeys(obj);
  return keys.length
    ? obj[keys[0]]
    : null;
}

export const hasDuplicate = (arr) => {
  if (!isArr(arr)) {
    return !1;
  }

  const cache = Object.create(null);
  for (let token of arr) {
    if (cache[token]) {
      return !0;
    } else {
      cache[token] = !0;
    }
  }

  return !1;
}

export const interpolateNumber = (
  numberA,
  numberB
) => isNumber(numberA) && isNumber(numberB)
  ? (t) => numberA + t * (numberB - numberA)
  : () => numberB

export const getInterpolatedNumber = (
  fromNumber,
  toNumber,
  t
) => isNumber(fromNumber) && isNumber(toNumber)
  ? interpolateNumber(fromNumber, toNumber)(t)
  : toNumber
