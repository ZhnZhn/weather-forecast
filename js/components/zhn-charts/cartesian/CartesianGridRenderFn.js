"use strict";

exports.__esModule = true;
exports.getStripeLineDimension = exports.crStripeRectProps = exports.crRoundedSortedPoints = exports.crGridPoints = void 0;
var _isTypeFn = require("../../../utils/isTypeFn");
var _CL = require("../CL");
const _crPoints = (points, pointsGenerator, generatorOptions) => !(0, _isTypeFn.isNotEmptyArr)(points) && (0, _isTypeFn.isFn)(pointsGenerator) ? pointsGenerator(generatorOptions) : points;
const crGridPoints = (horizontalCoordinatesGenerator, verticalCoordinatesGenerator, xAxis, yAxis, horizontalPoints, verticalPoints, generatorOptions) => [_crPoints(horizontalPoints, horizontalCoordinatesGenerator, Object.assign({}, generatorOptions, {
  yAxis
})), _crPoints(verticalPoints, verticalCoordinatesGenerator, Object.assign({}, generatorOptions, {
  xAxis
}))];
exports.crGridPoints = crGridPoints;
const _mathRound = Math.round;
const crRoundedSortedPoints = (points, x) => {
  const roundedSortedPoints = points.map(e => _mathRound(e + x - x)).sort((a, b) => a - b);
  if (x !== roundedSortedPoints[0]) {
    roundedSortedPoints.unshift(0);
  }
  return roundedSortedPoints;
};
exports.crRoundedSortedPoints = crRoundedSortedPoints;
const getStripeLineDimension = (p0, entry, i, points) => !points[i + 1] ? p0 - entry : points[i + 1] - entry;
exports.getStripeLineDimension = getStripeLineDimension;
const crStripeRectProps = (arrFill, index, fillOpacity) => ({
  className: _CL.CL_BG,
  stroke: "none",
  fill: arrFill[index % arrFill.length],
  fillOpacity
});
exports.crStripeRectProps = crStripeRectProps;
//# sourceMappingURL=CartesianGridRenderFn.js.map