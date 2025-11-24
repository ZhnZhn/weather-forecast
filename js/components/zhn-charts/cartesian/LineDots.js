"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.LineDots = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _styleFn = require("../../styleFn");
var _TooltipContext = require("../context/TooltipContext");
var _Dot = require("../shape/Dot");
var _Layer = require("../container/Layer");
var _cartesianFn = require("./cartesianFn");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["key"];
const _crDotItem = (_ref, option) => {
  let {
      key
    } = _ref,
    restProps = (0, _objectWithoutPropertiesLoose2.default)(_ref, _excluded);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Dot.Dot, Object.assign({}, restProps, {
    className: (0, _styleFn.crCn)(_CL.CL_LINE_DOT, option && option.className)
  }), key);
};
const _renderDotItem = (0, _cartesianFn.fCreateElement)(_crDotItem);
const LineDots = _ref2 => {
  let {
    clipPath,
    props
  } = _ref2;
  const {
      activeTooltipIndex
    } = (0, _TooltipContext.useTooltip)(),
    {
      dot,
      points,
      dataKey
    } = props;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Layer.Layer, {
    className: _CL.CL_LINE_DOTS,
    role: "img",
    clipPath: clipPath,
    children: points.map((entry, i) => _renderDotItem(dot, {
      key: "dot-" + i,
      r: i === activeTooltipIndex ? dot.r ? dot.r + 3 : 6 : dot.r || 3,
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