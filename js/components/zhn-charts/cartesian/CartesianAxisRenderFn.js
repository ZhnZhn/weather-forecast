"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.getTickLineCoord = exports.getTickAnchors = exports.getClassName = exports.getCartesianAxisTicks = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _isTypeFn = require("../../../utils/isTypeFn");
var _getTicks = require("./getTicks");
const _excluded = ["ticks", "ticksGenerator"];
const getClassName = obj => obj ? obj.className : void 0;
exports.getClassName = getClassName;
const _crFinalTicks = props => {
  const {
      ticks,
      ticksGenerator
    } = props,
    noTicksProps = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  return (0, _isTypeFn.isFn)(ticksGenerator) ? ticks && ticks.length > 0 ? ticksGenerator(props) : ticksGenerator(noTicksProps) : ticks;
};
const getCartesianAxisTicks = (props, fontSize, letterSpacing) => {
  const finalTicks = _crFinalTicks(props);
  return (0, _isTypeFn.isNotEmptyArr)(finalTicks) ? (0, _getTicks.getTicks)(Object.assign({}, props, {
    ticks: finalTicks
  }), fontSize, letterSpacing) : void 0;
};

//[textAnchor, verticalAnchor]
exports.getCartesianAxisTicks = getCartesianAxisTicks;
const getTickAnchors = (orientation, mirror) => [orientation === 'left' ? mirror ? 'start' : 'end' : orientation === 'right' ? mirror ? 'end' : 'start' : 'middle', orientation === 'left' || orientation === 'right' ? 'middle' : orientation === 'top' ? mirror ? 'start' : 'end' : mirror ? 'end' : 'start'];

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
      //mirror,
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