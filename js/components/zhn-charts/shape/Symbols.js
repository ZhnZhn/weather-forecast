"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.Symbols = void 0;
var _uiApi = require("../../uiApi");
var _crCn = _interopRequireDefault(require("../../zhn-utils/crCn"));
var _FnUtils = require("../util/FnUtils");
var _ReactUtils = require("../util/ReactUtils");
var _SymbolsFn = require("./SymbolsFn");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
const DF_PROPS = {
  type: 'circle',
  size: 64,
  sizeType: 'area'
};
const Symbols = exports.Symbols = (0, _uiApi.memo)(props => {
  const _props = (0, _ReactUtils.crProps)(DF_PROPS, props),
    {
      className,
      cx,
      cy,
      size
    } = _props;
  return (0, _FnUtils._isNumber)(cx) && (0, _FnUtils._isNumber)(cy) && (0, _FnUtils._isNumber)(size) ? /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    ...(0, _ReactUtils.filterProps)(_props, true),
    className: (0, _crCn.default)(_CL.CL_SYMBOLS, className),
    transform: "translate(" + cx + ", " + cy + ")",
    d: (0, _SymbolsFn.getSymbolPath)(_props)
  }) : null;
});
Symbols.registerSymbol = _SymbolsFn.registerSymbol;
//# sourceMappingURL=Symbols.js.map