"use strict";

exports.__esModule = true;
exports.shapeSymbol = shapeSymbol;
exports.symbolsStroke = exports.symbolsFill = void 0;
var _path = require("./path.js");
var _helperFns = require("./helperFns");
var _symbolShapes = require("./symbolShapes");
// These symbols are designed to be filled.
var symbolsFill = [_symbolShapes.symbolCircle, _symbolShapes.symbolCross, _symbolShapes.symbolDiamond, _symbolShapes.symbolSquare, _symbolShapes.symbolStar, _symbolShapes.symbolTriangle, _symbolShapes.symbolWye];

// These symbols are designed to be stroked (with a width of 1.5px and round caps).
exports.symbolsFill = symbolsFill;
var symbolsStroke = [_symbolShapes.symbolCircle];
exports.symbolsStroke = symbolsStroke;
function shapeSymbol(type, size) {
  var context = null,
    path = (0, _path.withPath)(symbol);
  type = (0, _helperFns.isFn)(type) ? type : (0, _helperFns.crFnConstant)(type || _symbolShapes.symbolCircle);
  size = (0, _helperFns.isFn)(size) ? size : (0, _helperFns.crFnConstant)(size === undefined ? 64 : +size);
  function symbol() {
    var buffer;
    if (!context) context = buffer = path();
    type.apply(this, arguments).draw(context, +size.apply(this, arguments));
    if (buffer) return context = null, buffer + "" || null;
  }
  symbol.type = function (_) {
    return (0, _helperFns.isUndef)(_) ? type : (type = (0, _helperFns.isFn)(_) ? _ : (0, _helperFns.crFnConstant)(_), symbol);
  };
  symbol.size = function (_) {
    return (0, _helperFns.isUndef)(_) ? size : (size = (0, _helperFns.isFn)(_) ? _ : (0, _helperFns.crFnConstant)(+_), symbol);
  };
  symbol.context = function (_) {
    return (0, _helperFns.isUndef)(_) ? context : (context = _ == null ? null : _, symbol);
  };
  return symbol;
}
//# sourceMappingURL=symbol.js.map