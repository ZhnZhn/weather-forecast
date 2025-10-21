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
const _crAttrs = (x, y, textAnchor, verticalAnchor) => ({
  x,
  y,
  textAnchor,
  verticalAnchor
});
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
    return Object.assign({}, _crAttrs(x + width / 2 + xTopOffset, y - verticalSign * offset, 'middle', verticalEnd), parentViewBox ? {
      height: Math.max(y - parentViewBox.y, 0),
      width
    } : {});
  }
  if (position === 'bottom') {
    return Object.assign({}, _crAttrs(x + width / 2, y + height + verticalOffset, 'middle', verticalStart), parentViewBox ? {
      height: Math.max(parentViewBox.y + parentViewBox.height - (y + height), 0),
      width
    } : {});
  }
  if (position === 'left') {
    const attrs = _crAttrs(x - horizontalOffset, y + height / 2, horizontalEnd, 'middle');
    return Object.assign({}, attrs, parentViewBox ? {
      width: Math.max(attrs.x - parentViewBox.x, 0),
      height
    } : {});
  }
  if (position === 'right') {
    const attrs = _crAttrs(x + width + horizontalOffset, y + height / 2, horizontalStart, 'middle');
    return Object.assign({}, attrs, parentViewBox ? {
      width: Math.max(parentViewBox.x + parentViewBox.width - attrs.x, 0),
      height
    } : {});
  }
  const sizeAttrs = parentViewBox ? {
    width,
    height
  } : {};
  if (position === 'insideLeft') {
    return Object.assign({}, _crAttrs(x + horizontalOffset, y + height / 2, horizontalStart, 'middle'), sizeAttrs);
  }
  if (position === 'insideRight') {
    return Object.assign({}, _crAttrs(x + width - horizontalOffset, y + height / 2, horizontalEnd, 'middle'), sizeAttrs);
  }
  if (position === 'insideTop') {
    return Object.assign({}, _crAttrs(x + width / 2, y + verticalOffset, 'middle', verticalStart), sizeAttrs);
  }
  if (position === 'insideBottom') {
    return Object.assign({}, _crAttrs(x + width / 2, y + height - verticalOffset, 'middle', verticalEnd), sizeAttrs);
  }
  if (position === 'insideTopLeft') {
    return Object.assign({}, _crAttrs(x + horizontalOffset, y + verticalOffset, horizontalStart, verticalStart), sizeAttrs);
  }
  if (position === 'insideTopRight') {
    return Object.assign({}, _crAttrs(x + width - horizontalOffset, y + verticalOffset, horizontalEnd, verticalStart), sizeAttrs);
  }
  if (position === 'insideBottomLeft') {
    return Object.assign({}, _crAttrs(x + horizontalOffset, y + height - verticalOffset, horizontalStart, verticalEnd), sizeAttrs);
  }
  if (position === 'insideBottomRight') {
    return Object.assign({}, _crAttrs(x + width - horizontalOffset, y + height - verticalOffset, horizontalEnd, verticalEnd), sizeAttrs);
  }
  if ((0, _isTypeFn.isObj)(position) && ((0, _DataUtils.isNumber)(position.x) || (0, _DataUtils.isPercent)(position.x)) && ((0, _DataUtils.isNumber)(position.y) || (0, _DataUtils.isPercent)(position.y))) {
    return Object.assign({}, _crAttrs(x + (0, _DataUtils.getPercentValue)(position.x, width), y + (0, _DataUtils.getPercentValue)(position.y, height), 'end', 'end'), sizeAttrs);
  }
  return Object.assign({}, _crAttrs(x + width / 2, y + height / 2, 'middle', 'middle'), sizeAttrs);
};
exports.getAttrsOfCartesianLabel = getAttrsOfCartesianLabel;
//# sourceMappingURL=LabelFn.js.map