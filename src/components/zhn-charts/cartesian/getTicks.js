import {
  isFn,
  isNotEmptyArr
} from '../../../utils/isTypeFn';

import {
  isOrientationTop,
  isOrientationBottom
} from '../util/CartesianUtils';
import { mathSign, isNumber } from '../util/DataUtils';
import { getStringSize } from '../util/DOMUtils';
import { IS_SSR } from '../util/Global';

const _crSizeKey = (
  orientation
) => isOrientationTop(orientation) || isOrientationBottom(orientation)
  ? 'width'
  : 'height';

const _crSign = (
  result
) => result.length >= 2
  ? mathSign(result[1].coordinate - result[0].coordinate)
  : 1;

const _crStartEnd = (
  _isSizeKeyWidth,
  x,
  y,
  width,
  height,
  sign
) => {
  const _interval = [
    _isSizeKeyWidth ? x : y,
    _isSizeKeyWidth ? x + width : y + height
  ];

  return sign === 1
    ? _interval
    : _interval.reverse();
}

const _getTicksEnd = (
  ticks,
  tickFormatter,
  viewBox,
  orientation,
  minTickGap,
  unit,
  fontSize,
  letterSpacing
) => {
  const {
    x,
    y,
    width,
    height
  } = viewBox
  , sizeKey = _crSizeKey(orientation)
  // we need add the width of 'unit' only when sizeKey === 'width'
  , _isSizeKeyWidth = sizeKey === 'width'
  , unitSize = unit && _isSizeKeyWidth
      ? getStringSize(unit, { fontSize, letterSpacing })[sizeKey]
      : 0
  , result = (ticks || []).slice()
  , len = result.length
  , sign = _crSign(result);

  let [
    start,
    end
  ] = _crStartEnd(
    _isSizeKeyWidth,
    x,
    y,
    width,
    height,
    sign
  )

  for (let i = len - 1; i >= 0; i--) {
    let entry = result[i];
    const content = isFn(tickFormatter)
      ? tickFormatter(entry.value, len - i - 1)
      : entry.value
    , size = getStringSize(
       content,
       { fontSize, letterSpacing }
    )[sizeKey] + unitSize;

    if (i === len - 1) {
      const gap = sign * (entry.coordinate + (sign * size) / 2 - end);
      result[i] = entry = {
        ...entry,
        tickCoord: gap > 0
          ? entry.coordinate - gap * sign
          : entry.coordinate
      };
    } else {
      result[i] = entry = {
        ...entry,
        tickCoord: entry.coordinate
      };
    }

    const isShow = sign * (entry.tickCoord - (sign * size) / 2 - start) >= 0
      && sign * (entry.tickCoord + (sign * size) / 2 - end) <= 0;
    if (isShow) {
      end = entry.tickCoord - sign * (size / 2 + minTickGap);
      result[i] = { ...entry, isShow: true };
    }
  }
  return result;
}

const _getEveryNthTick = (
  arr,
  n
) => {
  if (n < 1) {
    return [];
  }
  if (n === 1) {
    return arr;
  }
  const result = [];
  for (let i = 0; i < arr.length; i += n) {
    result.push(arr[i]);
  }
  return result;
}

export function getTicks(
  props,
  fontSize,
  letterSpacing
) {
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

  if (!isNotEmptyArr(ticks) || !tick) {
    return [];
  }

  if (isNumber(interval) || IS_SSR) {
    return _getEveryNthTick(
      ticks,
      isNumber(interval)
        ? interval + 1
        : 1
    );
  }

  return _getTicksEnd(
    ticks,
    tickFormatter,
    viewBox,
    orientation,
    minTickGap,
    unit,
    fontSize,
    letterSpacing
  ).filter(entry => entry.isShow);
}
