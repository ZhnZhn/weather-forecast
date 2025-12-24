
const _mathMax = Math.max;
const _crSign = (
  value
) => value >= 0 ? 1 : -1;
const _crAnchorEnd = (
  sign
) => sign > 0 ? 'end' : 'start';
const _crAnchorStart = (
  sign
) => sign > 0 ? 'start' : 'end';

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

export const labelPositionFn = props => {
  const {
    viewBox,
    parentViewBox
  } = props
  , {
    x,
    y,
    width,
    height
  } = viewBox
  , sizeAttrs = parentViewBox
    ? { width, height }
    : void 0;
  return {
    ..._crAttrs(
      x + width / 2,
      y + height / 2,
      'middle',
      'middle'
    ),
    ...sizeAttrs
  }
}

export const labelTopFn = (props) => {
  const {
    viewBox,
    parentViewBox,
    offset,
    xTopOffset=0
  } = props
  , {
    x,
    y,
    width,
    height
  } = viewBox
  , verticalSign = _crSign(height);
  return {
    ..._crAttrs(
      x + width / 2 + xTopOffset,
      y - verticalSign * offset,
      'middle',
      _crAnchorEnd(verticalSign)
    ),
    ...(parentViewBox
      ? {
          height: _mathMax(y - parentViewBox.y, 0),
          width,
      }
      : void 0)
  }
}

export const labelBottomFn = (props) => {
  const {
    viewBox,
    parentViewBox,
    offset
  } = props
  , {
    x,
    y,
    width,
    height
  } = viewBox
  , verticalSign = _crSign(height)
  , verticalOffset = verticalSign * offset;
  return {
    ..._crAttrs(
      x + width / 2,
      y + height + verticalOffset,
      'middle',
      _crAnchorStart(verticalSign)
    ),
    ...(parentViewBox
      ? {
          height: _mathMax(parentViewBox.y + parentViewBox.height - (y + height), 0),
          width
      }
      : void 0)
  }
}

export const labelLeftFn = props => {
  const {
    viewBox,
    parentViewBox,
    offset
  } = props
  , {
    x,
    y,
    width,
    height
  } = viewBox
  , horizontalSign = _crSign(width)
  , horizontalOffset = horizontalSign * offset
  , attrs = _crAttrs(
    x - horizontalOffset,
    y + height / 2,
    _crAnchorEnd(horizontalSign),
    'middle'
  )
  return {
    ...attrs,
    ...(parentViewBox
      ? {
          width: _mathMax(attrs.x - parentViewBox.x, 0),
          height
      }
      : void 0)
  };
}
