
export const isArr = Array.isArray
export const isNotEmptyArr = (
  arr
) => isArr(arr) && arr.length > 0

export const isNullOrUndef = v => v == null

export const isObj = v => v !== null
  && typeof v === 'object'

const _fIsTypeof = (
  strType
) => v => typeof v == strType

export const isFn = _fIsTypeof('function')
export const isStr = _fIsTypeof('string')
export const isBool = _fIsTypeof('boolean')
const _isTypeNumber = _fIsTypeof('number')
export const isNumber = v => _isTypeNumber(v) && v-v == 0
export const isNaN = Number.isNaN

export const isPositiveNumber = (
  value
) => isNumber(value) && value >= 0

export const isNumOrStr = (
  value
) => isNumber(value) || isStr(value)
