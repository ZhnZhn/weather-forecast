"use strict";

exports.__esModule = true;
exports.parseViewBox = exports.Label = void 0;
var _isTypeFn = require("../../../utils/isTypeFn");
var _uiApi = require("../../uiApi");
var _DataUtils = require("../util/DataUtils");
var _Text = require("./Text");
var _LabelFn = require("./LabelFn");
var _LabelPositionFn = require("./LabelPositionFn");
var _jsxRuntime = require("react/jsx-runtime");
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
      content: ContentElementOrComp,
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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Text.Text, {
    offset: _props.offset,
    fill: _props.fill,
    stroke: _props.stroke,
    className: _props.className,
    ..._props.position(_props),
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