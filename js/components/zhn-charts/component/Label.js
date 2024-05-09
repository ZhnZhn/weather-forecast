"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.Label = void 0;
var _uiApi = require("../../uiApi");
var _crCn = _interopRequireDefault(require("../../zhn-utils/crCn"));
var _FnUtils = require("../util/FnUtils");
var _Text = require("./Text");
var _ReactUtils = require("../util/ReactUtils");
var _DataUtils = require("../util/DataUtils");
var _LabelFn = require("./LabelFn");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
var _react = require("react");
const DF_PROPS = {
  offset: 5,
  className: ''
};
const Label = props => {
  const _props = (0, _ReactUtils.crProps)(DF_PROPS, props),
    {
      viewBox,
      value,
      children,
      content,
      className,
      textBreakAll
    } = _props;
  if (!viewBox || (0, _FnUtils._isNil)(value) && (0, _FnUtils._isNil)(children) && !(0, _uiApi.isValidElement)(content) && !(0, _FnUtils._isFn)(content)) {
    return null;
  }
  if ((0, _uiApi.isValidElement)(content)) {
    return (0, _uiApi.cloneElement)(content, _props);
  }
  let label;
  if ((0, _FnUtils._isFn)(content)) {
    label = (0, _uiApi.createElement)(content, _props);
    if ((0, _uiApi.isValidElement)(label)) {
      return label;
    }
  } else {
    label = (0, _LabelFn.getLabel)(_props);
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Text.Text, {
    className: (0, _crCn.default)(_CL.CL_LABEL, className)
    // attrs
    ,
    ...(0, _ReactUtils.filterProps)(_props, true),
    ...(0, _LabelFn.getAttrsOfCartesianLabel)(_props),
    breakAll: textBreakAll,
    children: label
  });
};
exports.Label = Label;
const parseViewBox = props => {
  const {
    cx,
    cy,
    angle,
    startAngle,
    endAngle,
    r,
    radius,
    innerRadius,
    outerRadius,
    x,
    y,
    top,
    left,
    width,
    height,
    clockWise,
    labelViewBox
  } = props;
  if (labelViewBox) {
    return labelViewBox;
  }
  if ((0, _DataUtils.isNumber)(width) && (0, _DataUtils.isNumber)(height)) {
    if ((0, _DataUtils.isNumber)(x) && (0, _DataUtils.isNumber)(y)) {
      return {
        x,
        y,
        width,
        height
      };
    }
    if ((0, _DataUtils.isNumber)(top) && (0, _DataUtils.isNumber)(left)) {
      return {
        x: top,
        y: left,
        width,
        height
      };
    }
  }
  if ((0, _DataUtils.isNumber)(x) && (0, _DataUtils.isNumber)(y)) {
    return {
      x,
      y,
      width: 0,
      height: 0
    };
  }
  if ((0, _DataUtils.isNumber)(cx) && (0, _DataUtils.isNumber)(cy)) {
    return {
      cx,
      cy,
      startAngle: startAngle || angle || 0,
      endAngle: endAngle || angle || 0,
      innerRadius: innerRadius || 0,
      outerRadius: outerRadius || radius || r || 0,
      clockWise
    };
  }
  if (props.viewBox) {
    return props.viewBox;
  }
  return {};
};
const KEY_LABEL_IMPLICIT = "label-implicit";
const parseLabel = (label, viewBox) => {
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
        viewBox
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
    return /*#__PURE__*/(0, _react.createElement)(Label, {
      viewBox: viewBox,
      ...label,
      key: KEY_LABEL_IMPLICIT
    });
  }
  return null;
};
const renderCallByParent = function (parentProps, viewBox, checkPropsLabel) {
  if (checkPropsLabel === void 0) {
    checkPropsLabel = true;
  }
  if (!parentProps || !parentProps.children && checkPropsLabel && !parentProps.label) {
    return null;
  }
  const {
      children
    } = parentProps,
    parentViewBox = parseViewBox(parentProps),
    explicitChildren = (0, _ReactUtils.findAllByType)(children, Label).map((child, index) => (0, _uiApi.cloneElement)(child, {
      viewBox: viewBox || parentViewBox,
      // eslint-disable-next-line react/no-array-index-key
      key: "label-" + index
    }));
  if (!checkPropsLabel) {
    return explicitChildren;
  }
  const implicitLabel = parseLabel(parentProps.label, viewBox || parentViewBox);
  return [implicitLabel, ...explicitChildren];
};
Label.displayName = 'Label';
Label.parseViewBox = parseViewBox;
Label.renderCallByParent = renderCallByParent;
//# sourceMappingURL=Label.js.map