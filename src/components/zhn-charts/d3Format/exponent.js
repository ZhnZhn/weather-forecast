import { formatDecimalParts } from "./formatDecimal";

export default x => (
  x = formatDecimalParts(Math.abs(x)),
  x ? x[1] : NaN
)
