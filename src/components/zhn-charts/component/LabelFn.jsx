import {
  isFn,
  isNullOrUndef,
  isObj
} from '../../../utils/isTypeFn';

import {
  isNumber,
  isPercent,
  getPercentValue
} from '../util/DataUtils';

export const getLabel = (
  props
) => {
  const {
    value,
    formatter
  } = props
  , label = isNullOrUndef(props.children)
    ? value
    : props.children;
  return isFn(formatter)
    ? formatter(label)
    : label;
};

const _crAttrs = (
  x,
  y,
  textAnchor,
  verticalAnchor
) => ({
  x,
  y,
  textAnchor,
  verticalAnchor
});

export const getAttrsOfCartesianLabel = (
  props
) => {
  const {
    viewBox,
    parentViewBox,
    offset,
    position,
    xTopOffset=0
  } = props
  , {
    x,
    y,
    width,
    height
  } = viewBox
  // Define vertical offsets and position inverts based on the value being positive or negative
  , verticalSign = height >= 0 ? 1 : -1
  , verticalOffset = verticalSign * offset
  , verticalEnd = verticalSign > 0 ? 'end' : 'start'
  , verticalStart = verticalSign > 0 ? 'start' : 'end'
  // Define horizontal offsets and position inverts based on the value being positive or negative
  , horizontalSign = width >= 0 ? 1 : -1
  , horizontalOffset = horizontalSign * offset
  , horizontalEnd = horizontalSign > 0 ? 'end' : 'start'
  , horizontalStart = horizontalSign > 0 ? 'start' : 'end';
  if (position === 'top') {
    return {
      ..._crAttrs(
        x + width / 2 + xTopOffset,
        y - verticalSign * offset,
        'middle',
        verticalEnd
      ),
      ...(parentViewBox
        ? {
            height: Math.max(y - parentViewBox.y, 0),
            width,
        }
        : {}),
    };
  }
  if (position === 'bottom') {
    return {
      ..._crAttrs(
        x + width / 2,
        y + height + verticalOffset,
        'middle',
        verticalStart
      ),
      ...(parentViewBox
        ? {
            height: Math.max(parentViewBox.y + parentViewBox.height - (y + height), 0),
            width
        }
        : {}),
    };
  }
  if (position === 'left') {
    const attrs = _crAttrs(
      x - horizontalOffset,
      y + height / 2,
      horizontalEnd,
      'middle',
    );
    return {
      ...attrs,
      ...(parentViewBox
        ? {
            width: Math.max(attrs.x - parentViewBox.x, 0),
            height
        }
        : {}),
    };
  }
  if (position === 'right') {
    const attrs = _crAttrs(
      x + width + horizontalOffset,
      y + height / 2,
      horizontalStart,
      'middle'
    );
    return {
      ...attrs,
      ...(parentViewBox
        ? {
            width: Math.max(parentViewBox.x + parentViewBox.width - attrs.x, 0),
            height
          }
        : {})
    };
  }
  const sizeAttrs = parentViewBox
    ? { width, height }
    : {};
  if (position === 'insideLeft') {
    return {
      ..._crAttrs(
        x + horizontalOffset,
        y + height / 2,
        horizontalStart,
        'middle'
      ),
      ...sizeAttrs
    };
  }
  if (position === 'insideRight') {
    return {
      ..._crAttrs(
        x + width - horizontalOffset,
        y + height / 2,
        horizontalEnd,
        'middle'
      ),
      ...sizeAttrs
    };
  }
  if (position === 'insideTop') {
    return {
      ..._crAttrs(
        x + width / 2,
        y + verticalOffset,
        'middle',
        verticalStart
      ),
      ...sizeAttrs
    };
  }
  if (position === 'insideBottom') {
    return {
      ..._crAttrs(
        x + width / 2,
        y + height - verticalOffset,
        'middle',
        verticalEnd
      ),
      ...sizeAttrs
    };
  }
  if (position === 'insideTopLeft') {
    return {
      ..._crAttrs(
        x + horizontalOffset,
        y + verticalOffset,
        horizontalStart,
        verticalStart
      ),
      ...sizeAttrs
    };
  }
  if (position === 'insideTopRight') {
    return {
      ..._crAttrs(
        x + width - horizontalOffset,
        y + verticalOffset,
        horizontalEnd,
        verticalStart
      ),
      ...sizeAttrs
    };
  }
  if (position === 'insideBottomLeft') {
    return {
      ..._crAttrs(
        x + horizontalOffset,
        y + height - verticalOffset,
        horizontalStart,
        verticalEnd
      ),
      ...sizeAttrs
    };
  }
  if (position === 'insideBottomRight') {
    return {
      ..._crAttrs(
        x + width - horizontalOffset,
        y + height - verticalOffset,
        horizontalEnd,
        verticalEnd
      ),
      ...sizeAttrs
    };
  }
  if (isObj(position)
    && (isNumber(position.x) || isPercent(position.x))
    && (isNumber(position.y) || isPercent(position.y))
  ) {
    return {
      ..._crAttrs(
        x + getPercentValue(position.x, width),
        y + getPercentValue(position.y, height),
        'end',
        'end'
      ),
      ...sizeAttrs
    };
  }
  return {
    ..._crAttrs(
      x + width / 2,
      y + height / 2,
      'middle',
      'middle'
    ),
    ...sizeAttrs
  };
};
