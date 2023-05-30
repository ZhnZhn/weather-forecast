export default function cmp (y) {
  let i, j, xdL, ydL
  , x = this;

  y = new x.constructor(y);

  // Signs differ
  if (x.s !== y.s) return x.s || -y.s;

  // Compare exponents case
  if (x.e !== y.e) return x.e > y.e ^ x.s < 0 ? 1 : -1;

  xdL = x.d.length;
  ydL = y.d.length;

  // Compare digit by digit case
  for (i = 0, j = xdL < ydL ? xdL : ydL; i < j; ++i) {
    if (x.d[i] !== y.d[i]) return x.d[i] > y.d[i] ^ x.s < 0 ? 1 : -1;
  }

  // Compare lengths case
  return xdL === ydL
    ? 0
    : xdL > ydL ^ x.s < 0
       ? 1
       : -1;
}
