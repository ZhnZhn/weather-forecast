import { formatDecimalParts } from "./formatDecimal";

export default (x, p) => {
  let d = formatDecimalParts(x, p);
  if (!d) return x + "";
  let coefficient = d[0]
  , exponent = d[1];
  return exponent < 0
    ? "0." + new Array(-exponent).join("0") + coefficient
    : coefficient.length > exponent + 1
       ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1)
       : coefficient + new Array(exponent - coefficient.length + 2).join("0");
}
