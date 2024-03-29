"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.getTickValuesFixedDomain = exports.getNiceTickValues = void 0;
var _decimalLight = _interopRequireDefault(require("../../../math/decimal-light/decimalLight"));
var _utils = require("./util/utils");
var _arithmetic = require("./util/arithmetic");
//import Decimal from 'decimal.js-light';

var _mathCeil = Math.ceil,
  _mathAbs = Math.abs,
  _mathFloor = Math.floor,
  _mathMax = Math.max,
  _isFinite = Number.isFinite;
var _getValidInterval = function _getValidInterval(_ref) {
  var min = _ref[0],
    max = _ref[1];
  return min > max ? [max, min] : [min, max];
};

/**
 * Calculate the step which is easy to understand between ticks, like 10, 20, 25
 *
 * @param  {Decimal} roughStep        The rough step calculated by deviding the
 * difference by the tickCount
 * @param  {Boolean} allowDecimals    Allow the ticks to be decimals or not
 * @param  {Integer} correctionFactor A correction factor
 * @return {Decimal} The step which is easy to understand between two ticks
 */
function getFormatStep(roughStep, allowDecimals, correctionFactor) {
  if (roughStep.lte(0)) {
    return new _decimalLight["default"](0);
  }
  var digitCount = (0, _arithmetic.getDigitCount)(roughStep.toNumber())
    // The ratio between the rough step and the smallest number which has a bigger
    // order of magnitudes than the rough step
    //, digitCountValue = new Decimal(10).pow(digitCount)
    ,
    digitCountValue = (0, _arithmetic.getByPow10)(digitCount),
    stepRatio = roughStep.div(digitCountValue)
    // When an integer and a float multiplied, the accuracy of result may be wrong
    ,
    stepRatioScale = digitCount !== 1 ? 0.05 : 0.1,
    amendStepRatio = new _decimalLight["default"](_mathCeil(stepRatio.div(stepRatioScale).toNumber())).add(correctionFactor).mul(stepRatioScale);
  var formatStep = amendStepRatio.mul(digitCountValue);
  return allowDecimals ? formatStep : new _decimalLight["default"](_mathCeil(formatStep));
}

/**
 * calculate the ticks when the minimum value equals to the maximum value
 *
 * @param  {Number}  value         The minimum valuue which is also the maximum value
 * @param  {Integer} tickCount     The count of ticks
 * @param  {Boolean} allowDecimals Allow the ticks to be decimals or not
 * @return {Array}                 ticks
 */
function getTickOfSingleValue(value, tickCount, allowDecimals) {
  var step = 1;
  // calculate the middle value of ticks
  var middle = new _decimalLight["default"](value);
  if (!middle.isint() && allowDecimals) {
    var absVal = _mathAbs(value);
    if (absVal < 1) {
      // The step should be a float number when the difference is smaller than 1
      //step = new Decimal(10).pow(getDigitCount(value) - 1);
      step = (0, _arithmetic.getByPow10)((0, _arithmetic.getDigitCount)(value) - 1);
      middle = new _decimalLight["default"](_mathFloor(middle.div(step).toNumber())).mul(step);
    } else if (absVal > 1) {
      // Return the maximum integer which is smaller than 'value' when 'value' is greater than 1
      middle = new _decimalLight["default"](_mathFloor(value));
    }
  } else if (value === 0) {
    middle = new _decimalLight["default"](_mathFloor((tickCount - 1) / 2));
  } else if (!allowDecimals) {
    middle = new _decimalLight["default"](_mathFloor(value));
  }
  var middleIndex = _mathFloor((tickCount - 1) / 2);
  var fn = (0, _utils.compose)((0, _utils.map)(function (n) {
    return middle.add(new _decimalLight["default"](n - middleIndex).mul(step)).toNumber();
  }), _utils.range);
  return fn(0, tickCount);
}

/**
 * Calculate the step
 *
 * @param  {Number}  min              The minimum value of an interval
 * @param  {Number}  max              The maximum value of an interval
 * @param  {Integer} tickCount        The count of ticks
 * @param  {Boolean} allowDecimals    Allow the ticks to be decimals or not
 * @param  {Number}  correctionFactor A correction factor
 * @return {Object}  The step, minimum value of ticks, maximum value of ticks
 */
var _crStepConfig = function _crStepConfig(step, tickMin, tickMax) {
  return {
    step: step,
    tickMin: tickMin,
    tickMax: tickMax
  };
};
function calculateStep(min, max, tickCount, allowDecimals, correctionFactor) {
  if (correctionFactor === void 0) {
    correctionFactor = 0;
  }
  // dirty hack (for recharts' test)
  if (!_isFinite((max - min) / (tickCount - 1))) {
    return _crStepConfig(new _decimalLight["default"](0), new _decimalLight["default"](0), new _decimalLight["default"](0));
  }

  // The step which is easy to understand between two ticks
  var step = getFormatStep(new _decimalLight["default"](max).sub(min).div(tickCount - 1), allowDecimals, correctionFactor);

  // A medial value of ticks
  var middle;

  // When 0 is inside the interval, 0 should be a tick
  if (min <= 0 && max >= 0) {
    middle = new _decimalLight["default"](0);
  } else {
    // calculate the middle value
    middle = new _decimalLight["default"](min).add(max).div(2);
    // minus modulo value
    middle = middle.sub(new _decimalLight["default"](middle).mod(step));
  }
  var belowCount = _mathCeil(middle.sub(min).div(step).toNumber());
  var upCount = _mathCeil(new _decimalLight["default"](max).sub(middle).div(step).toNumber());
  var scaleCount = belowCount + upCount + 1;
  if (scaleCount > tickCount) {
    // When more ticks need to cover the interval, step should be bigger.
    return calculateStep(min, max, tickCount, allowDecimals, correctionFactor + 1);
  }
  if (scaleCount < tickCount) {
    // When less ticks can cover the interval, we should add some additional ticks
    upCount = max > 0 ? upCount + (tickCount - scaleCount) : upCount;
    belowCount = max > 0 ? belowCount : belowCount + (tickCount - scaleCount);
  }
  return _crStepConfig(step, middle.sub(new _decimalLight["default"](belowCount).mul(step)), middle.add(new _decimalLight["default"](upCount).mul(step)));
}
/**
 * Calculate the ticks of an interval, the count of ticks will be guraranteed
 *
 * @param  {Number}  min, max      min: The minimum value, max: The maximum value
 * @param  {Integer} tickCount     The count of ticks
 * @param  {Boolean} allowDecimals Allow the ticks to be decimals or not
 * @return {Array}   ticks
 */
function getNiceTickValuesFn(_ref2, tickCount, allowDecimals) {
  var min = _ref2[0],
    max = _ref2[1];
  if (tickCount === void 0) {
    tickCount = 6;
  }
  if (allowDecimals === void 0) {
    allowDecimals = true;
  }
  // More than two ticks should be return
  var count = _mathMax(tickCount, 2),
    _getValidInterval2 = _getValidInterval([min, max]),
    cormin = _getValidInterval2[0],
    cormax = _getValidInterval2[1];
  if (cormin === -Infinity || cormax === Infinity) {
    var _values = cormax === Infinity ? [cormin].concat((0, _utils.range)(0, tickCount - 1).map(function () {
      return Infinity;
    })) : [].concat((0, _utils.range)(0, tickCount - 1).map(function () {
      return -Infinity;
    }), [cormax]);
    return min > max ? (0, _utils.reverse)(_values) : _values;
  }
  if (cormin === cormax) {
    return getTickOfSingleValue(cormin, tickCount, allowDecimals);
  }

  // Get the step between two ticks
  var _calculateStep = calculateStep(cormin, cormax, count, allowDecimals),
    step = _calculateStep.step,
    tickMin = _calculateStep.tickMin,
    tickMax = _calculateStep.tickMax,
    values = (0, _arithmetic.rangeStep)(tickMin, tickMax.add(new _decimalLight["default"](0.1).mul(step)), step);
  return min > max ? (0, _utils.reverse)(values) : values;
}

/**
 * Calculate the ticks of an interval, the count of ticks won't be guraranteed,
 * but the domain will be guaranteed
 *
 * @param  {Number}  min, max      min: The minimum value, max: The maximum value
 * @param  {Integer} tickCount     The count of ticks
 * @param  {Boolean} allowDecimals Allow the ticks to be decimals or not
 * @return {Array}   ticks
 */
function getTickValuesFixedDomainFn(_ref3, tickCount, allowDecimals) {
  var min = _ref3[0],
    max = _ref3[1];
  if (allowDecimals === void 0) {
    allowDecimals = true;
  }
  // More than two ticks should be return
  var _getValidInterval3 = _getValidInterval([min, max]),
    cormin = _getValidInterval3[0],
    cormax = _getValidInterval3[1];
  if (cormin === -Infinity || cormax === Infinity) {
    return [min, max];
  }
  if (cormin === cormax) {
    return [cormin];
  }
  var count = _mathMax(tickCount, 2),
    step = getFormatStep(new _decimalLight["default"](cormax).sub(cormin).div(count - 1), allowDecimals, 0),
    values = [].concat((0, _arithmetic.rangeStep)(new _decimalLight["default"](cormin), new _decimalLight["default"](cormax).sub(new _decimalLight["default"](0.99).mul(step)), step), [cormax]);
  return min > max ? (0, _utils.reverse)(values) : values;
}
var getNiceTickValues = (0, _utils.memoize)(getNiceTickValuesFn);
exports.getNiceTickValues = getNiceTickValues;
var getTickValuesFixedDomain = (0, _utils.memoize)(getTickValuesFixedDomainFn);
exports.getTickValuesFixedDomain = getTickValuesFixedDomain;
//# sourceMappingURL=getNiceTickValues.js.map