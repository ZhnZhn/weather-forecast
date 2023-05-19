"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.translateStyle = exports.shallowEqual = exports.mapObject = exports.identity = exports.getTransitionVal = exports.getIntersectionKeys = void 0;
var _extends4 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _shallowEqual = require("../../utils/shallowEqual");
exports.shallowEqual = _shallowEqual.shallowEqual;
/* eslint no-console: 0 */
var PREFIX_LIST = ['Webkit', 'Moz', 'O', 'ms'];
var IN_LINE_PREFIX_LIST = ['-webkit-', '-moz-', '-o-', '-ms-'];
var IN_COMPATIBLE_PROPERTY = ['transform', 'transformOrigin', 'transition'];
var _getObjectKeys = Object.keys;

/*
 * @description: add compatible style prefix
 * (string, string) => object
 */
var _generatePrefixStyle = function _generatePrefixStyle(name, value) {
  if (IN_COMPATIBLE_PROPERTY.indexOf(name) === -1) {
    var _ref;
    return _ref = {}, _ref[name] = value, _ref;
  }
  var isTransition = name === 'transition',
    camelName = name.replace(/(\w)/, function (v) {
      return v.toUpperCase();
    });
  var styleVal = value;
  return PREFIX_LIST.reduce(function (result, property, i) {
    var _extends2;
    if (isTransition) {
      styleVal = value.replace(/(transform|transform-origin)/gim, IN_LINE_PREFIX_LIST[i] + "$1");
    }
    return (0, _extends4["default"])({}, result, (_extends2 = {}, _extends2[property + camelName] = styleVal, _extends2));
  }, {});
};

/*
 * @description: convert camel case to dash case
 * string => string
 */
var _getDashCase = function _getDashCase(name) {
  return name.replace(/([A-Z])/g, function (v) {
    return "-" + v.toLowerCase();
  });
};
var identity = function identity(param) {
  return param;
};
exports.identity = identity;
var getIntersectionKeys = function getIntersectionKeys(preObj, nextObj) {
  return [_getObjectKeys(preObj), _getObjectKeys(nextObj)].reduce(function (a, b) {
    return a.filter(function (c) {
      return b.includes(c);
    });
  });
};

/*
 * @description: map object on every element in this object.
 * (function, object) => object
 */
exports.getIntersectionKeys = getIntersectionKeys;
var mapObject = function mapObject(fn, obj) {
  return _getObjectKeys(obj).reduce(function (res, key) {
    var _extends3;
    return (0, _extends4["default"])({}, res, (_extends3 = {}, _extends3[key] = fn(key, obj[key]), _extends3));
  }, {});
};

/*
 * @description: add compatible prefix to style
 * object => object
 */
exports.mapObject = mapObject;
var translateStyle = function translateStyle(style) {
  return _getObjectKeys(style).reduce(function (res, key) {
    return (0, _extends4["default"])({}, res, _generatePrefixStyle(key, res[key]));
  }, style);
};
exports.translateStyle = translateStyle;
var getTransitionVal = function getTransitionVal(props, duration, easing) {
  return props.map(function (prop) {
    return _getDashCase(prop) + " " + duration + "ms " + easing;
  }).join(',');
};
exports.getTransitionVal = getTransitionVal;
//# sourceMappingURL=util.js.map