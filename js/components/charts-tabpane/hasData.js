"use strict";

exports.__esModule = true;
exports.hasSnow = exports.hasRain = void 0;

var _isNumber = function _isNumber(n) {
  return typeof n === 'number';
},
    _isNumberGreaterZero = function _isNumberGreaterZero(value) {
  return _isNumber(value) && value > 0;
},
    _fHasData = function _fHasData(propName, isData) {
  return function (data) {
    for (var i = 0; i < data.length; i++) {
      if (isData(data[i][propName])) {
        return true;
      }
    }

    return false;
  };
};

var hasRain = _fHasData('rain', _isNumberGreaterZero);

exports.hasRain = hasRain;

var hasSnow = _fHasData('snow', _isNumberGreaterZero);

exports.hasSnow = hasSnow;
//# sourceMappingURL=hasData.js.map