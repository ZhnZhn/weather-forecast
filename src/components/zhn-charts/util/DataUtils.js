import {
  isArr,
  isNaN,
  isStr,
  isNumber
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
) => isStr(value) && value.indexOf('%') === value.length - 1

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

  let value;

  if (isPercent(percent)) {
    const index = percent.indexOf('%');
    value = (totalValue * parseFloat((percent).slice(0, index))) / 100;
  } else {
    value = +percent;
  }

  if (isNaN(value)) {
    value = defaultValue;
  }

  if (validate && value > totalValue) {
    value = totalValue;
  }

  return value;
}

export const getAnyElementOfObject = (obj) => {
  if (!obj) {
    return null;
  }

  const keys = _getObjectKeys(obj);
  if (keys && keys.length) {
    return obj[keys[0]];
  }

  return null;
}

export const hasDuplicate = (ary) => {
  if (!isArr(ary)) {
    return !1;
  }

  const len = ary.length
  , cache = {};

  for (let i = 0; i < len; i++) {
    if (!cache[ary[i]]) {
      cache[ary[i]] = !0;
    } else {
      return !0;
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
