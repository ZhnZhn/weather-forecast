export const _isArr = Array.isArray
export const _isFn = v => typeof v === 'function'
export const _isBool = v => typeof v === 'boolean'
export const _isStr = v => typeof v === 'string'
export const _isNumber = v => typeof v === 'number'

export const _isNil = v => v == null
export const _isNaN = Number.isNaN

export const _isObject = (
  value
) => {
  const type = typeof value;
  return value != null
    && (type === 'object' || type === 'function');
}

export const _upperFirst = (
  str
) => _isStr(str) && str.length > 0
  ? str[0].toUpperCase() + str.slice(1)
  : '';

export const _getByPropName = (
  obj,
  propName,
  dfValue
) => obj && propName
   ? obj[propName] || dfValue
   : dfValue

const _isUndef = v => typeof v === 'undefined';
export const _range = (
  startValue,
  endValue,
  increment
) => {
  const isEndDef = !_isUndef(endValue)
  endValue = isEndDef ? endValue : startValue
  startValue = isEndDef ? startValue : 0
  const _diff = endValue - startValue

  if (_isUndef(increment)) {
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

const _isSymbol = v => typeof v === 'symbol';
const _findExtremum = (
  arr,
  iteratee,
  comparator
) => {
  let index = -1
  , length = arr.length
  , computed
  , result;

  while (++index < length) {
    let value = arr[index]
    , current = iteratee(value);
    if (current != null && (computed === void 0
      ? (current === current && !_isSymbol(current))
      : comparator(current, computed)
    )) {
      computed = current
      result = value
    }
  }
  return result;
}

const _identity = (v) => v;
const _baseLt = (
  valueA,
  valueB
) => valueA < valueB;
const _baseGt = (
  valueA,
  valueB
) => valueA > valueB;

export const _min = (
  arr
) => arr && arr.length
  ? _findExtremum(arr, _identity, _baseLt)
  : void 0;

export const _max = (
  arr
) => arr && arr.length
  ? _findExtremum(arr, _identity, _baseGt)
  : void 0;

export const _uniqBy = (
  arr,
  iteratee
) => {
  if (_isStr(iteratee)) {
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
