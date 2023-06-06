import { withPath } from "./path.js";
import {
  isUndef,
  isFn,
  crFnConstant
} from './helperFns';

import {
  symbolCircle,
  symbolCross,
  symbolDiamond,
  symbolSquare,
  symbolStar,
  symbolTriangle,
  symbolWye
} from './symbolShapes';

// These symbols are designed to be filled.
export const symbolsFill = [
  symbolCircle,
  symbolCross,
  symbolDiamond,
  symbolSquare,
  symbolStar,
  symbolTriangle,
  symbolWye
];

// These symbols are designed to be stroked (with a width of 1.5px and round caps).
export const symbolsStroke = [
  symbolCircle
];

export function shapeSymbol(type, size) {
  let context = null
  , path = withPath(symbol);

  type = isFn(type)
    ? type
    : crFnConstant(type || symbolCircle);
  size = isFn(size)
    ? size
    : crFnConstant(size === undefined ? 64 : +size);

  function symbol() {
    let buffer;
    if (!context) context = buffer = path();
    type.apply(this, arguments).draw(context, +size.apply(this, arguments));
    if (buffer) return context = null, buffer + "" || null;
  }

  symbol.type = _ => isUndef(_)
   ? type
   : (type = isFn(_) ? _ : crFnConstant(_), symbol);

  symbol.size = _ => isUndef(_)
   ? size
   : (size = isFn(_) ? _ : crFnConstant(+_), symbol);

  symbol.context = _ => isUndef(_)
   ? context
   : (context = _ == null ? null : _, symbol);

  return symbol;
}
