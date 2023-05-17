"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.rectWithPoints = exports.rectWithCoords = exports.formatAxisMap = exports.createLabeledScales = exports.ScaleHelper = void 0;
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _extends4 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _mapValues2 = _interopRequireDefault(require("lodash/mapValues"));
var _ChartUtils = require("./ChartUtils");
var _ReactUtils = require("./ReactUtils");
var _DataUtils = require("./DataUtils");
var _Bar = require("../cartesian/Bar");
var _getObjectKeys = Object.keys;

/**
 * Calculate the scale function, position, width, height of axes
 * @param  {Object} props     Latest props
 * @param  {Object} axisMap   The configuration of axes
 * @param  {Object} offset    The offset of main part in the svg element
 * @param  {String} axisType  The type of axes, x-axis or y-axis
 * @param  {String} chartName The name of chart
 * @return {Object} Configuration
 */
var formatAxisMap = function formatAxisMap(props, axisMap, offset, axisType, chartName) {
  var width = props.width,
    height = props.height,
    layout = props.layout,
    children = props.children,
    ids = _getObjectKeys(axisMap),
    steps = {
      left: offset.left,
      leftMirror: offset.left,
      right: width - offset.right,
      rightMirror: width - offset.right,
      top: offset.top,
      topMirror: offset.top,
      bottom: height - offset.bottom,
      bottomMirror: height - offset.bottom
    },
    hasBar = !!(0, _ReactUtils.findChildByType)(children, _Bar.Bar);
  return ids.reduce(function (result, id) {
    var _extends2;
    var axis = axisMap[id],
      orientation = axis.orientation,
      domain = axis.domain,
      _axis$padding = axis.padding,
      padding = _axis$padding === void 0 ? {} : _axis$padding,
      mirror = axis.mirror,
      reversed = axis.reversed,
      offsetKey = "" + orientation + (mirror ? 'Mirror' : '');
    var calculatedPadding, range, x, y, needSpace;
    if (axis.type === 'number' && (axis.padding === 'gap' || axis.padding === 'no-gap')) {
      var diff = domain[1] - domain[0];
      var smallestDistanceBetweenValues = Infinity;
      var sortedValues = axis.categoricalDomain.sort();
      sortedValues.forEach(function (value, index) {
        if (index > 0) {
          smallestDistanceBetweenValues = Math.min((value || 0) - (sortedValues[index - 1] || 0), smallestDistanceBetweenValues);
        }
      });
      var smallestDistanceInPercent = smallestDistanceBetweenValues / diff,
        rangeWidth = axis.layout === 'vertical' ? offset.height : offset.width;
      if (axis.padding === 'gap') {
        calculatedPadding = smallestDistanceInPercent * rangeWidth / 2;
      }
      if (axis.padding === 'no-gap') {
        var gap = (0, _DataUtils.getPercentValue)(props.barCategoryGap, smallestDistanceInPercent * rangeWidth),
          halfBand = smallestDistanceInPercent * rangeWidth / 2;
        calculatedPadding = halfBand - gap - (halfBand - gap) / rangeWidth * gap;
      }
    }
    if (axisType === 'xAxis') {
      range = [offset.left + (padding.left || 0) + (calculatedPadding || 0), offset.left + offset.width - (padding.right || 0) - (calculatedPadding || 0)];
    } else if (axisType === 'yAxis') {
      range = layout === 'horizontal' ? [offset.top + offset.height - (padding.bottom || 0), offset.top + (padding.top || 0)] : [offset.top + (padding.top || 0) + (calculatedPadding || 0), offset.top + offset.height - (padding.bottom || 0) - (calculatedPadding || 0)];
    } else {
      range = axis.range;
    }
    if (reversed) {
      range = [range[1], range[0]];
    }
    var _parseScale = (0, _ChartUtils.parseScale)(axis, chartName, hasBar),
      scale = _parseScale.scale,
      realScaleType = _parseScale.realScaleType;
    scale.domain(domain).range(range);
    (0, _ChartUtils.checkDomainOfScale)(scale);
    var ticks = (0, _ChartUtils.getTicksOfScale)(scale, (0, _extends4["default"])({}, axis, {
      realScaleType: realScaleType
    }));
    if (axisType === 'xAxis') {
      needSpace = orientation === 'top' && !mirror || orientation === 'bottom' && mirror;
      x = offset.left;
      y = steps[offsetKey] - needSpace * axis.height;
    } else if (axisType === 'yAxis') {
      needSpace = orientation === 'left' && !mirror || orientation === 'right' && mirror;
      x = steps[offsetKey] - needSpace * axis.width;
      y = offset.top;
    }
    var finalAxis = (0, _extends4["default"])({}, axis, ticks, {
      realScaleType: realScaleType,
      x: x,
      y: y,
      scale: scale,
      width: axisType === 'xAxis' ? offset.width : axis.width,
      height: axisType === 'yAxis' ? offset.height : axis.height
    });
    finalAxis.bandSize = (0, _ChartUtils.getBandSizeOfAxis)(finalAxis, ticks);
    if (!axis.hide && axisType === 'xAxis') {
      steps[offsetKey] += (needSpace ? -1 : 1) * finalAxis.height;
    } else if (!axis.hide) {
      steps[offsetKey] += (needSpace ? -1 : 1) * finalAxis.width;
    }
    return (0, _extends4["default"])({}, result, (_extends2 = {}, _extends2[id] = finalAxis, _extends2));
  }, {});
};
exports.formatAxisMap = formatAxisMap;
var rectWithPoints = function rectWithPoints(_ref, _ref2) {
  var x1 = _ref.x,
    y1 = _ref.y;
  var x2 = _ref2.x,
    y2 = _ref2.y;
  return {
    x: Math.min(x1, x2),
    y: Math.min(y1, y2),
    width: Math.abs(x2 - x1),
    height: Math.abs(y2 - y1)
  };
};

/**
 * Compute the x, y, width, and height of a box from two reference points.
 * @param  {Object} coords     x1, x2, y1, and y2
 * @return {Object} object
 */
exports.rectWithPoints = rectWithPoints;
var rectWithCoords = function rectWithCoords(_ref3) {
  var x1 = _ref3.x1,
    y1 = _ref3.y1,
    x2 = _ref3.x2,
    y2 = _ref3.y2;
  return rectWithPoints({
    x: x1,
    y: y1
  }, {
    x: x2,
    y: y2
  });
};
exports.rectWithCoords = rectWithCoords;
var ScaleHelper = /*#__PURE__*/function () {
  ScaleHelper.create = function create(obj) {
    return new ScaleHelper(obj);
  };
  function ScaleHelper(scale) {
    this.scale = scale;
  }
  var _proto = ScaleHelper.prototype;
  _proto.apply = function apply(value, _temp) {
    var _ref4 = _temp === void 0 ? {} : _temp,
      bandAware = _ref4.bandAware,
      position = _ref4.position;
    if (value === undefined) {
      return;
    }
    if (position) {
      switch (position) {
        case 'start':
          {
            return this.scale(value);
          }
        case 'middle':
          {
            var offset = this.bandwidth ? this.bandwidth() / 2 : 0;
            return this.scale(value) + offset;
          }
        case 'end':
          {
            var _offset = this.bandwidth ? this.bandwidth() : 0;
            return this.scale(value) + _offset;
          }
        default:
          {
            return this.scale(value);
          }
      }
    }
    if (bandAware) {
      var _offset2 = this.bandwidth ? this.bandwidth() / 2 : 0;
      return this.scale(value) + _offset2;
    }
    return this.scale(value);
  };
  _proto.isInRange = function isInRange(value) {
    var range = this.range(),
      first = range[0],
      last = range[range.length - 1];
    return first <= last ? value >= first && value <= last : value >= last && value <= first;
  };
  (0, _createClass2["default"])(ScaleHelper, [{
    key: "domain",
    get: function get() {
      return this.scale.domain;
    }
  }, {
    key: "range",
    get: function get() {
      return this.scale.range;
    }
  }, {
    key: "rangeMin",
    get: function get() {
      return this.range()[0];
    }
  }, {
    key: "rangeMax",
    get: function get() {
      return this.range()[1];
    }
  }, {
    key: "bandwidth",
    get: function get() {
      return this.scale.bandwidth;
    }
  }]);
  return ScaleHelper;
}();
exports.ScaleHelper = ScaleHelper;
ScaleHelper.EPS = 1e-4;
var createLabeledScales = function createLabeledScales(options) {
  var scales = _getObjectKeys(options).reduce(function (res, key) {
    var _extends3;
    return (0, _extends4["default"])({}, res, (_extends3 = {}, _extends3[key] = ScaleHelper.create(options[key]), _extends3));
  }, {});
  return (0, _extends4["default"])({}, scales, {
    apply: function apply(coord, _temp2) {
      var _ref5 = _temp2 === void 0 ? {} : _temp2,
        bandAware = _ref5.bandAware,
        position = _ref5.position;
      return (0, _mapValues2["default"])(coord, function (value, label) {
        return scales[label].apply(value, {
          bandAware: bandAware,
          position: position
        });
      });
    },
    isInRange: function isInRange(coord) {
      return coord.every(function (value, label) {
        return scales[label].isInRange(value);
      });
    }
  });
};
exports.createLabeledScales = createLabeledScales;
//# sourceMappingURL=CartesianUtils.js.map