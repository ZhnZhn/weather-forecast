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
