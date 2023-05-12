"use strict";

exports.__esModule = true;
exports.reverse = exports.range = exports.memoize = exports.map = exports.compose = exports.PLACE_HOLDER = void 0;
var _isArr = Array.isArray;
var identity = function identity(i) {
  return i;
};
var PLACE_HOLDER = {
  '@@functional/placeholder': true
};
exports.PLACE_HOLDER = PLACE_HOLDER;
var isPlaceHolder = function isPlaceHolder(val) {
  return val === PLACE_HOLDER;
};
var curry0 = function curry0(fn) {
  return function _curried() {
    return arguments.length === 0 || arguments.length === 1 && isPlaceHolder(arguments.length <= 0 ? undefined : arguments[0]) ? _curried : fn.apply(void 0, arguments);
  };
};
var curryN = function curryN(n, fn) {
  if (n === 1) {
    return fn;
  }
  return curry0(function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var argsLength = args.filter(function (arg) {
      return arg !== PLACE_HOLDER;
    }).length;
    if (argsLength >= n) {
      return fn.apply(void 0, args);
    }
    return curryN(n - argsLength, curry0(function () {
      for (var _len2 = arguments.length, restArgs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        restArgs[_key2] = arguments[_key2];
      }
      var newArgs = args.map(function (arg) {
        return isPlaceHolder(arg) ? restArgs.shift() : arg;
      });
      return fn.apply(void 0, newArgs.concat(restArgs));
    }));
  });
};
var curry = function curry(fn) {
  return curryN(fn.length, fn);
};
var range = function range(begin, end) {
  var arr = [];
  for (var i = begin; i < end; ++i) {
    arr[i - begin] = i;
  }
  return arr;
};
exports.range = range;
var map = curry(function (fn, arr) {
  return _isArr(arr) ? arr.map(fn) : Object.keys(arr).map(function (key) {
    return arr[key];
  }).map(fn);
});
exports.map = map;
var compose = function compose() {
  for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }
  if (!args.length) {
    return identity;
  }
  var fns = args.reverse()
    // first function can receive multiply arguments
    ,
    firstFn = fns[0],
    tailsFn = fns.slice(1);
  return function () {
    return tailsFn.reduce(function (res, fn) {
      return fn(res);
    }, firstFn.apply(void 0, arguments));
  };
};
exports.compose = compose;
var reverse = function reverse(arrOrStr) {
  return _isArr(arrOrStr) ? arrOrStr.reverse() : arrOrStr.split('').reverse.join('');
};
exports.reverse = reverse;
var memoize = function memoize(fn) {
  var lastArgs = null;
  var lastResult = null;
  return function () {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }
    if (lastArgs && args.every(function (val, i) {
      return val === lastArgs[i];
    })) {
      return lastResult;
    }
    lastArgs = args;
    lastResult = fn.apply(void 0, args);
    return lastResult;
  };
};
exports.memoize = memoize;
//# sourceMappingURL=utils.js.map