import {
  isStr,
  isUndef
} from '../../../utils/isTypeFn';
import throttleFn from '../../../utils/throttleFn';
export const _throttle = throttleFn;

export const _upperFirst = (
  str
) => isStr(str) && str.length > 0
  ? str[0].toUpperCase() + str.slice(1)
  : '';

export const _getByPropName = (
  obj,
  propName,
  dfValue
) => obj && propName
   ? obj[propName] || dfValue
   : dfValue

export const _range = (
  startValue,
  endValue,
  increment
) => {
  const isEndDef = !isUndef(endValue)
  endValue = isEndDef ? endValue : startValue
  startValue = isEndDef ? startValue : 0
  const _diff = endValue - startValue

  if (isUndef(increment)) {
    increment = Math.sign(_diff)
  }

  const length = Math.abs(_diff / (increment || 1))

  const { result } = Array.from({ length })
   .reduce(
     ({ result, current }) => ({
       result: [...result, current],
       current: current + increment
     }),
     { current: startValue, result: [] }
  )

  return result;
}

export const _min = (
  arr
) => arr && arr.length
  ? Math.min(...arr)
  : void 0;

export const _max = (
  arr
) => arr && arr.length
  ? Math.max(...arr)
  : void 0;

export const _uniqBy = (
  arr,
  iteratee
) => {
  if (isStr(iteratee)) {
    const prop = iteratee
    iteratee = item => item[prop]
  }

  return arr.filter(
    (x, i, arrSelf) => i === arrSelf.findIndex(y => iteratee(x) === iteratee(y))
  )
}

const _getObjectKeys = Object.keys;
export const _isEqual = (
  first,
  second
) => {
  if (first === second) {
    return true;
  }
  if ((first === undefined || second === undefined || first === null || second === null)
    && (first || second)) {
    return false;
  }
  const firstType = first?.constructor.name;
  const secondType = second?.constructor.name;
  if (firstType !== secondType) {
    return false;
  }
  if (firstType === 'Array') {
    if (first.length !== second.length) {
      return false;
    }
    let equal = true;
    for (let i = 0; i < first.length; i++) {
      if (!_isEqual(first[i], second[i])) {
        equal = false;
        break;
      }
    }
    return equal;
  }
  if (firstType === 'Object') {
    let equal = true;
    const fKeys = _getObjectKeys(first);
    const sKeys = _getObjectKeys(second);
    if (fKeys.length !== sKeys.length) {
      return false;
    }
    for (let i = 0; i < fKeys.length; i++) {
      if (first[fKeys[i]] && second[fKeys[i]]) {
        if (first[fKeys[i]] === second[fKeys[i]]) {
          continue; // eslint-disable-line
        }
        if (first[fKeys[i]] && (first[fKeys[i]].constructor.name === 'Array'
          || first[fKeys[i]].constructor.name === 'Object')) {
          equal = _isEqual(first[fKeys[i]], second[fKeys[i]]);
          if (!equal) {
            break;
          }
        } else if (first[fKeys[i]] !== second[fKeys[i]]) {
          equal = false;
          break;
        }
      } else if ((first[fKeys[i]] && !second[fKeys[i]]) || (!first[fKeys[i]] && second[fKeys[i]])) {
        equal = false;
        break;
      }
    }
    return equal;
  }
  return first === second;
}
