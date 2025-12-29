"use strict";

exports.__esModule = true;
exports.getTickLineCoord = exports.getTickAnchors = exports.getClassName = exports.getCartesianAxisTicks = void 0;
var _isTypeFn = require("../../../utils/isTypeFn");
var _CartesianUtils = require("../util/CartesianUtils");
var _getTicks = require("./getTicks");
const getClassName = obj => obj ? obj.className : void 0;
exports.getClassName = getClassName;
const _crFinalTicks = props => {
  const {
    ticks,
    ticksGenerator,
    ...noTicksProps
  } = props;
  return (0, _isTypeFn.isFn)(ticksGenerator) ? (0, _isTypeFn.isNotEmptyArr)(ticks) ? ticksGenerator(props) : ticksGenerator(noTicksProps) : ticks;
};
const getCartesianAxisTicks = (props, fontSize, letterSpacing) => {
  const finalTicks = _crFinalTicks(props);
  return (0, _isTypeFn.isNotEmptyArr)(finalTicks) ? (0, _getTicks.getTicks)({
    ...props,
    ticks: finalTicks
  }, fontSize, letterSpacing) : void 0;
};
exports.getCartesianAxisTicks = getCartesianAxisTicks;
const _getStartEnd = mirror => mirror ? 'start' : 'end';

//[textAnchor, verticalAnchor]
const getTickAnchors = (orientation, mirror) => {
  const _isLeft = (0, _CartesianUtils.isOrientationLeft)(orientation),
    _isRight = (0, _CartesianUtils.isOrientationRight)(orientation);
  return [_isLeft ? _getStartEnd(mirror) : _isRight ? _getStartEnd(!mirror) : 'middle', _isLeft || _isRight ? 'middle' : (0, _CartesianUtils.isOrientationTop)(orientation) ? _getStartEnd(mirror) : _getStartEnd(!mirror)];
};

/**
 * Calculate the coordinates of endpoints in ticks
 * @param  {Object} data The data of a simple tick
 * @return {Object} (x1, y1): The coordinate of endpoint close to tick text
 *  (x2, y2): The coordinate of endpoint close to axis
 */
exports.getTickAnchors = getTickAnchors;
const getTickLineCoord = (props, data) => {
  const {
      x,
      y,
      width,
      height,
      tickMargin
    } = props,
    [sign, notMirrorNumber, mirrorNumber] = props.mirror ? [-1, 0, 1] : [1, 1, 0],
    _tickSize = data.tickSize || props.tickSize,
    {
      tickCoord,
      coordinate
    } = data,
    _tickCoord = (0, _isTypeFn.isNumber)(tickCoord) ? tickCoord : coordinate;
  let x1, x2, y1, y2, tx, ty;
  switch (props.orientation) {
    case 'top':
      x1 = x2 = coordinate;
      y2 = y + notMirrorNumber * height;
      y1 = y2 - sign * _tickSize;
      ty = y1 - sign * tickMargin;
      tx = _tickCoord;
      break;
    case 'left':
      y1 = y2 = coordinate;
      x2 = x + notMirrorNumber * width;
      x1 = x2 - sign * _tickSize;
      tx = x1 - sign * tickMargin;
      ty = _tickCoord;
      break;
    case 'right':
      y1 = y2 = coordinate;
      x2 = x + mirrorNumber * width;
      x1 = x2 + sign * _tickSize;
      tx = x1 + sign * tickMargin;
      ty = _tickCoord;
      break;
    default:
      x1 = x2 = coordinate;
      y2 = y + mirrorNumber * height;
      y1 = y2 + sign * _tickSize;
      ty = y1 + sign * tickMargin;
      tx = _tickCoord;
      break;
  }
  return {
    line: {
      x1,
      y1,
      x2,
      y2
    },
    tick: {
      x: tx,
      y: ty
    }
  };
};
exports.getTickLineCoord = getTickLineCoord;
//# sourceMappingURL=CartesianAxisRenderFn.js.map