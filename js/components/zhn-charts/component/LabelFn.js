"use strict";

exports.__esModule = true;
exports.getLabel = exports.getAttrsOfCartesianLabel = void 0;
var _isTypeFn = require("../../../utils/isTypeFn");
var _DataUtils = require("../util/DataUtils");
const _mathMax = Math.max,
  _isNumberOrPercent = value => (0, _isTypeFn.isNumber)(value) || (0, _DataUtils.isPercent)(value);
const getLabel = props => {
  const {
      value,
      formatter
    } = props,
    label = props.children == null ? value : props.children;
  return (0, _isTypeFn.isFn)(formatter) ? formatter(label) : label;
};
exports.getLabel = getLabel;
const _crAttrs = (x, y, textAnchor, verticalAnchor) => ({
  x,
  y,
  textAnchor,
  verticalAnchor
});

/*
const _crSign = (
  value
) => value >= 0 ? 1 : -1;
const _crAnchorEndStart = (sign) => [
  sign > 0 ? 'end' : 'start',
  sign > 0 ? 'start' : 'end'
];
*/

const _crLabelConfig = (value, offset) => {
  const sign = value >= 0 ? 1 : -1;
  return [sign * offset, sign > 0 ? 'end' : 'start', sign > 0 ? 'start' : 'end', sign];
};
const getAttrsOfCartesianLabel = props => {
  const {
      viewBox,
      parentViewBox,
      offset,
      position,
      xTopOffset = 0
    } = props,
    {
      x,
      y,
      width,
      height
    } = viewBox
    // Define vertical offsets and position inverts based on the value being positive or negative
    ,
    [verticalOffset, verticalEnd, verticalStart, verticalSign] = _crLabelConfig(height, offset)
    // Define horizontal offsets and position inverts based on the value being positive or negative
    ,
    [horizontalOffset, horizontalEnd, horizontalStart] = _crLabelConfig(width, offset);
  if (position === 'top') {
    return {
      ..._crAttrs(x + width / 2 + xTopOffset, y - verticalSign * offset, 'middle', verticalEnd),
      ...(parentViewBox ? {
        height: _mathMax(y - parentViewBox.y, 0),
        width
      } : void 0)
    };
  }
  if (position === 'bottom') {
    return {
      ..._crAttrs(x + width / 2, y + height + verticalOffset, 'middle', verticalStart),
      ...(parentViewBox ? {
        height: _mathMax(parentViewBox.y + parentViewBox.height - (y + height), 0),
        width
      } : void 0)
    };
  }
  if (position === 'left') {
    const attrs = _crAttrs(x - horizontalOffset, y + height / 2, horizontalEnd, 'middle');
    return {
      ...attrs,
      ...(parentViewBox ? {
        width: _mathMax(attrs.x - parentViewBox.x, 0),
        height
      } : void 0)
    };
  }
  if (position === 'right') {
    const attrs = _crAttrs(x + width + horizontalOffset, y + height / 2, horizontalStart, 'middle');
    return {
      ...attrs,
      ...(parentViewBox ? {
        width: _mathMax(parentViewBox.x + parentViewBox.width - attrs.x, 0),
        height
      } : void 0)
    };
  }
  const sizeAttrs = parentViewBox ? {
    width,
    height
  } : void 0;
  if (position === 'insideLeft') {
    return {
      ..._crAttrs(x + horizontalOffset, y + height / 2, horizontalStart, 'middle'),
      ...sizeAttrs
    };
  }
  if (position === 'insideRight') {
    return {
      ..._crAttrs(x + width - horizontalOffset, y + height / 2, horizontalEnd, 'middle'),
      ...sizeAttrs
    };
  }
  if (position === 'insideTop') {
    return {
      ..._crAttrs(x + width / 2, y + verticalOffset, 'middle', verticalStart),
      ...sizeAttrs
    };
  }
  if (position === 'insideBottom') {
    return {
      ..._crAttrs(x + width / 2, y + height - verticalOffset, 'middle', verticalEnd),
      ...sizeAttrs
    };
  }
  if (position === 'insideTopLeft') {
    return {
      ..._crAttrs(x + horizontalOffset, y + verticalOffset, horizontalStart, verticalStart),
      ...sizeAttrs
    };
  }
  if (position === 'insideTopRight') {
    return {
      ..._crAttrs(x + width - horizontalOffset, y + verticalOffset, horizontalEnd, verticalStart),
      ...sizeAttrs
    };
  }
  if (position === 'insideBottomLeft') {
    return {
      ..._crAttrs(x + horizontalOffset, y + height - verticalOffset, horizontalStart, verticalEnd),
      ...sizeAttrs
    };
  }
  if (position === 'insideBottomRight') {
    return {
      ..._crAttrs(x + width - horizontalOffset, y + height - verticalOffset, horizontalEnd, verticalEnd),
      ...sizeAttrs
    };
  }
  if ((0, _isTypeFn.isObj)(position) && _isNumberOrPercent(position.x) && _isNumberOrPercent(position.y)) {
    return {
      ..._crAttrs(x + (0, _DataUtils.getPercentValue)(position.x, width), y + (0, _DataUtils.getPercentValue)(position.y, height), 'end', 'end'),
      ...sizeAttrs
    };
  }
  return {
    ..._crAttrs(x + width / 2, y + height / 2, 'middle', 'middle'),
    ...sizeAttrs
  };
};
exports.getAttrsOfCartesianLabel = getAttrsOfCartesianLabel;
//# sourceMappingURL=LabelFn.js.map