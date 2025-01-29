"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.LineDots = void 0;
var _crCn = _interopRequireDefault(require("../../zhn-utils/crCn"));
var _ReactUtils = require("../util/ReactUtils");
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
    className: (0, _crCn.default)(_CL.CL_LINE_DOT, option && option.className)
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
    } = props,
    lineProps = (0, _ReactUtils.filterProps)(props),
    customDotProps = (0, _ReactUtils.filterProps)(dot, true);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Layer.Layer, {
    className: _CL.CL_LINE_DOTS,
    ...clipPathProps,
    role: "img",
    children: points.map((entry, i) => _renderDotItem(dot, {
      key: `dot-${i}`,
      r: 3,
      ...lineProps,
      ...customDotProps,
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