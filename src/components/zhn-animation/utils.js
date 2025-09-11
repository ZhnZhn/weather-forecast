const _getObjectKeys = Object.keys;

/*
 * @description: map object on every element in this object.
 * (function, object) => object
 */
export const mapObject = (
  fn,
  obj
) => _getObjectKeys(obj)
  .reduce((res, key) => ({
    ...res,
    [key]: fn(key, obj[key])
  }), {})

/*
 * @description: convert camel case to dash case
 * string => string
 */
const _getDashCase = (
  name
) => name.replace(/([A-Z])/g, v => `-${v.toLowerCase()}`);

export const getTransitionVal = (
  props,
  duration,
  easing
) => props
  .map(prop =>`${_getDashCase(prop)} ${duration}ms ${easing}`)
  .join(',');
