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
const Symbols = (0, _uiApi.memo)(props => {
  const {
    className,
    cx,
    cy,
    size
  } = props;
  return (0, _FnUtils._isNumber)(cx) && (0, _FnUtils._isNumber)(cy) && (0, _FnUtils._isNumber)(size) ? /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    ...(0, _ReactUtils.filterProps)(props, true),
    className: (0, _crCn.default)(_CL.CL_SYMBOLS, className),
    transform: "translate(" + cx + ", " + cy + ")",
    d: (0, _SymbolsFn.getSymbolPath)(props)
  }) : null;
});
exports.Symbols = Symbols;
Symbols.defaultProps = {
  type: 'circle',
  size: 64,
  sizeType: 'area'
};
Symbols.registerSymbol = _SymbolsFn.registerSymbol;
//# sourceMappingURL=Symbols.js.map