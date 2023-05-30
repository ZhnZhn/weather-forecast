
export const isDecimal = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i

export const mathMax = Math.max
export const mathCeil = Math.ceil
export const mathFloor = Math.floor
export const mathPow = Math.pow

export const LOG_BASE = 7
export const BASE = 1e7

const _MAX_SAFE_INTEGER = 9007199254740991
// 1286742750677284
export const  MAX_E = mathFloor(_MAX_SAFE_INTEGER / LOG_BASE)

export const decimalError = '[DecimalError] '
export const invalidArgument = decimalError + 'Invalid argument: '
export const exponentOutOfRange = decimalError + 'Exponent out of range: '

let _external = true;
export const getExternal = () => _external
export const setExternal = is => {
  _external = is
}
