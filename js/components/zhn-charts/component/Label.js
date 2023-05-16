"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.Label = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _uiApi = require("../../uiApi");
var _classnames = _interopRequireDefault(require("classnames"));
var _FnUtils = require("../util/FnUtils");
var _Text = require("./Text");
var _ReactUtils = require("../util/ReactUtils");
var _DataUtils = require("../util/DataUtils");
var _PolarUtils = require("../util/PolarUtils");
var _jsxRuntime = require("react/jsx-runtime");
var _react = require("react");
var getLabel = function getLabel(props) {
  var value = props.value,
    formatter = props.formatter,
    label = (0, _FnUtils._isNil)(props.children) ? value : props.children;
  return (0, _FnUtils._isFn)(formatter) ? formatter(label) : label;
};
var getDeltaAngle = function getDeltaAngle(startAngle, endAngle) {
  var sign = (0, _DataUtils.mathSign)(endAngle - startAngle),
    deltaAngle = Math.min(Math.abs(endAngle - startAngle), 360);
  return sign * deltaAngle;
};
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
    className: (0, _classnames["default"])('recharts-radial-bar-label', className),
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
var isPolar = function isPolar(viewBox) {
  return 'cx' in viewBox && (0, _DataUtils.isNumber)(viewBox.cx);
};
var Label = function Label(props) {
  var viewBox = props.viewBox,
    position = props.position,
    value = props.value,
    children = props.children,
    content = props.content,
    _props$className = props.className,
    className = _props$className === void 0 ? '' : _props$className,
    textBreakAll = props.textBreakAll;
  if (!viewBox || (0, _FnUtils._isNil)(value) && (0, _FnUtils._isNil)(children) && !(0, _uiApi.isValidElement)(content) && !(0, _FnUtils._isFn)(content)) {
    return null;
  }
  if ((0, _uiApi.isValidElement)(content)) {
    return (0, _uiApi.cloneElement)(content, props);
  }
  var label;
  if ((0, _FnUtils._isFn)(content)) {
    label = (0, _uiApi.createElement)(content, props);
    if ((0, _uiApi.isValidElement)(label)) {
      return label;
    }
  } else {
    label = getLabel(props);
  }
  var isPolarLabel = isPolar(viewBox),
    attrs = (0, _ReactUtils.filterProps)(props, true);
  if (isPolarLabel && (position === 'insideStart' || position === 'insideEnd' || position === 'end')) {
    return renderRadialLabel(props, label, attrs);
  }
  var positionAttrs = isPolarLabel ? getAttrsOfPolarLabel(props) : getAttrsOfCartesianLabel(props);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Text.Text, (0, _extends2["default"])({
    className: (0, _classnames["default"])('recharts-label', className)
  }, attrs, positionAttrs, {
    breakAll: textBreakAll,
    children: label
  }));
};
exports.Label = Label;
var parseViewBox = function parseViewBox(props) {
  var cx = props.cx,
    cy = props.cy,
    angle = props.angle,
    startAngle = props.startAngle,
    endAngle = props.endAngle,
    r = props.r,
    radius = props.radius,
    innerRadius = props.innerRadius,
    outerRadius = props.outerRadius,
    x = props.x,
    y = props.y,
    top = props.top,
    left = props.left,
    width = props.width,
    height = props.height,
    clockWise = props.clockWise,
    labelViewBox = props.labelViewBox;
  if (labelViewBox) {
    return labelViewBox;
  }
  if ((0, _DataUtils.isNumber)(width) && (0, _DataUtils.isNumber)(height)) {
    if ((0, _DataUtils.isNumber)(x) && (0, _DataUtils.isNumber)(y)) {
      return {
        x: x,
        y: y,
        width: width,
        height: height
      };
    }
    if ((0, _DataUtils.isNumber)(top) && (0, _DataUtils.isNumber)(left)) {
      return {
        x: top,
        y: left,
        width: width,
        height: height
      };
    }
  }
  if ((0, _DataUtils.isNumber)(x) && (0, _DataUtils.isNumber)(y)) {
    return {
      x: x,
      y: y,
      width: 0,
      height: 0
    };
  }
  if ((0, _DataUtils.isNumber)(cx) && (0, _DataUtils.isNumber)(cy)) {
    return {
      cx: cx,
      cy: cy,
      startAngle: startAngle || angle || 0,
      endAngle: endAngle || angle || 0,
      innerRadius: innerRadius || 0,
      outerRadius: outerRadius || radius || r || 0,
      clockWise: clockWise
    };
  }
  if (props.viewBox) {
    return props.viewBox;
  }
  return {};
};
var KEY_LABEL_IMPLICIT = "label-implicit";
var parseLabel = function parseLabel(label, viewBox) {
  if (!label) {
    return null;
  }
  if (label === true) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(Label, {
      viewBox: viewBox
    }, KEY_LABEL_IMPLICIT);
  }
  if ((0, _DataUtils.isNumOrStr)(label)) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(Label, {
      viewBox: viewBox,
      value: label
    }, KEY_LABEL_IMPLICIT);
  }
  if ((0, _uiApi.isValidElement)(label)) {
    if (label.type === Label) {
      return (0, _uiApi.cloneElement)(label, {
        key: KEY_LABEL_IMPLICIT,
        viewBox: viewBox
      });
    }
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(Label, {
      content: label,
      viewBox: viewBox
    }, KEY_LABEL_IMPLICIT);
  }
  if ((0, _FnUtils._isFn)(label)) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(Label, {
      content: label,
      viewBox: viewBox
    }, KEY_LABEL_IMPLICIT);
  }
  if ((0, _FnUtils._isObject)(label)) {
    return /*#__PURE__*/(0, _react.createElement)(Label, (0, _extends2["default"])({
      viewBox: viewBox
    }, label, {
      key: KEY_LABEL_IMPLICIT
    }));
  }
  return null;
};
var renderCallByParent = function renderCallByParent(parentProps, viewBox, checkPropsLabel) {
  if (checkPropsLabel === void 0) {
    checkPropsLabel = true;
  }
  if (!parentProps || !parentProps.children && checkPropsLabel && !parentProps.label) {
    return null;
  }
  var children = parentProps.children,
    parentViewBox = parseViewBox(parentProps),
    explicitChildren = (0, _ReactUtils.findAllByType)(children, Label).map(function (child, index) {
      return (0, _uiApi.cloneElement)(child, {
        viewBox: viewBox || parentViewBox,
        // eslint-disable-next-line react/no-array-index-key
        key: "label-" + index
      });
    });
  if (!checkPropsLabel) {
    return explicitChildren;
  }
  var implicitLabel = parseLabel(parentProps.label, viewBox || parentViewBox);
  return [implicitLabel].concat(explicitChildren);
};
Label.displayName = 'Label';
Label.defaultProps = {
  offset: 5
};
Label.parseViewBox = parseViewBox;
Label.renderCallByParent = renderCallByParent;
//# sourceMappingURL=Label.js.map