export default function(series) {
  let n = series.length
  , o = new Array(n);
  while (--n >= 0) o[n] = n;
  return o;
}
