export const _isArr = Array.isArray
export const _isFn = v => typeof v === 'function'
export const _isBool = v => typeof v === 'boolean'
export const _isStr = v => typeof v === 'string'

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
