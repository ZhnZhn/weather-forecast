"use strict";

exports.__esModule = true;
exports.translateStyle = exports.shallowEqual = exports.mapObject = exports.identity = exports.getTransitionVal = void 0;
var _shallowEqual = require("../../utils/shallowEqual");
exports.shallowEqual = _shallowEqual.shallowEqual;
/* eslint no-console: 0 */
const PREFIX_LIST = ['Webkit'];
const IN_LINE_PREFIX_LIST = ['-webkit-'];
const IN_COMPATIBLE_PROPERTY = ['transform', 'transformOrigin', 'transition'];
const _getObjectKeys = Object.keys;

/*
 * @description: add compatible style prefix
 * (string, string) => object
 */
const _generatePrefixStyle = (name, value) => {
  if (IN_COMPATIBLE_PROPERTY.indexOf(name) === -1) {
    return {
      [name]: value
    };
  }
  const isTransition = name === 'transition',
    camelName = name.replace(/(\w)/, v => v.toUpperCase());
  let styleVal = value;
  return PREFIX_LIST.reduce((result, property, i) => {
    if (isTransition) {
      styleVal = value.replace(/(transform|transform-origin)/gim, `${IN_LINE_PREFIX_LIST[i]}$1`);
    }
    return {
      ...result,
      [property + camelName]: styleVal
    };
  }, {});
};

/*
 * @description: add compatible prefix to style
 * object => object
 */
const translateStyle = style => _getObjectKeys(style).reduce((res, key) => ({
  ...res,
  ..._generatePrefixStyle(key, res[key])
}), style);
exports.translateStyle = translateStyle;
const identity = param => param;

/*
export const getIntersectionKeys = (
  preObj,
  nextObj
) => [
  _getObjectKeys(preObj),
  _getObjectKeys(nextObj)
].reduce((a, b) => a.filter(c => b.includes(c)))
*/

/*
 * @description: map object on every element in this object.
 * (function, object) => object
 */
exports.identity = identity;
const mapObject = (fn, obj) => _getObjectKeys(obj).reduce((res, key) => ({
  ...res,
  [key]: fn(key, obj[key])
}), {});

/*
 * @description: convert camel case to dash case
 * string => string
 */
exports.mapObject = mapObject;
const _getDashCase = name => name.replace(/([A-Z])/g, v => `-${v.toLowerCase()}`);
const getTransitionVal = (props, duration, easing) => props.map(prop => `${_getDashCase(prop)} ${duration}ms ${easing}`).join(',');
exports.getTransitionVal = getTransitionVal;
//# sourceMappingURL=util.js.map