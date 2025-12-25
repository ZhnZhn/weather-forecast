"use strict";

exports.__esModule = true;
exports.labelTopFn = exports.labelRightFn = exports.labelPositionFn = exports.labelLeftFn = exports.labelBottomFn = void 0;
const _mathMax = Math.max;
const _crSign = value => value >= 0 ? 1 : -1;
const _crAnchorEnd = sign => sign > 0 ? 'end' : 'start';
const _crAnchorStart = sign => sign > 0 ? 'start' : 'end';
const _crAttrs = (x, y, textAnchor, verticalAnchor) => ({
  x,
  y,
  textAnchor,
  verticalAnchor
});
const labelPositionFn = (viewBox, parentViewBox) => {
  const {
      x,
      y,
      width,
      height
    } = viewBox,
    sizeAttrs = parentViewBox ? {
      width,
      height
    } : void 0;
  return {
    ..._crAttrs(x + width / 2, y + height / 2, 'middle', 'middle'),
    ...sizeAttrs
  };
};
exports.labelPositionFn = labelPositionFn;
const labelTopFn = (viewBox, parentViewBox, offset, xTopOffset) => {
  const {
      x,
      y,
      width,
      height
    } = viewBox,
    verticalSign = _crSign(height);
  return {
    ..._crAttrs(x + width / 2 + xTopOffset, y - verticalSign * offset, 'middle', _crAnchorEnd(verticalSign)),
    ...(parentViewBox ? {
      height: _mathMax(y - parentViewBox.y, 0),
      width
    } : void 0)
  };
};
exports.labelTopFn = labelTopFn;
const labelBottomFn = (viewBox, parentViewBox, offset) => {
  const {
      x,
      y,
      width,
      height
    } = viewBox,
    verticalSign = _crSign(height),
    verticalOffset = verticalSign * offset;
  return {
    ..._crAttrs(x + width / 2, y + height + verticalOffset, 'middle', _crAnchorStart(verticalSign)),
    ...(parentViewBox ? {
      height: _mathMax(parentViewBox.y + parentViewBox.height - (y + height), 0),
      width
    } : void 0)
  };
};
exports.labelBottomFn = labelBottomFn;
const labelLeftFn = (viewBox, parentViewBox, offset) => {
  const {
      x,
      y,
      width,
      height
    } = viewBox,
    horizontalSign = _crSign(width),
    horizontalOffset = horizontalSign * offset,
    attrs = _crAttrs(x - horizontalOffset, y + height / 2, _crAnchorEnd(horizontalSign), 'middle');
  return {
    ...attrs,
    ...(parentViewBox ? {
      width: _mathMax(attrs.x - parentViewBox.x, 0),
      height
    } : void 0)
  };
};
exports.labelLeftFn = labelLeftFn;
const labelRightFn = (viewBox, parentViewBox, offset) => {
  const {
      x,
      y,
      width,
      height
    } = viewBox,
    horizontalSign = _crSign(width),
    horizontalOffset = horizontalSign * offset,
    attrs = _crAttrs(x + width + horizontalOffset, y + height / 2, _crAnchorStart(horizontalSign), 'middle');
  return {
    ...attrs,
    ...(parentViewBox ? {
      width: _mathMax(parentViewBox.x + parentViewBox.width - attrs.x, 0),
      height
    } : void 0)
  };
};
exports.labelRightFn = labelRightFn;
//# sourceMappingURL=LabelPositionFn.js.map