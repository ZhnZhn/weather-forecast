"use strict";

exports.__esModule = true;
exports.LineDots = void 0;
var _styleFn = require("../../styleFn");
var _Dot = require("../shape/Dot");
var _Layer = require("../container/Layer");
var _cartesianFn = require("./cartesianFn");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
const _crDotItem = (_ref, option) => {
  let {
    key,
    ...restProps
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Dot.Dot, {
    ...restProps,
    className: (0, _styleFn.crCn)(_CL.CL_LINE_DOT, option && option.className)
  }, key);
};
const _renderDotItem = (0, _cartesianFn.fCreateElement)(_crDotItem);
const LineDots = _ref2 => {
  let {
    clipPathProps,
    props
  } = _ref2;
  const {
    dot,
    points,
    dataKey
  } = props;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Layer.Layer, {
    className: _CL.CL_LINE_DOTS,
    ...clipPathProps,
    role: "img",
    children: points.map((entry, i) => _renderDotItem(dot, {
      key: `dot-${i}`,
      r: dot.r || 3,
      fill: dot.fill || props.fill,
      stroke: dot.stroke || props.stroke,
      strokeWidth: dot.strokeWidth || props.strokeWidth,
      strokeDasharray: dot.strokeDasharray || props.strokeDasharray,
      radius: props.radius,
      width: props.width,
      height: props.height,
      value: entry.value,
      dataKey,
      cx: entry.x,
      cy: entry.y,
      index: i,
      payload: entry.payload
    }))
  }, "dots");
};
exports.LineDots = LineDots;
//# sourceMappingURL=LineDots.js.map