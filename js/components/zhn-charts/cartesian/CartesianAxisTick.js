"use strict";

exports.__esModule = true;
exports.CartesianAxisTick = void 0;
var _styleFn = require("../../styleFn");
var _types = require("../util/types");
var _FnUtils = require("../util/FnUtils");
var _Layer = require("../container/Layer");
var _Text = require("../component/Text");
var _cartesianFn = require("./cartesianFn");
var _CartesianAxisRenderFn = require("./CartesianAxisRenderFn");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
const _crTextElement = (props, option, value) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Text.Text, {
  ...props,
  className: _CL.CL_AXIS_TICK_VALUE,
  children: value
});
const _renderTickItem = (0, _cartesianFn.fCreateElement)(_crTextElement);
const CartesianAxisTick = _ref => {
  let {
    props,
    entry,
    i,
    tickProps,
    tickLineProps,
    lineCoord
  } = _ref;
  const {
      tick,
      tickLine,
      tickFormatter,
      unit
    } = props,
    _tickLineClassName = (0, _CartesianAxisRenderFn.getClassName)(tickLine);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Layer.Layer, {
    className: _CL.CL_AXIS_TICK,
    ...(0, _types.adaptEventsOfChild)(props, entry, i),
    children: [tickLine && /*#__PURE__*/(0, _jsxRuntime.jsx)("line", {
      ...tickLineProps,
      ...lineCoord,
      className: (0, _styleFn.crCn)(_CL.CL_AXIS_TICK_LINE, _tickLineClassName)
    }), tick && _renderTickItem(tick, tickProps, `${(0, _FnUtils._isFn)(tickFormatter) ? tickFormatter(entry.value, i) : entry.value}${unit || ''}`)]
  });
};
exports.CartesianAxisTick = CartesianAxisTick;
//# sourceMappingURL=CartesianAxisTick.js.map