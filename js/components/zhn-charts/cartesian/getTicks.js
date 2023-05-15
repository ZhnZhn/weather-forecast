"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.getEveryNThTick = getEveryNThTick;
exports.getNumberIntervalTicks = getNumberIntervalTicks;
exports.getTicks = getTicks;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
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
  var N = 1;
  var previous = (0, _getEveryNthWithCondition.getEveryNthWithCondition)(ticks, N, function (tickItem) {
    return tickItem.isShow;
  });
  while (N <= ticks.length) {
    if (previous !== undefined) {
      return previous;
    }
    N++;
    previous = (0, _getEveryNthWithCondition.getEveryNthWithCondition)(ticks, N, function (tickItem) {
      return tickItem.isShow;
    });
  }
  return ticks.slice(0, 1);
}
function getNumberIntervalTicks(ticks, interval) {
  return (0, _getEveryNthWithCondition.getEveryNthWithCondition)(ticks, interval + 1);
}
var _crSizeKey = function _crSizeKey(orientation) {
  return orientation === 'top' || orientation === 'bottom' ? 'width' : 'height';
};
var _crSign = function _crSign(result) {
  return result.length >= 2 ? (0, _DataUtils.mathSign)(result[1].coordinate - result[0].coordinate) : 1;
};
var _crStartEnd = function _crStartEnd(_isSizeKeyWidth, x, y, width, height, sign) {
  var _interval = [_isSizeKeyWidth ? x : y, _isSizeKeyWidth ? x + width : y + height];
  return sign === 1 ? _interval : _interval.reverse();
};
function getTicksEnd(_ref) {
  var ticks = _ref.ticks,
    tickFormatter = _ref.tickFormatter,
    viewBox = _ref.viewBox,
    orientation = _ref.orientation,
    minTickGap = _ref.minTickGap,
    unit = _ref.unit,
    fontSize = _ref.fontSize,
    letterSpacing = _ref.letterSpacing;
  var x = viewBox.x,
    y = viewBox.y,
    width = viewBox.width,
    height = viewBox.height,
    sizeKey = _crSizeKey(orientation),
    _isSizeKeyWidth = sizeKey === 'width',
    unitSize = unit && _isSizeKeyWidth ? (0, _DOMUtils.getStringSize)(unit, {
      fontSize: fontSize,
      letterSpacing: letterSpacing
    })[sizeKey] : 0,
    result = (ticks || []).slice(),
    len = result.length,
    sign = _crSign(result);
  var _crStartEnd2 = _crStartEnd(_isSizeKeyWidth, x, y, width, height, sign),
    start = _crStartEnd2[0],
    end = _crStartEnd2[1];
  for (var i = len - 1; i >= 0; i--) {
    var entry = result[i];
    var content = (0, _FnUtils._isFn)(tickFormatter) ? tickFormatter(entry.value, len - i - 1) : entry.value,
      size = (0, _DOMUtils.getStringSize)(content, {
        fontSize: fontSize,
        letterSpacing: letterSpacing
      })[sizeKey] + unitSize;
    if (i === len - 1) {
      var gap = sign * (entry.coordinate + sign * size / 2 - end);
      result[i] = entry = (0, _extends2["default"])({}, entry, {
        tickCoord: gap > 0 ? entry.coordinate - gap * sign : entry.coordinate
      });
    } else {
      result[i] = entry = (0, _extends2["default"])({}, entry, {
        tickCoord: entry.coordinate
      });
    }
    var isShow = sign * (entry.tickCoord - sign * size / 2 - start) >= 0 && sign * (entry.tickCoord + sign * size / 2 - end) <= 0;
    if (isShow) {
      end = entry.tickCoord - sign * (size / 2 + minTickGap);
      result[i] = (0, _extends2["default"])({}, entry, {
        isShow: true
      });
    }
  }
  return result;
}
function getTicksStart(_ref2, preserveEnd) {
  var ticks = _ref2.ticks,
    tickFormatter = _ref2.tickFormatter,
    viewBox = _ref2.viewBox,
    orientation = _ref2.orientation,
    minTickGap = _ref2.minTickGap,
    unit = _ref2.unit,
    fontSize = _ref2.fontSize,
    letterSpacing = _ref2.letterSpacing;
  var x = viewBox.x,
    y = viewBox.y,
    width = viewBox.width,
    height = viewBox.height,
    sizeKey = _crSizeKey(orientation),
    result = (ticks || []).slice(),
    _isSizeKeyWidth = sizeKey === 'width',
    unitSize = unit && _isSizeKeyWidth ? (0, _DOMUtils.getStringSize)(unit, {
      fontSize: fontSize,
      letterSpacing: letterSpacing
    })[sizeKey] : 0,
    len = result.length,
    sign = _crSign(result);
  var _crStartEnd3 = _crStartEnd(_isSizeKeyWidth, x, y, width, height, sign),
    start = _crStartEnd3[0],
    end = _crStartEnd3[1];
  if (preserveEnd) {
    // Try to guarantee the tail to be displayed
    var tail = ticks[len - 1];
    var tailContent = (0, _FnUtils._isFn)(tickFormatter) ? tickFormatter(tail.value, len - 1) : tail.value,
      tailSize = (0, _DOMUtils.getStringSize)(tailContent, {
        fontSize: fontSize,
        letterSpacing: letterSpacing
      })[sizeKey] + unitSize,
      tailGap = sign * (tail.coordinate + sign * tailSize / 2 - end);
    result[len - 1] = tail = (0, _extends2["default"])({}, tail, {
      tickCoord: tailGap > 0 ? tail.coordinate - tailGap * sign : tail.coordinate
    });
    var isTailShow = sign * (tail.tickCoord - sign * tailSize / 2 - start) >= 0 && sign * (tail.tickCoord + sign * tailSize / 2 - end) <= 0;
    if (isTailShow) {
      end = tail.tickCoord - sign * (tailSize / 2 + minTickGap);
      result[len - 1] = (0, _extends2["default"])({}, tail, {
        isShow: true
      });
    }
  }
  var count = preserveEnd ? len - 1 : len;
  for (var i = 0; i < count; i++) {
    var entry = result[i];
    var content = (0, _FnUtils._isFn)(tickFormatter) ? tickFormatter(entry.value, i) : entry.value,
      size = (0, _DOMUtils.getStringSize)(content, {
        fontSize: fontSize,
        letterSpacing: letterSpacing
      })[sizeKey] + unitSize;
    if (i === 0) {
      var gap = sign * (entry.coordinate - sign * size / 2 - start);
      result[i] = entry = (0, _extends2["default"])({}, entry, {
        tickCoord: gap < 0 ? entry.coordinate - gap * sign : entry.coordinate
      });
    } else {
      result[i] = entry = (0, _extends2["default"])({}, entry, {
        tickCoord: entry.coordinate
      });
    }
    var isShow = sign * (entry.tickCoord - sign * size / 2 - start) >= 0 && sign * (entry.tickCoord + sign * size / 2 - end) <= 0;
    if (isShow) {
      start = entry.tickCoord + sign * (size / 2 + minTickGap);
      result[i] = (0, _extends2["default"])({}, entry, {
        isShow: true
      });
    }
  }
  return result;
}
function getTicks(props, fontSize, letterSpacing) {
  var tick = props.tick,
    ticks = props.ticks,
    viewBox = props.viewBox,
    minTickGap = props.minTickGap,
    orientation = props.orientation,
    interval = props.interval,
    tickFormatter = props.tickFormatter,
    unit = props.unit;
  if (!ticks || !ticks.length || !tick) {
    return [];
  }
  if ((0, _DataUtils.isNumber)(interval) || _Global.Global.isSsr) {
    return getNumberIntervalTicks(ticks, typeof interval === 'number' && (0, _DataUtils.isNumber)(interval) ? interval : 0);
  }
  var _tickOptions = {
    ticks: ticks,
    tickFormatter: tickFormatter,
    viewBox: viewBox,
    orientation: orientation,
    minTickGap: minTickGap,
    unit: unit,
    fontSize: fontSize,
    letterSpacing: letterSpacing
  };
  if (interval === 'equidistantPreserveStart') {
    return getEveryNThTick(getTicksStart(_tickOptions));
  }
  var candidates = interval === 'preserveStart' || interval === 'preserveStartEnd' ? getTicksStart(_tickOptions, interval === 'preserveStartEnd') : getTicksEnd(_tickOptions);
  return candidates.filter(function (entry) {
    return entry.isShow;
  });
}
//# sourceMappingURL=getTicks.js.map