import _isNumber from 'lodash/isNumber';

import {
  _isNaN,
  _isArr,
  _isStr,
  _isFn
} from './FnUtils';

const _getObjectKeys = Object.keys;
const _getByPropName = (
  obj,
  propName
) => obj && propName
  ? obj[propName]
  : void 0

export const mathSign = (
  value
) => value === 0
  ? 0
  : value > 0
     ? 1
     : -1


export const isPercent = (
  value
) => _isStr(value)
  && value.indexOf('%') === value.length - 1;

export const isNumber = (
  value
) => _isNumber(value) && !_isNaN(value);

export const isNumOrStr = (
  value
) => isNumber(value) || _isStr(value);

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
  validate = false
) => {
  if (!isNumber(percent) && !_isStr(percent)) {
    return defaultValue;
  }

  let value;

  if (isPercent(percent)) {
    const index = percent.indexOf('%');
    value = (totalValue * parseFloat((percent).slice(0, index))) / 100;
  } else {
    value = +percent;
  }

  if (_isNaN(value)) {
    value = defaultValue;
  }

  if (validate && value > totalValue) {
    value = totalValue;
  }

  return value;
};

export const getAnyElementOfObject = (obj) => {
  if (!obj) {
    return null;
  }

  const keys = _getObjectKeys(obj);
  if (keys && keys.length) {
    return obj[keys[0]];
  }

  return null;
};

export const hasDuplicate = (ary) => {
  if (!_isArr(ary)) {
    return false;
  }

  const len = ary.length
  , cache = {};

  for (let i = 0; i < len; i++) {
    if (!cache[ary[i]]) {
      cache[ary[i]] = true;
    } else {
      return true;
    }
  }

  return false;
};

export const interpolateNumber = (
  numberA,
  numberB
) => isNumber(numberA) && isNumber(numberB)
  ? (t) => numberA + t * (numberB - numberA)
  : () => numberB;

export const findEntryInArray = (
  arr,
  specifiedKey,
  specifiedValue
) => {
  if (!_isArr(arr) || !arr.length) {
    return null;
  }

  return arr.find(
    entry => entry
     && (_isFn(specifiedKey)
           ? specifiedKey(entry)
           : _getByPropName(entry, specifiedKey)
         ) === specifiedValue
  );
}
