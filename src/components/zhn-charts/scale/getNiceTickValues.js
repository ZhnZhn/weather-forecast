//import Decimal from 'decimal.js-light';
import Decimal from '../../../math/decimal-light/decimalLight';

import {
  range,
  memoize
} from './util/utils';
import {
  getDigitCount,
  getByPow10,
  rangeStep
} from './util/arithmetic';

const _mathCeil = Math.ceil
, _mathAbs = Math.abs
, _mathFloor = Math.floor
, _mathMax = Math.max
, _isFinite = Number.isFinite

, _crDecimalMul = (
  value,
  step
) => new Decimal(value).mul(step)

,  _getValidInterval = (
  min,
  max
) => min > max
  ? [max, min]
  : [min, max];

/**
 * Calculate the step which is easy to understand between ticks, like 10, 20, 25
 *
 * @param  {Decimal} roughStep        The rough step calculated by deviding the
 * difference by the tickCount
 * @param  {Boolean} allowDecimals    Allow the ticks to be decimals or not
 * @param  {Integer} correctionFactor A correction factor
 * @return {Decimal} The step which is easy to understand between two ticks
 */
function getFormatStep(
  roughStep,
  allowDecimals,
  correctionFactor
) {
  if (roughStep.lte(0)) {
    return new Decimal(0);
  }

  const digitCount = getDigitCount(roughStep.toNumber())
  // The ratio between the rough step and the smallest number which has a bigger
  // order of magnitudes than the rough step
  //, digitCountValue = new Decimal(10).pow(digitCount)
  , digitCountValue = getByPow10(digitCount)
  , stepRatio = roughStep.div(digitCountValue)
  // When an integer and a float multiplied, the accuracy of result may be wrong
  , stepRatioScale = digitCount === 1
      ? 0.1
      : 0.05
  , amendStepRatio = new Decimal(
    _mathCeil(stepRatio.div(stepRatioScale).toNumber())
  ).add(correctionFactor)
   .mul(stepRatioScale);

  const formatStep = amendStepRatio.mul(digitCountValue);

  return allowDecimals
    ? formatStep
    : new Decimal(_mathCeil(formatStep));
}

/**
 * calculate the ticks when the minimum value equals to the maximum value
 *
 * @param  {Number}  value         The minimum valuue which is also the maximum value
 * @param  {Integer} tickCount     The count of ticks
 * @param  {Boolean} allowDecimals Allow the ticks to be decimals or not
 * @return {Array}                 ticks
 */
function getTickOfSingleValue(
  value,
  tickCount,
  allowDecimals
) {
  let step = 1;
  // calculate the middle value of ticks
  let middle = new Decimal(value);

  if (!middle.isint() && allowDecimals) {
    const absVal = _mathAbs(value);

    if (absVal < 1) {
      // The step should be a float number when the difference is smaller than 1
      //step = new Decimal(10).pow(getDigitCount(value) - 1);
      step = getByPow10(getDigitCount(value) - 1)

      middle = new Decimal(_mathFloor(middle.div(step).toNumber())).mul(step);
    } else if (absVal > 1) {
      // Return the maximum integer which is smaller than 'value' when 'value' is greater than 1
      middle = new Decimal(_mathFloor(value));
    }
  } else if (value === 0) {
    middle = new Decimal(_mathFloor((tickCount - 1) / 2));
  } else if (!allowDecimals) {
    middle = new Decimal(_mathFloor(value));
  }

  const middleIndex = _mathFloor((tickCount - 1) / 2);
  return range(0, tickCount)
    .map(n => middle.add(_crDecimalMul(n - middleIndex, step)).toNumber())
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
const _crStepConfig = (
  step,
  tickMin,
  tickMax
) => ({
  step,
  tickMin,
  tickMax
});
function calculateStep(
  min,
  max,
  tickCount,
  allowDecimals,
  correctionFactor = 0
) {
  // dirty hack (for recharts' test)
  if (!_isFinite((max - min) / (tickCount - 1))) {
    return _crStepConfig(
      new Decimal(0),
      new Decimal(0),
      new Decimal(0)
    );
  }

  // The step which is easy to understand between two ticks
  const step = getFormatStep(
    new Decimal(max).sub(min).div(tickCount - 1),
    allowDecimals,
    correctionFactor
  );

  // A medial value of ticks
  let middle;

  // When 0 is inside the interval, 0 should be a tick
  if (min <= 0 && max >= 0) {
    middle = new Decimal(0);
  } else {
    // calculate the middle value
    middle = new Decimal(min).add(max).div(2);
    // minus modulo value
    middle = middle.sub(new Decimal(middle).mod(step));
  }

  let belowCount = _mathCeil(middle.sub(min).div(step).toNumber());
  let upCount = _mathCeil(new Decimal(max).sub(middle).div(step)
    .toNumber());
  const scaleCount = belowCount + upCount + 1;

  if (scaleCount > tickCount) {
    // When more ticks need to cover the interval, step should be bigger.
    return calculateStep(min, max, tickCount, allowDecimals, correctionFactor + 1);
  } if (scaleCount < tickCount) {
    // When less ticks can cover the interval, we should add some additional ticks
    upCount = max > 0 ? upCount + (tickCount - scaleCount) : upCount;
    belowCount = max > 0 ? belowCount : belowCount + (tickCount - scaleCount);
  }

  return _crStepConfig(
    step,
    middle.sub(_crDecimalMul(belowCount, step)),
    middle.add(_crDecimalMul(upCount, step))
  );
}

const _crTickCountRange = (
  tickCount,
  infinityValue
) => range(0, tickCount - 1).map(() => infinityValue)
, _getValues = (
  min,
  max,
  values
) => min > max
  ? values.reverse()
  : values
, _crEdgeValues = (
  cormin,
  cormax,
  crValuesInfinityCase,
  crValuesEqualCase
) => cormin === -Infinity || cormax === Infinity
  ? crValuesInfinityCase()
  : cormin === cormax
  ? crValuesEqualCase()
  : !1;

/**
 * Calculate the ticks of an interval, the count of ticks will be guraranteed
 *
 * @param  {Number}  min, max      min: The minimum value, max: The maximum value
 * @param  {Integer} tickCount     The count of ticks
 * @param  {Boolean} allowDecimals Allow the ticks to be decimals or not
 * @return {Array}   ticks
 */
function getNiceTickValuesFn(
  [min, max],
  tickCount = 6,
  allowDecimals = !0
) {
  // More than two ticks should be return
  const count = _mathMax(tickCount, 2)
  , [
    cormin,
    cormax
  ] = _getValidInterval(min, max)
  , _edgeValues = _crEdgeValues(
    cormin,
    cormax,
    () => _getValues(min, max, cormax === Infinity
       ? [cormin, ..._crTickCountRange(tickCount, Infinity)]
       : [..._crTickCountRange(tickCount, -Infinity), cormax]),
    () => getTickOfSingleValue(cormin, tickCount, allowDecimals)
  )
  if (_edgeValues) {
    return _edgeValues;
  }

  // Get the step between two ticks
  const {
    step,
    tickMin,
    tickMax
  } = calculateStep(
    cormin,
    cormax,
    count,
    allowDecimals
  )
  , values = rangeStep(
     tickMin,
     tickMax.add(_crDecimalMul(0.1, step)),
     step
   );

  return _getValues(min, max, values);
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
function getTickValuesFixedDomainFn(
  [min, max],
  tickCount,
  allowDecimals = !0
) {
  // More than two ticks should be return
  const [
    cormin,
    cormax
  ] = _getValidInterval(min, max)
  , _edgeValues = _crEdgeValues(
    cormin,
    cormax,
    () => [min, max],
    () => [cormin]
  )
  if (_edgeValues) {
    return _edgeValues;
  }

  const count = _mathMax(tickCount, 2)
  , step = getFormatStep(
     new Decimal(cormax).sub(cormin).div(count - 1),
     allowDecimals,
     0
   )
  , values = [
     ...rangeStep(
       new Decimal(cormin),
       new Decimal(cormax).sub(_crDecimalMul(0.99, step)),
       step
    ),
    cormax
  ];

  return _getValues(min, max, values);
}

export const getNiceTickValues = memoize(getNiceTickValuesFn);
export const getTickValuesFixedDomain = memoize(getTickValuesFixedDomainFn);
