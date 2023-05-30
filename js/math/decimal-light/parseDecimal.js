"use strict";

exports.__esModule = true;
exports["default"] = parseDecimal;
var _decimalLightConfig = require("./decimalLightConfig");
function parseDecimal(x, str) {
  var e, i, len;

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
    x.e = (0, _decimalLightConfig.mathFloor)(e / _decimalLightConfig.LOG_BASE);
    x.d = [];

    // Transform base
    // e is the base 10 exponent
    // i is where to slice str to get the first word of the digits array
    i = (e + 1) % _decimalLightConfig.LOG_BASE;
    if (e < 0) i += _decimalLightConfig.LOG_BASE;
    if (i < len) {
      if (i) x.d.push(+str.slice(0, i));
      for (len -= _decimalLightConfig.LOG_BASE; i < len;) x.d.push(+str.slice(i, i += _decimalLightConfig.LOG_BASE));
      str = str.slice(i);
      i = _decimalLightConfig.LOG_BASE - str.length;
    } else {
      i -= len;
    }
    for (; i--;) str += '0';
    x.d.push(+str);
    if ((0, _decimalLightConfig.getExternal)() && (x.e > _decimalLightConfig.MAX_E || x.e < -_decimalLightConfig.MAX_E)) throw Error(_decimalLightConfig.exponentOutOfRange + e);
  } else {
    // Zero case
    x.s = 0;
    x.e = 0;
    x.d = [0];
  }
  return x;
}
//# sourceMappingURL=parseDecimal.js.map