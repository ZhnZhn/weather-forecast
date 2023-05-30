import {
  mathFloor,
  LOG_BASE,
  MAX_E,
  exponentOutOfRange,
  getExternal
} from './decimalLightConfig';

export default function parseDecimal(x, str) {
  let e, i, len;

  // Decimal point case
  if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');

  // Exponential form case
  if ((i = str.search(/e/i)) > 0) {

    // Determine exponent
    if (e < 0) e = i;
    e += +str.slice(i + 1);
    str = str.substring(0, i);
  } else if (e < 0) {

    // Integer
    e = str.length;
  }

  // Determine leading zeros
  for (i = 0; str.charCodeAt(i) === 48;) ++i;

  // Determine trailing zeros
  for (len = str.length; str.charCodeAt(len - 1) === 48;) --len;
  str = str.slice(i, len);

  if (str) {
    len -= i;
    e = e - i - 1;
    x.e = mathFloor(e / LOG_BASE);
    x.d = [];

    // Transform base
    // e is the base 10 exponent
    // i is where to slice str to get the first word of the digits array
    i = (e + 1) % LOG_BASE;
    if (e < 0) i += LOG_BASE;

    if (i < len) {
      if (i) x.d.push(+str.slice(0, i));
      for (len -= LOG_BASE; i < len;) x.d.push(+str.slice(i, i += LOG_BASE));
      str = str.slice(i);
      i = LOG_BASE - str.length;
    } else {
      i -= len;
    }

    for (; i--;) str += '0';
    x.d.push(+str);

    if (getExternal() && (x.e > MAX_E || x.e < -MAX_E)) throw Error(exponentOutOfRange + e);
  } else {

    // Zero case
    x.s = 0;
    x.e = 0;
    x.d = [0];
  }

  return x;
}
