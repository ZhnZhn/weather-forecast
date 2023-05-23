"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.renderRadialLabel = exports.isPolar = exports.getLabel = exports.getDeltaAngle = exports.getAttrsOfPolarLabel = exports.getAttrsOfCartesianLabel = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _classnames = _interopRequireDefault(require("classnames"));
var _FnUtils = require("../util/FnUtils");
var _DataUtils = require("../util/DataUtils");
var _PolarUtils = require("../util/PolarUtils");
var _jsxRuntime = require("react/jsx-runtime");
var CL_RADIAL_BAR_LABEL = 'recharts-radial-bar-label';
var getLabel = function getLabel(props) {
  var value = props.value,
    formatter = props.formatter,
    label = (0, _FnUtils._isNil)(props.children) ? value : props.children;
  return (0, _FnUtils._isFn)(formatter) ? formatter(label) : label;
};
exports.getLabel = getLabel;
var getDeltaAngle = function getDeltaAngle(startAngle, endAngle) {
  var sign = (0, _DataUtils.mathSign)(endAngle - startAngle),
    deltaAngle = Math.min(Math.abs(endAngle - startAngle), 360);
  return sign * deltaAngle;
};
exports.getDeltaAngle = getDeltaAngle;
var renderRadialLabel = function renderRadialLabel(labelProps, label, attrs) {
  var position = labelProps.position,
    viewBox = labelProps.viewBox,
    offset = labelProps.offset,
    className = labelProps.className,
    cx = viewBox.cx,
    cy = viewBox.cy,
    innerRadius = viewBox.innerRadius,
    outerRadius = viewBox.outerRadius,
    startAngle = viewBox.startAngle,
    endAngle = viewBox.endAngle,
    clockWise = viewBox.clockWise,
    radius = (innerRadius + outerRadius) / 2,
    deltaAngle = getDeltaAngle(startAngle, endAngle),
    sign = deltaAngle >= 0 ? 1 : -1;
  var labelAngle, direction;
  if (position === 'insideStart') {
    labelAngle = startAngle + sign * offset;
    direction = clockWise;
  } else if (position === 'insideEnd') {
    labelAngle = endAngle - sign * offset;
    direction = !clockWise;
  } else if (position === 'end') {
    labelAngle = endAngle + sign * offset;
    direction = clockWise;
  }
  direction = deltaAngle <= 0 ? direction : !direction;
  var startPoint = (0, _PolarUtils.polarToCartesian)(cx, cy, radius, labelAngle),
    endPoint = (0, _PolarUtils.polarToCartesian)(cx, cy, radius, labelAngle + (direction ? 1 : -1) * 359),
    path = "M" + startPoint.x + "," + startPoint.y + "\n     A" + radius + "," + radius + ",0,1," + (direction ? 0 : 1) + ",\n     " + endPoint.x + "," + endPoint.y;
  var id = (0, _FnUtils._isNil)(labelProps.id) ? (0, _DataUtils.uniqueId)('recharts-radial-line-') : labelProps.id;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("text", (0, _extends2["default"])({}, attrs, {
    dominantBaseline: "central",
    className: (0, _classnames["default"])(CL_RADIAL_BAR_LABEL, className),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("defs", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
        id: id,
        d: path
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("textPath", {
      xlinkHref: "#" + id,
      children: label
    })]
  }));
};
exports.renderRadialLabel = renderRadialLabel;
var getAttrsOfPolarLabel = function getAttrsOfPolarLabel(props) {
  var viewBox = props.viewBox,
    offset = props.offset,
    position = props.position,
    cx = viewBox.cx,
    cy = viewBox.cy,
    innerRadius = viewBox.innerRadius,
    outerRadius = viewBox.outerRadius,
    startAngle = viewBox.startAngle,
    endAngle = viewBox.endAngle,
    midAngle = (startAngle + endAngle) / 2;
  if (position === 'outside') {
    var _polarToCartesian = (0, _PolarUtils.polarToCartesian)(cx, cy, outerRadius + offset, midAngle),
      _x = _polarToCartesian.x,
      _y = _polarToCartesian.y;
    return {
      x: _x,
      y: _y,
      textAnchor: _x >= cx ? 'start' : 'end',
      verticalAnchor: 'middle'
    };
  }
  if (position === 'center') {
    return {
      x: cx,
      y: cy,
      textAnchor: 'middle',
      verticalAnchor: 'middle'
    };
  }
  if (position === 'centerTop') {
    return {
      x: cx,
      y: cy,
      textAnchor: 'middle',
      verticalAnchor: 'start'
    };
  }
  if (position === 'centerBottom') {
    return {
      x: cx,
      y: cy,
      textAnchor: 'middle',
      verticalAnchor: 'end'
    };
  }
  var r = (innerRadius + outerRadius) / 2,
    _polarToCartesian2 = (0, _PolarUtils.polarToCartesian)(cx, cy, r, midAngle),
    x = _polarToCartesian2.x,
    y = _polarToCartesian2.y;
  return {
    x: x,
    y: y,
    textAnchor: 'middle',
    verticalAnchor: 'middle'
  };
};
exports.getAttrsOfPolarLabel = getAttrsOfPolarLabel;
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
var isPolar = function isPolar(viewBox) {
  return 'cx' in viewBox && (0, _DataUtils.isNumber)(viewBox.cx);
};
exports.isPolar = isPolar;
//# sourceMappingURL=LabelFn.js.map