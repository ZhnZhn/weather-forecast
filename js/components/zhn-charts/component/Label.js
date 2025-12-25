"use strict";

exports.__esModule = true;
exports.parseViewBox = exports.Label = void 0;
var _isTypeFn = require("../../../utils/isTypeFn");
var _uiApi = require("../../uiApi");
var _DataUtils = require("../util/DataUtils");
var _Text = require("./Text");
var _LabelPositionFn = require("./LabelPositionFn");
var _jsxRuntime = require("react/jsx-runtime");
const _getLabel = (children, value, formatter) => {
  const label = children == null ? value : children;
  return (0, _isTypeFn.isFn)(formatter) ? formatter(label) : label;
};
const DF_PROPS = {
  position: _LabelPositionFn.labelPositionFn,
  offset: 5
};
const Label = props => {
  const _props = (0, _uiApi.crProps)(DF_PROPS, props),
    {
      viewBox,
      value,
      children,
      content,
      textBreakAll
    } = _props,
    _isValidElementContent = (0, _uiApi.isValidElement)(content),
    _isFnContent = (0, _isTypeFn.isFn)(content);
  if (!viewBox || value == null && children == null && !_isValidElementContent && !_isFnContent) {
    return null;
  }
  if (_isValidElementContent) {
    return (0, _uiApi.cloneUiElement)(content, _props);
  }
  let label;
  if (_isFnContent) {
    label = (0, _uiApi.createElement)(content, _props);
    if ((0, _uiApi.isValidElement)(label)) {
      return label;
    }
  } else {
    label = _getLabel(children, value, _props.formatter);
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Text.Text, {
    offset: _props.offset,
    fill: _props.fill,
    stroke: _props.stroke,
    className: _props.className,
    ..._props.position(viewBox, _props.parentViewBox, _props.offset, _props.xTopOffset),
    breakAll: textBreakAll,
    children: label
  });
};
exports.Label = Label;
const parseViewBox = props => {
  const {
    //cx,
    //cy,
    //angle,
    //startAngle,
    //endAngle,
    //r,
    //radius,
    //innerRadius,
    //outerRadius,
    x,
    y,
    top,
    left,
    width,
    height,
    //clockWise,
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

  /*
  if (isNumber(cx) && isNumber(cy)) {
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
  */
  if (props.viewBox) {
    return props.viewBox;
  }
  return {};
};
exports.parseViewBox = parseViewBox;
Label.displayName = "Label";
//# sourceMappingURL=Label.js.map