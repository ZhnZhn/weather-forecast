"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.radianToDegree = exports.polarToCartesian = exports.inRangeOfSector = exports.getMaxRadius = exports.getAngleOfPoint = exports.formatAxisMap = exports.formatAngleOfSector = exports.distanceBetweenPoints = exports.RADIAN = void 0;
var _extends3 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _FnUtils = require("./FnUtils");
var _DataUtils = require("./DataUtils");
var _ChartUtils = require("./ChartUtils");
var _getObjetcKeys = Object.keys;
var RADIAN = Math.PI / 180;
exports.RADIAN = RADIAN;
var radianToDegree = function radianToDegree(angleInRadian) {
  return angleInRadian * 180 / Math.PI;
};
exports.radianToDegree = radianToDegree;
var polarToCartesian = function polarToCartesian(cx, cy, radius, angle) {
  return {
    x: cx + Math.cos(-RADIAN * angle) * radius,
    y: cy + Math.sin(-RADIAN * angle) * radius
  };
};
exports.polarToCartesian = polarToCartesian;
var getMaxRadius = function getMaxRadius(width, height, offset) {
  if (offset === void 0) {
    offset = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
  }
  return Math.min(Math.abs(width - (offset.left || 0) - (offset.right || 0)), Math.abs(height - (offset.top || 0) - (offset.bottom || 0))) / 2;
};

/**
 * Calculate the scale function, position, width, height of axes
 * @param  {Object} props     Latest props
 * @param  {Object} axisMap   The configuration of axes
 * @param  {Object} offset    The offset of main part in the svg element
 * @param  {Object} axisType  The type of axes, radius-axis or angle-axis
 * @param  {String} chartName The name of chart
 * @return {Object} Configuration
 */
exports.getMaxRadius = getMaxRadius;
var formatAxisMap = function formatAxisMap(props, axisMap, offset, axisType, chartName) {
  var startAngle = props.startAngle,
    endAngle = props.endAngle;
  var width = props.width,
    height = props.height,
    cx = (0, _DataUtils.getPercentValue)(props.cx, width, width / 2),
    cy = (0, _DataUtils.getPercentValue)(props.cy, height, height / 2),
    maxRadius = getMaxRadius(width, height, offset),
    innerRadius = (0, _DataUtils.getPercentValue)(props.innerRadius, maxRadius, 0),
    outerRadius = (0, _DataUtils.getPercentValue)(props.outerRadius, maxRadius, maxRadius * 0.8),
    ids = _getObjetcKeys(axisMap);
  return ids.reduce(function (result, id) {
    var _extends2;
    var axis = axisMap[id],
      domain = axis.domain,
      reversed = axis.reversed;
    var range;
    if ((0, _FnUtils._isNil)(axis.range)) {
      if (axisType === 'angleAxis') {
        range = [startAngle, endAngle];
      } else if (axisType === 'radiusAxis') {
        range = [innerRadius, outerRadius];
      }
      if (reversed) {
        range = [range[1], range[0]];
      }
    } else {
      range = axis.range;
      var _range = range;
      startAngle = _range[0];
      endAngle = _range[1];
    }
    var _parseScale = (0, _ChartUtils.parseScale)(axis, chartName),
      realScaleType = _parseScale.realScaleType,
      scale = _parseScale.scale;
    scale.domain(domain).range(range);
    (0, _ChartUtils.checkDomainOfScale)(scale);
    var ticks = (0, _ChartUtils.getTicksOfScale)(scale, (0, _extends3["default"])({}, axis, {
        realScaleType: realScaleType
      })),
      finalAxis = (0, _extends3["default"])({}, axis, ticks, {
        range: range,
        radius: outerRadius,
        realScaleType: realScaleType,
        scale: scale,
        cx: cx,
        cy: cy,
        innerRadius: innerRadius,
        outerRadius: outerRadius,
        startAngle: startAngle,
        endAngle: endAngle
      });
    return (0, _extends3["default"])({}, result, (_extends2 = {}, _extends2[id] = finalAxis, _extends2));
  }, {});
};
exports.formatAxisMap = formatAxisMap;
var distanceBetweenPoints = function distanceBetweenPoints(point, anotherPoint) {
  var x1 = point.x,
    y1 = point.y,
    x2 = anotherPoint.x,
    y2 = anotherPoint.y;
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
exports.distanceBetweenPoints = distanceBetweenPoints;
var getAngleOfPoint = function getAngleOfPoint(_ref, _ref2) {
  var x = _ref.x,
    y = _ref.y;
  var cx = _ref2.cx,
    cy = _ref2.cy;
  var radius = distanceBetweenPoints({
    x: x,
    y: y
  }, {
    x: cx,
    y: cy
  });
  if (radius <= 0) {
    return {
      radius: radius
    };
  }
  var cos = (x - cx) / radius;
  var angleInRadian = Math.acos(cos);
  if (y > cy) {
    angleInRadian = 2 * Math.PI - angleInRadian;
  }
  return {
    radius: radius,
    angle: radianToDegree(angleInRadian),
    angleInRadian: angleInRadian
  };
};
exports.getAngleOfPoint = getAngleOfPoint;
var formatAngleOfSector = function formatAngleOfSector(_ref3) {
  var startAngle = _ref3.startAngle,
    endAngle = _ref3.endAngle;
  var startCnt = Math.floor(startAngle / 360),
    endCnt = Math.floor(endAngle / 360),
    min = Math.min(startCnt, endCnt);
  return {
    startAngle: startAngle - min * 360,
    endAngle: endAngle - min * 360
  };
};
exports.formatAngleOfSector = formatAngleOfSector;
var reverseFormatAngleOfSetor = function reverseFormatAngleOfSetor(angle, _ref4) {
  var startAngle = _ref4.startAngle,
    endAngle = _ref4.endAngle;
  var startCnt = Math.floor(startAngle / 360),
    endCnt = Math.floor(endAngle / 360),
    min = Math.min(startCnt, endCnt);
  return angle + min * 360;
};
var inRangeOfSector = function inRangeOfSector(_ref5, sector) {
  var x = _ref5.x,
    y = _ref5.y;
  var _getAngleOfPoint = getAngleOfPoint({
      x: x,
      y: y
    }, sector),
    radius = _getAngleOfPoint.radius,
    angle = _getAngleOfPoint.angle,
    innerRadius = sector.innerRadius,
    outerRadius = sector.outerRadius;
  if (radius < innerRadius || radius > outerRadius) {
    return false;
  }
  if (radius === 0) {
    return true;
  }
  var _formatAngleOfSector = formatAngleOfSector(sector),
    startAngle = _formatAngleOfSector.startAngle,
    endAngle = _formatAngleOfSector.endAngle;
  var formatAngle = angle,
    inRange;
  if (startAngle <= endAngle) {
    while (formatAngle > endAngle) {
      formatAngle -= 360;
    }
    while (formatAngle < startAngle) {
      formatAngle += 360;
    }
    inRange = formatAngle >= startAngle && formatAngle <= endAngle;
  } else {
    while (formatAngle > startAngle) {
      formatAngle -= 360;
    }
    while (formatAngle < endAngle) {
      formatAngle += 360;
    }
    inRange = formatAngle >= endAngle && formatAngle <= startAngle;
  }
  return inRange ? (0, _extends3["default"])({}, sector, {
    radius: radius,
    angle: reverseFormatAngleOfSetor(formatAngle, sector)
  }) : null;
};
exports.inRangeOfSector = inRangeOfSector;
//# sourceMappingURL=PolarUtils.js.map