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
