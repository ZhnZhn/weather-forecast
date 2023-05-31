"use strict";

exports.__esModule = true;
exports.registerSymbol = exports.getSymbolPath = void 0;
var _d3Shape = require("d3-shape");
var _FnUtils = require("../util/FnUtils");
var MATH_PI = Math.PI
  // (Math.PI/180)*18
  ,
  STAR_ANGLE_IN_RADIAN = MATH_PI / 10,
  SQRT_OF_3 = Math.sqrt(3),
  _mathTan = Math.tan;
var _symbolFactories = {
  symbolCircle: _d3Shape.symbolCircle,
  symbolCross: _d3Shape.symbolCross,
  symbolDiamond: _d3Shape.symbolDiamond,
  symbolSquare: _d3Shape.symbolSquare,
  symbolStar: _d3Shape.symbolStar,
  symbolTriangle: _d3Shape.symbolTriangle,
  symbolWye: _d3Shape.symbolWye
};
var _crSymbolFactoryName = function _crSymbolFactoryName(type) {
  return "symbol" + (0, _FnUtils._upperFirst)(type);
};
var registerSymbol = function registerSymbol(key, factory) {
  _symbolFactories[_crSymbolFactoryName(key)] = factory;
};
exports.registerSymbol = registerSymbol;
var _getSymbolFactory = function _getSymbolFactory(type) {
  return _symbolFactories[_crSymbolFactoryName(type)] || _d3Shape.symbolCircle;
};
var _sizeOf = {
  cross: 5 / 9,
  diamond: 0.5 / SQRT_OF_3,
  square: 1,
  star: 1.25 * (_mathTan(STAR_ANGLE_IN_RADIAN) - _mathTan(STAR_ANGLE_IN_RADIAN * 2) * Math.pow(_mathTan(STAR_ANGLE_IN_RADIAN), 2)),
  triangle: SQRT_OF_3 / 4,
  wye: (21 - 10 * SQRT_OF_3) / 8,
  DF: MATH_PI / 4
};
var _calculateAreaSize = function _calculateAreaSize(size, sizeType, type) {
  return sizeType === 'area' ? size : (_sizeOf[type] || _sizeOf.DF) * size * size;
};
var getSymbolPath = function getSymbolPath(_ref) {
  var size = _ref.size,
    sizeType = _ref.sizeType,
    type = _ref.type;
  return (0, _d3Shape.symbol)().type(_getSymbolFactory(type)).size(_calculateAreaSize(size, sizeType, type))();
};
exports.getSymbolPath = getSymbolPath;
//# sourceMappingURL=SymbolsFn.js.map