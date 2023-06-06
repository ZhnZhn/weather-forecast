import curveLinear from "./curve/linear";
import { withPath } from "./path";
import {
  x as pointX,
  y as pointY
} from "./point";
import {
  isFn,
  isUndef,
  crFnConstant,
  crArrayFrom
} from './helperFns';

const _crPointGetter = (
  fnOrValue,
  dfGetter
) => isFn(fnOrValue)
  ? fnOrValue
  : fnOrValue === void 0
     ? dfGetter
     : crFnConstant(fnOrValue);

export default function(x, y) {
  let defined = crFnConstant(true)
  , context = null
  , curve = curveLinear
  , output = null
  , path = withPath(line);

  x = _crPointGetter(x, pointX)
  y = _crPointGetter(y, pointY)

  function line(data) {
    let i
    , n = (data = crArrayFrom(data)).length
    , d
    , defined0 = false
    , buffer;

    if (context == null) output = curve(buffer = path());

    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        /*eslint-disable no-cond-assign*/
        if (defined0 = !defined0) output.lineStart();
        /*eslint-enable no-cond-assign*/
        else output.lineEnd();
      }
      if (defined0) output.point(+x(d, i, data), +y(d, i, data));
    }

    if (buffer) return output = null, buffer + "" || null;
  }

  line.x = (_) => isUndef(_) ? x
   : (x = isFn(_)
       ? _
       : crFnConstant(+_), line);

  line.y = (_) => isUndef(_) ? y
   : (y = isFn(_)
      ? _
      : crFnConstant(+_), line);

  line.defined = (_) => isUndef(_) ? defined
   : (defined = isFn(_)
      ? _
      : crFnConstant(!!_), line);

  line.curve = (_) => isUndef(_) ? curve
   : (curve = _, context != null && (output = curve(context)), line);

  line.context = (_) => isUndef(_) ? context
   : (_ == null
      ? context = output = null
      : output = curve(context = _), line);

  return line;
}
