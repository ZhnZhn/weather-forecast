"use strict";

exports.__esModule = true;
exports.getLabel = exports.getAttrsOfCartesianLabel = void 0;
var _isTypeFn = require("../../../utils/isTypeFn");
var _DataUtils = require("../util/DataUtils");
const getLabel = props => {
  const {
      value,
      formatter
    } = props,
    label = (0, _isTypeFn.isNullOrUndef)(props.children) ? value : props.children;
  return (0, _isTypeFn.isFn)(formatter) ? formatter(label) : label;
};
exports.getLabel = getLabel;
const getAttrsOfCartesianLabel = props => {
  const {
      viewBox,
      parentViewBox,
      offset,
      position
    } = props,
    {
      x,
      y,
      width,
      height
    } = viewBox
    // Define vertical offsets and position inverts based on the value being positive or negative
    ,
    verticalSign = height >= 0 ? 1 : -1,
    verticalOffset = verticalSign * offset,
    verticalEnd = verticalSign > 0 ? 'end' : 'start',
    verticalStart = verticalSign > 0 ? 'start' : 'end'
    // Define horizontal offsets and position inverts based on the value being positive or negative
    ,
    horizontalSign = width >= 0 ? 1 : -1,
    horizontalOffset = horizontalSign * offset,
    horizontalEnd = horizontalSign > 0 ? 'end' : 'start',
    horizontalStart = horizontalSign > 0 ? 'start' : 'end';
  if (position === 'top') {
    const attrs = {
      x: x + width / 2,
      y: y - verticalSign * offset,
      textAnchor: 'middle',
      verticalAnchor: verticalEnd
    };
    return {
      ...attrs,
      ...(parentViewBox ? {
        height: Math.max(y - parentViewBox.y, 0),
        width
      } : {})
    };
  }
  if (position === 'bottom') {
    const attrs = {
      x: x + width / 2,
      y: y + height + verticalOffset,
      textAnchor: 'middle',
      verticalAnchor: verticalStart
    };
    return {
      ...attrs,
      ...(parentViewBox ? {
        height: Math.max(parentViewBox.y + parentViewBox.height - (y + height), 0),
        width
      } : {})
    };
  }
  if (position === 'left') {
    const attrs = {
      x: x - horizontalOffset,
      y: y + height / 2,
      textAnchor: horizontalEnd,
      verticalAnchor: 'middle'
    };
    return {
      ...attrs,
      ...(parentViewBox ? {
        width: Math.max(attrs.x - parentViewBox.x, 0),
        height
      } : {})
    };
  }
  if (position === 'right') {
    const attrs = {
      x: x + width + horizontalOffset,
      y: y + height / 2,
      textAnchor: horizontalStart,
      verticalAnchor: 'middle'
    };
    return {
      ...attrs,
      ...(parentViewBox ? {
        width: Math.max(parentViewBox.x + parentViewBox.width - attrs.x, 0),
        height
      } : {})
    };
  }
  const sizeAttrs = parentViewBox ? {
    width,
    height
  } : {};
  if (position === 'insideLeft') {
    return {
      x: x + horizontalOffset,
      y: y + height / 2,
      textAnchor: horizontalStart,
      verticalAnchor: 'middle',
      ...sizeAttrs
    };
  }
  if (position === 'insideRight') {
    return {
      x: x + width - horizontalOffset,
      y: y + height / 2,
      textAnchor: horizontalEnd,
      verticalAnchor: 'middle',
      ...sizeAttrs
    };
  }
  if (position === 'insideTop') {
    return {
      x: x + width / 2,
      y: y + verticalOffset,
      textAnchor: 'middle',
      verticalAnchor: verticalStart,
      ...sizeAttrs
    };
  }
  if (position === 'insideBottom') {
    return {
      x: x + width / 2,
      y: y + height - verticalOffset,
      textAnchor: 'middle',
      verticalAnchor: verticalEnd,
      ...sizeAttrs
    };
  }
  if (position === 'insideTopLeft') {
    return {
      x: x + horizontalOffset,
      y: y + verticalOffset,
      textAnchor: horizontalStart,
      verticalAnchor: verticalStart,
      ...sizeAttrs
    };
  }
  if (position === 'insideTopRight') {
    return {
      x: x + width - horizontalOffset,
      y: y + verticalOffset,
      textAnchor: horizontalEnd,
      verticalAnchor: verticalStart,
      ...sizeAttrs
    };
  }
  if (position === 'insideBottomLeft') {
    return {
      x: x + horizontalOffset,
      y: y + height - verticalOffset,
      textAnchor: horizontalStart,
      verticalAnchor: verticalEnd,
      ...sizeAttrs
    };
  }
  if (position === 'insideBottomRight') {
    return {
      x: x + width - horizontalOffset,
      y: y + height - verticalOffset,
      textAnchor: horizontalEnd,
      verticalAnchor: verticalEnd,
      ...sizeAttrs
    };
  }
  if ((0, _isTypeFn.isObj)(position) && ((0, _DataUtils.isNumber)(position.x) || (0, _DataUtils.isPercent)(position.x)) && ((0, _DataUtils.isNumber)(position.y) || (0, _DataUtils.isPercent)(position.y))) {
    return {
      x: x + (0, _DataUtils.getPercentValue)(position.x, width),
      y: y + (0, _DataUtils.getPercentValue)(position.y, height),
      textAnchor: 'end',
      verticalAnchor: 'end',
      ...sizeAttrs
    };
  }
  return {
    x: x + width / 2,
    y: y + height / 2,
    textAnchor: 'middle',
    verticalAnchor: 'middle',
    ...sizeAttrs
  };
};
exports.getAttrsOfCartesianLabel = getAttrsOfCartesianLabel;
//# sourceMappingURL=LabelFn.js.map