"use strict";

exports.__esModule = true;
exports.range = exports.memoize = void 0;
const range = (begin, end) => {
  const arr = [];
  for (let i = begin; i < end; ++i) {
    arr[i - begin] = i;
  }
  return arr;
};
exports.range = range;
const memoize = fn => {
  let lastArgs = null;
  let lastResult = null;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return lastArgs && args.every((val, i) => val === lastArgs[i]) ? lastResult : (lastArgs = args, lastResult = fn(...args));
  };
};
exports.memoize = memoize;
//# sourceMappingURL=utils.js.map