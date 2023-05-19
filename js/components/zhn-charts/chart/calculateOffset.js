"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.calculateOffset = void 0;
var _extends4 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _ReactUtils = require("../util/ReactUtils");
var _ChartUtils = require("../util/ChartUtils");
var _Brush = require("../cartesian/Brush");
var _Legend = require("../component/Legend");
var _getObjectKeys = Object.keys;
var _getPropName = function _getPropName(obj, propName) {
  return obj && propName ? obj[propName] || '' : '';
};

/**
 * Calculate the offset of main part in the svg element
 * @param  {Object} props          Latest props
 * graphicalItems The instances of item
 * xAxisMap       The configuration of x-axis
 * yAxisMap       The configuration of y-axis
 * @param  {Object} prevLegendBBox          the boundary box of legend
 * @return {Object} The offset of main part in the svg element
 */
var calculateOffset = function calculateOffset(_ref, prevLegendBBox) {
  var props = _ref.props,
    graphicalItems = _ref.graphicalItems,
    _ref$xAxisMap = _ref.xAxisMap,
    xAxisMap = _ref$xAxisMap === void 0 ? {} : _ref$xAxisMap,
    _ref$yAxisMap = _ref.yAxisMap,
    yAxisMap = _ref$yAxisMap === void 0 ? {} : _ref$yAxisMap;
  var width = props.width,
    height = props.height,
    children = props.children,
    margin = props.margin || {},
    brushItem = (0, _ReactUtils.findChildByType)(children, _Brush.Brush),
    legendItem = (0, _ReactUtils.findChildByType)(children, _Legend.Legend);
  var offsetH = _getObjectKeys(yAxisMap).reduce(function (result, id) {
    var _extends2;
    var entry = yAxisMap[id],
      orientation = entry.orientation;
    return !entry.mirror && !entry.hide ? (0, _extends4["default"])({}, result, (_extends2 = {}, _extends2[orientation] = result[orientation] + entry.width, _extends2)) : result;
  }, {
    left: margin.left || 0,
    right: margin.right || 0
  });
  var offsetV = _getObjectKeys(xAxisMap).reduce(function (result, id) {
    var _extends3;
    var entry = xAxisMap[id],
      orientation = entry.orientation;
    return !entry.mirror && !entry.hide ? (0, _extends4["default"])({}, result, (_extends3 = {}, _extends3[orientation] = _getPropName(result, "" + orientation) + entry.height, _extends3)) : result;
  }, {
    top: margin.top || 0,
    bottom: margin.bottom || 0
  });
  var offset = (0, _extends4["default"])({}, offsetV, offsetH);
  var brushBottom = offset.bottom;
  if (brushItem) {
    offset.bottom += brushItem.props.height || _Brush.Brush.defaultProps.height;
  }
  if (legendItem && prevLegendBBox) {
    offset = (0, _ChartUtils.appendOffsetOfLegend)(offset, graphicalItems, props, prevLegendBBox);
  }
  return (0, _extends4["default"])({
    brushBottom: brushBottom
  }, offset, {
    width: width - offset.left - offset.right,
    height: height - offset.top - offset.bottom
  });
};
exports.calculateOffset = calculateOffset;
//# sourceMappingURL=calculateOffset.js.map