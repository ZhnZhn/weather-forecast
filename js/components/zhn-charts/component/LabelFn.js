"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.getLabel = exports.getAttrsOfCartesianLabel = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _FnUtils = require("../util/FnUtils");
var _DataUtils = require("../util/DataUtils");
var getLabel = function getLabel(props) {
  var value = props.value,
    formatter = props.formatter,
    label = (0, _FnUtils._isNil)(props.children) ? value : props.children;
  return (0, _FnUtils._isFn)(formatter) ? formatter(label) : label;
};
exports.getLabel = getLabel;
var getAttrsOfCartesianLabel = function getAttrsOfCartesianLabel(props) {
  var viewBox = props.viewBox,
    parentViewBox = props.parentViewBox,
    offset = props.offset,
    position = props.position,
    x = viewBox.x,
    y = viewBox.y,
    width = viewBox.width,
    height = viewBox.height,
    verticalSign = height >= 0 ? 1 : -1,
    verticalOffset = verticalSign * offset,
    verticalEnd = verticalSign > 0 ? 'end' : 'start',
    verticalStart = verticalSign > 0 ? 'start' : 'end',
    horizontalSign = width >= 0 ? 1 : -1,
    horizontalOffset = horizontalSign * offset,
    horizontalEnd = horizontalSign > 0 ? 'end' : 'start',
    horizontalStart = horizontalSign > 0 ? 'start' : 'end';
  if (position === 'top') {
    var attrs = {
      x: x + width / 2,
      y: y - verticalSign * offset,
      textAnchor: 'middle',
      verticalAnchor: verticalEnd
    };
    return (0, _extends2["default"])({}, attrs, parentViewBox ? {
      height: Math.max(y - parentViewBox.y, 0),
      width: width
    } : {});
  }
  if (position === 'bottom') {
    var _attrs = {
      x: x + width / 2,
      y: y + height + verticalOffset,
      textAnchor: 'middle',
      verticalAnchor: verticalStart
    };
    return (0, _extends2["default"])({}, _attrs, parentViewBox ? {
      height: Math.max(parentViewBox.y + parentViewBox.height - (y + height), 0),
      width: width
    } : {});
  }
  if (position === 'left') {
    var _attrs2 = {
      x: x - horizontalOffset,
      y: y + height / 2,
      textAnchor: horizontalEnd,
      verticalAnchor: 'middle'
    };
    return (0, _extends2["default"])({}, _attrs2, parentViewBox ? {
      width: Math.max(_attrs2.x - parentViewBox.x, 0),
      height: height
    } : {});
  }
  if (position === 'right') {
    var _attrs3 = {
      x: x + width + horizontalOffset,
      y: y + height / 2,
      textAnchor: horizontalStart,
      verticalAnchor: 'middle'
    };
    return (0, _extends2["default"])({}, _attrs3, parentViewBox ? {
      width: Math.max(parentViewBox.x + parentViewBox.width - _attrs3.x, 0),
      height: height
    } : {});
  }
  var sizeAttrs = parentViewBox ? {
    width: width,
    height: height
  } : {};
  if (position === 'insideLeft') {
    return (0, _extends2["default"])({
      x: x + horizontalOffset,
      y: y + height / 2,
      textAnchor: horizontalStart,
      verticalAnchor: 'middle'
    }, sizeAttrs);
  }
  if (position === 'insideRight') {
    return (0, _extends2["default"])({
      x: x + width - horizontalOffset,
      y: y + height / 2,
      textAnchor: horizontalEnd,
      verticalAnchor: 'middle'
    }, sizeAttrs);
  }
  if (position === 'insideTop') {
    return (0, _extends2["default"])({
      x: x + width / 2,
      y: y + verticalOffset,
      textAnchor: 'middle',
      verticalAnchor: verticalStart
    }, sizeAttrs);
  }
  if (position === 'insideBottom') {
    return (0, _extends2["default"])({
      x: x + width / 2,
      y: y + height - verticalOffset,
      textAnchor: 'middle',
      verticalAnchor: verticalEnd
    }, sizeAttrs);
  }
  if (position === 'insideTopLeft') {
    return (0, _extends2["default"])({
      x: x + horizontalOffset,
      y: y + verticalOffset,
      textAnchor: horizontalStart,
      verticalAnchor: verticalStart
    }, sizeAttrs);
  }
  if (position === 'insideTopRight') {
    return (0, _extends2["default"])({
      x: x + width - horizontalOffset,
      y: y + verticalOffset,
      textAnchor: horizontalEnd,
      verticalAnchor: verticalStart
    }, sizeAttrs);
  }
  if (position === 'insideBottomLeft') {
    return (0, _extends2["default"])({
      x: x + horizontalOffset,
      y: y + height - verticalOffset,
      textAnchor: horizontalStart,
      verticalAnchor: verticalEnd
    }, sizeAttrs);
  }
  if (position === 'insideBottomRight') {
    return (0, _extends2["default"])({
      x: x + width - horizontalOffset,
      y: y + height - verticalOffset,
      textAnchor: horizontalEnd,
      verticalAnchor: verticalEnd
    }, sizeAttrs);
  }
  if ((0, _FnUtils._isObject)(position) && ((0, _DataUtils.isNumber)(position.x) || (0, _DataUtils.isPercent)(position.x)) && ((0, _DataUtils.isNumber)(position.y) || (0, _DataUtils.isPercent)(position.y))) {
    return (0, _extends2["default"])({
      x: x + (0, _DataUtils.getPercentValue)(position.x, width),
      y: y + (0, _DataUtils.getPercentValue)(position.y, height),
      textAnchor: 'end',
      verticalAnchor: 'end'
    }, sizeAttrs);
  }
  return (0, _extends2["default"])({
    x: x + width / 2,
    y: y + height / 2,
    textAnchor: 'middle',
    verticalAnchor: 'middle'
  }, sizeAttrs);
};
exports.getAttrsOfCartesianLabel = getAttrsOfCartesianLabel;
//# sourceMappingURL=LabelFn.js.map