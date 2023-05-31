"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.Symbols = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _uiApi = require("../../uiApi");
var _crCn = _interopRequireDefault(require("../../zhn-utils/crCn"));
var _FnUtils = require("../util/FnUtils");
var _ReactUtils = require("../util/ReactUtils");
var _SymbolsFn = require("./SymbolsFn");
var _jsxRuntime = require("react/jsx-runtime");
var CL_SYMBOLS = 'recharts-symbols';
var Symbols = (0, _uiApi.memo)(function (props) {
  var className = props.className,
    cx = props.cx,
    cy = props.cy,
    size = props.size;
  return (0, _FnUtils._isNumber)(cx) && (0, _FnUtils._isNumber)(cy) && (0, _FnUtils._isNumber)(size) ? /*#__PURE__*/(0, _jsxRuntime.jsx)("path", (0, _extends2["default"])({}, (0, _ReactUtils.filterProps)(props, true), {
    className: (0, _crCn["default"])(CL_SYMBOLS, className),
    transform: "translate(" + cx + ", " + cy + ")",
    d: (0, _SymbolsFn.getSymbolPath)(props)
  })) : null;
});
exports.Symbols = Symbols;
Symbols.defaultProps = {
  type: 'circle',
  size: 64,
  sizeType: 'area'
};
Symbols.registerSymbol = _SymbolsFn.registerSymbol;
//# sourceMappingURL=Symbols.js.map