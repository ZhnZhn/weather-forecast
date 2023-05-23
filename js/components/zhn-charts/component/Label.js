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
var _LabelFn = require("./LabelFn");
var _jsxRuntime = require("react/jsx-runtime");
var _react = require("react");
var CL_LABEL = 'recharts-label';
var Label = function Label(props) {
  var viewBox = props.viewBox,
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
    label = (0, _LabelFn.getLabel)(props);
  }
  var attrs = (0, _ReactUtils.filterProps)(props, true),
    positionAttrs = (0, _LabelFn.getAttrsOfCartesianLabel)(props);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Text.Text, (0, _extends2["default"])({
    className: (0, _classnames["default"])(CL_LABEL, className)
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