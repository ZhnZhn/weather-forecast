"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.getTickValuesFixedDomain = exports.getNiceTickValues = void 0;
var _decimal = _interopRequireDefault(require("decimal.js-light"));
var _utils = require("./util/utils");
var _arithmetic = require("./util/arithmetic");
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
    return new _decimal["default"](0);
  }
  var digitCount = (0, _arithmetic.getDigitCount)(roughStep.toNumber())
    // The ratio between the rough step and the smallest number which has a bigger
    // order of magnitudes than the rough step
    ,
    digitCountValue = new _decimal["default"](10).pow(digitCount),
    stepRatio = roughStep.div(digitCountValue)
    // When an integer and a float multiplied, the accuracy of result may be wrong
    ,
    stepRatioScale = digitCount !== 1 ? 0.05 : 0.1,
    amendStepRatio = new _decimal["default"](Math.ceil(stepRatio.div(stepRatioScale).toNumber())).add(correctionFactor).mul(stepRatioScale);
  var formatStep = amendStepRatio.mul(digitCountValue);
  return allowDecimals ? formatStep : new _decimal["default"](Math.ceil(formatStep));
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
  var middle = new _decimal["default"](value);
  if (!middle.isint() && allowDecimals) {
    var absVal = Math.abs(value);
    if (absVal < 1) {
      // The step should be a float number when the difference is smaller than 1
      step = new _decimal["default"](10).pow((0, _arithmetic.getDigitCount)(value) - 1);
      middle = new _decimal["default"](Math.floor(middle.div(step).toNumber())).mul(step);
    } else if (absVal > 1) {
      // Return the maximum integer which is smaller than 'value' when 'value' is greater than 1
      middle = new _decimal["default"](Math.floor(value));
    }
  } else if (value === 0) {
    middle = new _decimal["default"](Math.floor((tickCount - 1) / 2));
  } else if (!allowDecimals) {
    middle = new _decimal["default"](Math.floor(value));
  }
  var middleIndex = Math.floor((tickCount - 1) / 2);
  var fn = (0, _utils.compose)((0, _utils.map)(function (n) {
    return middle.add(new _decimal["default"](n - middleIndex).mul(step)).toNumber();
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
function calculateStep(min, max, tickCount, allowDecimals, correctionFactor) {
  if (correctionFactor === void 0) {
    correctionFactor = 0;
  }
  // dirty hack (for recharts' test)
  if (!Number.isFinite((max - min) / (tickCount - 1))) {
    return {
      step: new _decimal["default"](0),
      tickMin: new _decimal["default"](0),
      tickMax: new _decimal["default"](0)
    };
  }

  // The step which is easy to understand between two ticks
  var step = getFormatStep(new _decimal["default"](max).sub(min).div(tickCount - 1), allowDecimals, correctionFactor);

  // A medial value of ticks
  var middle;

  // When 0 is inside the interval, 0 should be a tick
  if (min <= 0 && max >= 0) {
    middle = new _decimal["default"](0);
  } else {
    // calculate the middle value
    middle = new _decimal["default"](min).add(max).div(2);
    // minus modulo value
    middle = middle.sub(new _decimal["default"](middle).mod(step));
  }
  var belowCount = Math.ceil(middle.sub(min).div(step).toNumber());
  var upCount = Math.ceil(new _decimal["default"](max).sub(middle).div(step).toNumber());
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
  return {
    step: step,
    tickMin: middle.sub(new _decimal["default"](belowCount).mul(step)),
    tickMax: middle.add(new _decimal["default"](upCount).mul(step))
  };
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
  var count = Math.max(tickCount, 2),
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
    values = (0, _arithmetic.rangeStep)(tickMin, tickMax.add(new _decimal["default"](0.1).mul(step)), step);
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
  var count = Math.max(tickCount, 2),
    step = getFormatStep(new _decimal["default"](cormax).sub(cormin).div(count - 1), allowDecimals, 0),
    values = [].concat((0, _arithmetic.rangeStep)(new _decimal["default"](cormin), new _decimal["default"](cormax).sub(new _decimal["default"](0.99).mul(step)), step), [cormax]);
  return min > max ? (0, _utils.reverse)(values) : values;
}
var getNiceTickValues = (0, _utils.memoize)(getNiceTickValuesFn);
exports.getNiceTickValues = getNiceTickValues;
var getTickValuesFixedDomain = (0, _utils.memoize)(getTickValuesFixedDomainFn);
exports.getTickValuesFixedDomain = getTickValuesFixedDomain;
//# sourceMappingURL=getNiceTickValues.js.map