"use strict";

exports.__esModule = true;
exports.mapObject = exports.getTransitionVal = void 0;
const _getObjectKeys = Object.keys;

/*
 * @description: map object on every element in this object.
 * (function, object) => object
 */
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
//# sourceMappingURL=utils.js.map