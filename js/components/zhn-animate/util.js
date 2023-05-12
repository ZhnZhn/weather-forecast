"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.warn = exports.translateStyle = exports.mapObject = exports.log = exports.identity = exports.getTransitionVal = exports.getIntersectionKeys = exports.getDashCase = exports.generatePrefixStyle = exports.debugf = exports.debug = exports.compose = void 0;
var _extends4 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
/* eslint no-console: 0 */
var PREFIX_LIST = ['Webkit', 'Moz', 'O', 'ms'];
var IN_LINE_PREFIX_LIST = ['-webkit-', '-moz-', '-o-', '-ms-'];
var IN_COMPATIBLE_PROPERTY = ['transform', 'transformOrigin', 'transition'];
var getIntersectionKeys = function getIntersectionKeys(preObj, nextObj) {
  return [Object.keys(preObj), Object.keys(nextObj)].reduce(function (a, b) {
    return a.filter(function (c) {
      return b.includes(c);
    });
  });
};
exports.getIntersectionKeys = getIntersectionKeys;
var identity = function identity(param) {
  return param;
};

/*
 * @description: convert camel case to dash case
 * string => string
 */
exports.identity = identity;
var getDashCase = function getDashCase(name) {
  return name.replace(/([A-Z])/g, function (v) {
    return "-" + v.toLowerCase();
  });
};

/*
 * @description: add compatible style prefix
 * (string, string) => object
 */
exports.getDashCase = getDashCase;
var generatePrefixStyle = function generatePrefixStyle(name, value) {
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
exports.generatePrefixStyle = generatePrefixStyle;
var log = function log() {
  var _console;
  (_console = console).log.apply(_console, arguments);
};

/*
 * @description: log the value of a varible
 * string => any => any
 */
exports.log = log;
var debug = function debug(name) {
  return function (item) {
    log(name, item);
    return item;
  };
};

/*
 * @description: log name, args, return value of a function
 * function => function
 */
exports.debug = debug;
var debugf = function debugf(tag, f) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var res = f.apply(void 0, args);
    var name = tag || f.name || 'anonymous function';
    var argNames = "(" + args.map(JSON.stringify).join(', ') + ")";
    log(name + ": " + argNames + " => " + JSON.stringify(res));
    return res;
  };
};

/*
 * @description: map object on every element in this object.
 * (function, object) => object
 */
exports.debugf = debugf;
var mapObject = function mapObject(fn, obj) {
  return Object.keys(obj).reduce(function (res, key) {
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
  return Object.keys(style).reduce(function (res, key) {
    return (0, _extends4["default"])({}, res, generatePrefixStyle(key, res[key]));
  }, style);
};
exports.translateStyle = translateStyle;
var compose = function compose() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }
  if (!args.length) {
    return identity;
  }
  var fns = args.reverse();
  // first function can receive multiply arguments
  var firstFn = fns[0];
  var tailsFn = fns.slice(1);
  return function () {
    return tailsFn.reduce(function (res, fn) {
      return fn(res);
    }, firstFn.apply(void 0, arguments));
  };
};
exports.compose = compose;
var getTransitionVal = function getTransitionVal(props, duration, easing) {
  return props.map(function (prop) {
    return getDashCase(prop) + " " + duration + "ms " + easing;
  }).join(',');
};

/*eslint-disable no-undef*/
exports.getTransitionVal = getTransitionVal;
var isDev = process.env.NODE_ENV !== 'production';
/*eslint-enable no-undef*/

var warn = function warn(condition, format, a, b, c, d, e, f) {
  if (isDev && typeof console !== 'undefined' && console.warn) {
    if (format === undefined) {
      console.warn('LogUtils requires an error message argument');
    }
    if (!condition) {
      if (format === undefined) {
        console.warn('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
      } else {
        var args = [a, b, c, d, e, f];
        var argIndex = 0;
        console.warn(format.replace(/%s/g, function () {
          return args[argIndex++];
        }));
      }
    }
  }
};
exports.warn = warn;
//# sourceMappingURL=util.js.map