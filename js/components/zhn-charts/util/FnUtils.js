"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports._upperFirst = exports._uniqBy = exports._throttle = exports._range = exports._min = exports._max = exports._isStr = exports._isObject = exports._isNumber = exports._isNotEmptyArr = exports._isNil = exports._isNaN = exports._isFn = exports._isEqual = exports._isBool = exports._isArr = exports._getByPropName = void 0;
var _throttleFn = _interopRequireDefault(require("../../../utils/throttleFn"));
const _throttle = exports._throttle = _throttleFn.default;
const _isArr = exports._isArr = Array.isArray;
const _isNotEmptyArr = v => _isArr(v) && v.length > 0;
exports._isNotEmptyArr = _isNotEmptyArr;
const _fIsTypeof = str => v => typeof v === str;
const _isFn = exports._isFn = _fIsTypeof("function");
const _isBool = exports._isBool = _fIsTypeof("boolean");
const _isStr = exports._isStr = _fIsTypeof("string");
const _isNumber = v => typeof v === 'number' && v - v === 0;
exports._isNumber = _isNumber;
const _isNil = v => v == null;
exports._isNil = _isNil;
const _isNaN = exports._isNaN = Number.isNaN;
const _isObject = value => value != null && typeof value === "object";
exports._isObject = _isObject;
const _upperFirst = str => _isStr(str) && str.length > 0 ? str[0].toUpperCase() + str.slice(1) : '';
exports._upperFirst = _upperFirst;
const _getByPropName = (obj, propName, dfValue) => obj && propName ? obj[propName] || dfValue : dfValue;
exports._getByPropName = _getByPropName;
const _isUndef = _fIsTypeof("undefined");
const _range = (startValue, endValue, increment) => {
  const isEndDef = !_isUndef(endValue);
  endValue = isEndDef ? endValue : startValue;
  startValue = isEndDef ? startValue : 0;
  const _diff = endValue - startValue;
  if (_isUndef(increment)) {
    increment = Math.sign(_diff);
  }
  const length = Math.abs(_diff / (increment || 1));
  const {
    result
  } = Array.from({
    length
  }).reduce(_ref => {
    let {
      result,
      current
    } = _ref;
    return {
      result: [...result, current],
      current: current + increment
    };
  }, {
    current: startValue,
    result: []
  });
  return result;
};
exports._range = _range;
const _min = arr => arr && arr.length ? Math.min(...arr) : void 0;
exports._min = _min;
const _max = arr => arr && arr.length ? Math.max(...arr) : void 0;
exports._max = _max;
const _uniqBy = (arr, iteratee) => {
  if (_isStr(iteratee)) {
    const prop = iteratee;
    iteratee = item => item[prop];
  }
  return arr.filter((x, i, arrSelf) => i === arrSelf.findIndex(y => iteratee(x) === iteratee(y)));
};
exports._uniqBy = _uniqBy;
const _getObjectKeys = Object.keys;
const _isEqual = (first, second) => {
  if (first === second) {
    return true;
  }
  if ((first === undefined || second === undefined || first === null || second === null) && (first || second)) {
    return false;
  }
  const firstType = first?.constructor.name;
  const secondType = second?.constructor.name;
  if (firstType !== secondType) {
    return false;
  }
  if (firstType === 'Array') {
    if (first.length !== second.length) {
      return false;
    }
    let equal = true;
    for (let i = 0; i < first.length; i++) {
      if (!_isEqual(first[i], second[i])) {
        equal = false;
        break;
      }
    }
    return equal;
  }
  if (firstType === 'Object') {
    let equal = true;
    const fKeys = _getObjectKeys(first);
    const sKeys = _getObjectKeys(second);
    if (fKeys.length !== sKeys.length) {
      return false;
    }
    for (let i = 0; i < fKeys.length; i++) {
      if (first[fKeys[i]] && second[fKeys[i]]) {
        if (first[fKeys[i]] === second[fKeys[i]]) {
          continue; // eslint-disable-line
        }
        if (first[fKeys[i]] && (first[fKeys[i]].constructor.name === 'Array' || first[fKeys[i]].constructor.name === 'Object')) {
          equal = _isEqual(first[fKeys[i]], second[fKeys[i]]);
          if (!equal) {
            break;
          }
        } else if (first[fKeys[i]] !== second[fKeys[i]]) {
          equal = false;
          break;
        }
      } else if (first[fKeys[i]] && !second[fKeys[i]] || !first[fKeys[i]] && second[fKeys[i]]) {
        equal = false;
        break;
      }
    }
    return equal;
  }
  return first === second;
};
exports._isEqual = _isEqual;
//# sourceMappingURL=FnUtils.js.map