"use strict";

exports.__esModule = true;
exports.getTickLineCoord = exports.getTickAnchors = exports.getClassName = exports.crFinalTicks = void 0;
var _FnUtils = require("../util/FnUtils");
var _DataUtils = require("../util/DataUtils");
const getClassName = obj => obj ? obj.className : void 0;
exports.getClassName = getClassName;
const crFinalTicks = props => {
  const {
    ticks,
    ticksGenerator,
    ...noTicksProps
  } = props;
  return (0, _FnUtils._isFn)(ticksGenerator) ? ticks && ticks.length > 0 ? ticksGenerator(props) : ticksGenerator(noTicksProps) : ticks;
};

//[textAnchor, verticalAnchor]
exports.crFinalTicks = crFinalTicks;
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
      orientation,
      tickSize,
      mirror,
      tickMargin
    } = props,
    sign = mirror ? -1 : 1,
    finalTickSize = data.tickSize || tickSize,
    tickCoord = (0, _DataUtils.isNumber)(data.tickCoord) ? data.tickCoord : data.coordinate;
  let x1, x2, y1, y2, tx, ty;
  switch (orientation) {
    case 'top':
      x1 = x2 = data.coordinate;
      y2 = y + +!mirror * height;
      y1 = y2 - sign * finalTickSize;
      ty = y1 - sign * tickMargin;
      tx = tickCoord;
      break;
    case 'left':
      y1 = y2 = data.coordinate;
      x2 = x + +!mirror * width;
      x1 = x2 - sign * finalTickSize;
      tx = x1 - sign * tickMargin;
      ty = tickCoord;
      break;
    case 'right':
      y1 = y2 = data.coordinate;
      x2 = x + +mirror * width;
      x1 = x2 + sign * finalTickSize;
      tx = x1 + sign * tickMargin;
      ty = tickCoord;
      break;
    default:
      x1 = x2 = data.coordinate;
      y2 = y + +mirror * height;
      y1 = y2 + sign * finalTickSize;
      ty = y1 + sign * tickMargin;
      tx = tickCoord;
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