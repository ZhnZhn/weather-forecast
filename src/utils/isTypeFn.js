
export const isArr = Array.isArray

const _fIsTypeof = (
  strType
) => v => typeof v == strType

export const isFn = _fIsTypeof('function')
export const isStr = _fIsTypeof('string')
export const isBool = _fIsTypeof('boolean')
const _isTypeNumber = _fIsTypeof('number')
export const isNumber = v => _isTypeNumber(v) && v-v == 0
