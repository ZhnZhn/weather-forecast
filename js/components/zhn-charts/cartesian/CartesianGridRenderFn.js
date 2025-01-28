"use strict";

exports.__esModule = true;
exports.isPoints = exports.getStripeLineDimension = exports.getFillByIndex = exports.crRoundedSortedPoints = exports.crGridPoints = void 0;
var _FnUtils = require("../util/FnUtils");
const isPoints = points => points && points.length;
exports.isPoints = isPoints;
const _crPoints = (points, pointsGenerator, generatorOptions) => !isPoints(points) && (0, _FnUtils._isFn)(pointsGenerator) ? pointsGenerator(generatorOptions) : points;
const crGridPoints = props => {
  const {
      horizontalCoordinatesGenerator,
      verticalCoordinatesGenerator,
      xAxis,
      yAxis,
      offset,
      chartWidth,
      chartHeight
    } = props,
    _generatorOptions = {
      width: chartWidth,
      height: chartHeight,
      offset
    };
  return [_crPoints(props.horizontalPoints, horizontalCoordinatesGenerator, {
    ..._generatorOptions,
    yAxis
  }), _crPoints(props.verticalPoints, verticalCoordinatesGenerator, {
    ..._generatorOptions,
    xAxis
  })];
};
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
const getFillByIndex = (arrFill, index) => arrFill[index % arrFill.length];
exports.getFillByIndex = getFillByIndex;
const getStripeLineDimension = (p0, entry, i, points) => !points[i + 1] ? p0 - entry : points[i + 1] - entry;
exports.getStripeLineDimension = getStripeLineDimension;
//# sourceMappingURL=CartesianGridRenderFn.js.map