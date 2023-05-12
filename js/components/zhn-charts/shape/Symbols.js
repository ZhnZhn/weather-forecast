"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.Symbols = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var _uiApi = require("../../uiApi");
var _classnames = _interopRequireDefault(require("classnames"));
var _d3Shape = require("d3-shape");
var _FnUtils = require("../util/FnUtils");
var _ReactUtils = require("../util/ReactUtils");
var _jsxRuntime = require("react/jsx-runtime");
var symbolFactories = {
  symbolCircle: _d3Shape.symbolCircle,
  symbolCross: _d3Shape.symbolCross,
  symbolDiamond: _d3Shape.symbolDiamond,
  symbolSquare: _d3Shape.symbolSquare,
  symbolStar: _d3Shape.symbolStar,
  symbolTriangle: _d3Shape.symbolTriangle,
  symbolWye: _d3Shape.symbolWye
};
var RADIAN = Math.PI / 180;
var getSymbolFactory = function getSymbolFactory(type) {
  var name = "symbol" + (0, _FnUtils._upperFirst)(type);
  return symbolFactories[name] || _d3Shape.symbolCircle;
};
var calculateAreaSize = function calculateAreaSize(size, sizeType, type) {
  if (sizeType === 'area') {
    return size;
  }
  switch (type) {
    case 'cross':
      return 5 * size * size / 9;
    case 'diamond':
      return 0.5 * size * size / Math.sqrt(3);
    case 'square':
      return size * size;
    case 'star':
      {
        var angle = 18 * RADIAN;
        return 1.25 * size * size * (Math.tan(angle) - Math.tan(angle * 2) * Math.pow(Math.tan(angle), 2));
      }
    case 'triangle':
      return Math.sqrt(3) * size * size / 4;
    case 'wye':
      return (21 - 10 * Math.sqrt(3)) * size * size / 8;
    default:
      return Math.PI * size * size / 4;
  }
};
var Symbols = /*#__PURE__*/function (_PureComponent) {
  (0, _inheritsLoose2["default"])(Symbols, _PureComponent);
  function Symbols() {
    return _PureComponent.apply(this, arguments) || this;
  }
  var _proto = Symbols.prototype;
  _proto.getPath = function getPath() {
    var _this$props = this.props,
      size = _this$props.size,
      sizeType = _this$props.sizeType,
      type = _this$props.type,
      symbolFactory = getSymbolFactory(type),
      symbol = (0, _d3Shape.symbol)().type(symbolFactory).size(calculateAreaSize(size, sizeType, type));
    return symbol();
  };
  _proto.render = function render() {
    var _this$props2 = this.props,
      className = _this$props2.className,
      cx = _this$props2.cx,
      cy = _this$props2.cy,
      size = _this$props2.size,
      filteredProps = (0, _ReactUtils.filterProps)(this.props, true);
    return cx === +cx && cy === +cy && size === +size ? /*#__PURE__*/(0, _jsxRuntime.jsx)("path", (0, _extends2["default"])({}, filteredProps, {
      className: (0, _classnames["default"])('recharts-symbols', className),
      transform: "translate(" + cx + ", " + cy + ")",
      d: this.getPath()
    })) : null;
  };
  return Symbols;
}(_uiApi.PureComponent);
exports.Symbols = Symbols;
Symbols.defaultProps = {
  type: 'circle',
  size: 64,
  sizeType: 'area'
};
Symbols.registerSymbol = function (key, factory) {
  symbolFactories["symbol" + (0, _FnUtils._upperFirst)(key)] = factory;
};
//# sourceMappingURL=Symbols.js.map