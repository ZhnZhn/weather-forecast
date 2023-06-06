import curveLinear from "./curve/linear";
import line from "./line";
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
  : isUndef(fnOrValue)
     ? dfGetter
     : crFnConstant(+fnOrValue);

export default function(x0, y0, y1) {
  let x1 = null
  , defined = crFnConstant(true)
  , context = null
  , curve = curveLinear
  , output = null
  , path = withPath(area);

  x0 = _crPointGetter(x0, pointX)
  y0 = _crPointGetter(y0, crFnConstant(0))
  y1 = _crPointGetter(y1, pointY)

  function area(data) {
    let i, j, k
    , n = (data = crArrayFrom(data)).length
    , d
    , defined0 = false
    , buffer
    , x0z = new Array(n)
    , y0z = new Array(n);

    if (context == null) output = curve(buffer = path());

    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        /*eslint-disable no-cond-assign*/
        if (defined0 = !defined0) {
        /*eslint-enable no-cond-assign*/
          j = i;
          output.areaStart();
          output.lineStart();
        } else {
          output.lineEnd();
          output.lineStart();
          for (k = i - 1; k >= j; --k) {
            output.point(x0z[k], y0z[k]);
          }
          output.lineEnd();
          output.areaEnd();
        }
      }
      if (defined0) {
        x0z[i] = +x0(d, i, data);
        y0z[i] = +y0(d, i, data);
        output.point(x1 ? +x1(d, i, data) : x0z[i], y1 ? +y1(d, i, data) : y0z[i]);
      }
    }

    if (buffer) return output = null, buffer + "" || null;
  }

  function arealine() {
    return line()
      .defined(defined)
      .curve(curve)
      .context(context);
  }

  area.x = _ => isUndef(_)
   ? x0
   : (x0 = isFn(_) ? _ : crFnConstant(+_), x1 = null, area);

  area.x0 = _ => isUndef(_)
   ? x0
   : (x0 = isFn(_) ? _ : crFnConstant(+_), area);

  area.x1 = _ => isUndef(_)
   ? x1
   : (x1 = _ == null ? null : isFn(_) ? _ : crFnConstant(+_), area);

  area.y = _ => isUndef(_)
   ? y0
   : (y0 = isFn(_) ? _ : crFnConstant(+_), y1 = null, area);

  area.y0 = _ => isUndef(_)
   ? y0
   : (y0 = isFn(_) ? _ : crFnConstant(+_), area)

  area.y1 = _ => isUndef(_)
   ? y1
   : (y1 = _ == null ? null : isFn(_) ? _ : crFnConstant(+_), area);

  area.lineX0 = area.lineY0 = () => arealine()
   .x(x0)
   .y(y0);

  area.lineY1 = () => arealine()
   .x(x0)
   .y(y1);

  area.lineX1 = () => arealine()
   .x(x1)
   .y(y0);

  area.defined = _ => isUndef(_)
   ? defined
   : (defined = isFn(_) ? _ : crFnConstant(!!_), area);

  area.curve = _ => isUndef(_)
   ? curve
   : (curve = _, context != null && (output = curve(context)), area);

  area.context = _ => isUndef(_)
   ? context
   : (_ == null ? context = output = null : output = curve(context = _), area);

  return area;
}
