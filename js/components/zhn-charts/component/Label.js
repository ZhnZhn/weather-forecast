"use strict";

exports.__esModule = true;
exports.renderLabelByParentProps = exports.Label = void 0;
var _isTypeFn = require("../../../utils/isTypeFn");
var _uiApi = require("../../uiApi");
var _Text = require("./Text");
var _DataUtils = require("../util/DataUtils");
var _LabelFn = require("./LabelFn");
var _jsxRuntime = require("react/jsx-runtime");
const DF_PROPS = {
  offset: 5,
  className: ""
};
const Label = props => {
  const _props = (0, _uiApi.crProps)(DF_PROPS, props),
    {
      viewBox,
      value,
      children,
      content: ContentElementOrComp,
      //className,
      textBreakAll
    } = _props;
  if (!viewBox || (0, _isTypeFn.isNullOrUndef)(value) && (0, _isTypeFn.isNullOrUndef)(children) && !(0, _uiApi.isValidElement)(ContentElementOrComp) && !(0, _isTypeFn.isFn)(ContentElementOrComp)) {
    return null;
  }
  if ((0, _uiApi.isValidElement)(ContentElementOrComp)) {
    return (0, _uiApi.cloneUiElement)(ContentElementOrComp, _props);
  }
  let label;
  if ((0, _isTypeFn.isFn)(ContentElementOrComp)) {
    label = (0, _uiApi.createElement)(ContentElementOrComp, props);
    if ((0, _uiApi.isValidElement)(label)) {
      return label;
    }
  } else {
    label = (0, _LabelFn.getLabel)(_props);
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Text.Text
  //className={crCn(CL_LABEL, className)}
  , Object.assign({
    offset: _props.offset,
    fill: _props.fill,
    stroke: _props.stroke,
    className: _props.className
    // attrs
    // positionAttrs
  }, (0, _LabelFn.getAttrsOfCartesianLabel)(_props), {
    breakAll: textBreakAll,
    children: label
  }));
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
      return (0, _uiApi.cloneUiElement)(label, {
        viewBox
      }, KEY_LABEL_IMPLICIT);
    }
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(Label, {
      content: label,
      viewBox: viewBox
    }, KEY_LABEL_IMPLICIT);
  }
  if ((0, _isTypeFn.isFn)(label)) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(Label, {
      content: label,
      viewBox: viewBox
    }, KEY_LABEL_IMPLICIT);
  }
  if ((0, _isTypeFn.isObj)(label)) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(Label, Object.assign({
      viewBox: viewBox
    }, label), KEY_LABEL_IMPLICIT);
  }
  return null;
};
const renderLabelByParentProps = parentProps => parentProps ? [parseLabel(parentProps.label, parseViewBox(parentProps))] : null;
exports.renderLabelByParentProps = renderLabelByParentProps;
Label.displayName = "Label";
Label.parseViewBox = parseViewBox;
//# sourceMappingURL=Label.js.map