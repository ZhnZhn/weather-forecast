"use strict";

exports.__esModule = true;
exports.getEveryNThTick = getEveryNThTick;
exports.getNumberIntervalTicks = getNumberIntervalTicks;
exports.getTicks = getTicks;
var _FnUtils = require("../util/FnUtils");
var _DataUtils = require("../util/DataUtils");
var _DOMUtils = require("../util/DOMUtils");
var _Global = require("../util/Global");
var _getEveryNthWithCondition = require("../util/getEveryNthWithCondition");
/**
 * Given an array of ticks, find N, the lowest possible number for which every
 * nTH tick in the ticks array isShow == true and return the array of every nTh tick.
 * @param {CartesianTickItem[]} ticks An array of CartesianTickItem with the
 * information whether they can be shown without overlapping with their neighbour isShow.
 * @returns {CartesianTickItem[]} Every nTh tick in an array.
 */
function getEveryNThTick(ticks) {
  let N = 1;
  let previous = (0, _getEveryNthWithCondition.getEveryNthWithCondition)(ticks, N, tickItem => tickItem.isShow);
  while (N <= ticks.length) {
    if (previous !== undefined) {
      return previous;
    }
    N++;
    previous = (0, _getEveryNthWithCondition.getEveryNthWithCondition)(ticks, N, tickItem => tickItem.isShow);
  }
  return ticks.slice(0, 1);
}
function getNumberIntervalTicks(ticks, interval) {
  return (0, _getEveryNthWithCondition.getEveryNthWithCondition)(ticks, interval + 1);
}
const _crSizeKey = orientation => orientation === 'top' || orientation === 'bottom' ? 'width' : 'height';
const _crSign = result => result.length >= 2 ? (0, _DataUtils.mathSign)(result[1].coordinate - result[0].coordinate) : 1;
const _crStartEnd = (_isSizeKeyWidth, x, y, width, height, sign) => {
  const _interval = [_isSizeKeyWidth ? x : y, _isSizeKeyWidth ? x + width : y + height];
  return sign === 1 ? _interval : _interval.reverse();
};
function getTicksEnd(_ref) {
  let {
    ticks,
    tickFormatter,
    viewBox,
    orientation,
    minTickGap,
    unit,
    fontSize,
    letterSpacing
  } = _ref;
  const {
      x,
      y,
      width,
      height
    } = viewBox,
    sizeKey = _crSizeKey(orientation)
    // we need add the width of 'unit' only when sizeKey === 'width'
    ,
    _isSizeKeyWidth = sizeKey === 'width',
    unitSize = unit && _isSizeKeyWidth ? (0, _DOMUtils.getStringSize)(unit, {
      fontSize,
      letterSpacing
    })[sizeKey] : 0,
    result = (ticks || []).slice(),
    len = result.length,
    sign = _crSign(result);
  let [start, end] = _crStartEnd(_isSizeKeyWidth, x, y, width, height, sign);
  for (let i = len - 1; i >= 0; i--) {
    let entry = result[i];
    const content = (0, _FnUtils._isFn)(tickFormatter) ? tickFormatter(entry.value, len - i - 1) : entry.value,
      size = (0, _DOMUtils.getStringSize)(content, {
        fontSize,
        letterSpacing
      })[sizeKey] + unitSize;
    if (i === len - 1) {
      const gap = sign * (entry.coordinate + sign * size / 2 - end);
      result[i] = entry = {
        ...entry,
        tickCoord: gap > 0 ? entry.coordinate - gap * sign : entry.coordinate
      };
    } else {
      result[i] = entry = {
        ...entry,
        tickCoord: entry.coordinate
      };
    }
    const isShow = sign * (entry.tickCoord - sign * size / 2 - start) >= 0 && sign * (entry.tickCoord + sign * size / 2 - end) <= 0;
    if (isShow) {
      end = entry.tickCoord - sign * (size / 2 + minTickGap);
      result[i] = {
        ...entry,
        isShow: true
      };
    }
  }
  return result;
}
function getTicksStart(_ref2, preserveEnd) {
  let {
    ticks,
    tickFormatter,
    viewBox,
    orientation,
    minTickGap,
    unit,
    fontSize,
    letterSpacing
  } = _ref2;
  const {
      x,
      y,
      width,
      height
    } = viewBox,
    sizeKey = _crSizeKey(orientation),
    result = (ticks || []).slice()
    // we need add the width of 'unit' only when sizeKey === 'width'
    ,
    _isSizeKeyWidth = sizeKey === 'width',
    unitSize = unit && _isSizeKeyWidth ? (0, _DOMUtils.getStringSize)(unit, {
      fontSize,
      letterSpacing
    })[sizeKey] : 0,
    len = result.length,
    sign = _crSign(result);
  let [start, end] = _crStartEnd(_isSizeKeyWidth, x, y, width, height, sign);
  if (preserveEnd) {
    // Try to guarantee the tail to be displayed
    let tail = ticks[len - 1];
    const tailContent = (0, _FnUtils._isFn)(tickFormatter) ? tickFormatter(tail.value, len - 1) : tail.value,
      tailSize = (0, _DOMUtils.getStringSize)(tailContent, {
        fontSize,
        letterSpacing
      })[sizeKey] + unitSize,
      tailGap = sign * (tail.coordinate + sign * tailSize / 2 - end);
    result[len - 1] = tail = {
      ...tail,
      tickCoord: tailGap > 0 ? tail.coordinate - tailGap * sign : tail.coordinate
    };
    const isTailShow = sign * (tail.tickCoord - sign * tailSize / 2 - start) >= 0 && sign * (tail.tickCoord + sign * tailSize / 2 - end) <= 0;
    if (isTailShow) {
      end = tail.tickCoord - sign * (tailSize / 2 + minTickGap);
      result[len - 1] = {
        ...tail,
        isShow: true
      };
    }
  }
  const count = preserveEnd ? len - 1 : len;
  for (let i = 0; i < count; i++) {
    let entry = result[i];
    const content = (0, _FnUtils._isFn)(tickFormatter) ? tickFormatter(entry.value, i) : entry.value,
      size = (0, _DOMUtils.getStringSize)(content, {
        fontSize,
        letterSpacing
      })[sizeKey] + unitSize;
    if (i === 0) {
      const gap = sign * (entry.coordinate - sign * size / 2 - start);
      result[i] = entry = {
        ...entry,
        tickCoord: gap < 0 ? entry.coordinate - gap * sign : entry.coordinate
      };
    } else {
      result[i] = entry = {
        ...entry,
        tickCoord: entry.coordinate
      };
    }
    const isShow = sign * (entry.tickCoord - sign * size / 2 - start) >= 0 && sign * (entry.tickCoord + sign * size / 2 - end) <= 0;
    if (isShow) {
      start = entry.tickCoord + sign * (size / 2 + minTickGap);
      result[i] = {
        ...entry,
        isShow: true
      };
    }
  }
  return result;
}
function getTicks(props, fontSize, letterSpacing) {
  const {
    tick,
    ticks,
    viewBox,
    minTickGap,
    orientation,
    interval,
    tickFormatter,
    unit
  } = props;
  if (!ticks || !ticks.length || !tick) {
    return [];
  }
  if ((0, _DataUtils.isNumber)(interval) || _Global.IS_SSR) {
    return getNumberIntervalTicks(ticks, typeof interval === 'number' && (0, _DataUtils.isNumber)(interval) ? interval : 0);
  }
  const _tickOptions = {
    ticks,
    tickFormatter,
    viewBox,
    orientation,
    minTickGap,
    unit,
    fontSize,
    letterSpacing
  };
  if (interval === 'equidistantPreserveStart') {
    return getEveryNThTick(getTicksStart(_tickOptions));
  }
  const candidates = interval === 'preserveStart' || interval === 'preserveStartEnd' ? getTicksStart(_tickOptions, interval === 'preserveStartEnd') : getTicksEnd(_tickOptions);
  return candidates.filter(entry => entry.isShow);
}
//# sourceMappingURL=getTicks.js.map