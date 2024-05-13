"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _LegendCell = _interopRequireDefault(require("./LegendCell"));
var _SvgCircle = _interopRequireDefault(require("./SvgCircle"));
var _SvgRect = _interopRequireDefault(require("./SvgRect"));
var _Label = require("./Label.Style");
var _jsxRuntime = require("react/jsx-runtime");
const LS_ITEM = {
  display: 'inline-block',
  marginRight: '1rem',
  padding: '0 4px 4px 4px'
};
const LegendCellSvg = _ref => {
  let {
    svgStyle = _Label.S_CIRCLE_SERIA,
    svgType,
    ...restProps
  } = _ref;
  const SvgComp = svgType === 'rect' ? _SvgRect.default : _SvgCircle.default;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendCell.default, {
    style: LS_ITEM,
    ...restProps,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(SvgComp, {
      ...svgStyle
    })
  });
};
var _default = exports.default = LegendCellSvg;
//# sourceMappingURL=LegendCellSvg.js.map