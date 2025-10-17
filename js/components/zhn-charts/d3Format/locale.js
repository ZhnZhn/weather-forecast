"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = _default;
var _exponent = _interopRequireDefault(require("./exponent.js"));
var _formatGroup = _interopRequireDefault(require("./formatGroup.js"));
var _formatNumerals = _interopRequireDefault(require("./formatNumerals.js"));
var _formatSpecifier = require("./formatSpecifier.js");
var _formatTrim = _interopRequireDefault(require("./formatTrim.js"));
var _formatTypes = _interopRequireDefault(require("./formatTypes.js"));
var _formatPrefixAuto = require("./formatPrefixAuto.js");
var _identity = _interopRequireDefault(require("./identity.js"));
var _formatFn = require("./formatFn");
const map = Array.prototype.map,
  prefixes = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"],
  _calcMaxMin = (n1, n2, n3) => Math.max(n1, Math.min(n2, n3));
function _default(locale) {
  const group = locale.grouping === undefined || locale.thousands === undefined ? _identity.default : (0, _formatGroup.default)(map.call(locale.grouping, Number), locale.thousands + ""),
    localCurrency = locale.currency,
    currencyPrefix = localCurrency === undefined ? "" : localCurrency[0] + "",
    currencySuffix = localCurrency === undefined ? "" : localCurrency[1] + "",
    decimal = (0, _formatFn.getStrValue)(locale.decimal, "."),
    numerals = locale.numerals === undefined ? _identity.default : (0, _formatNumerals.default)(map.call(locale.numerals, String)),
    percent = (0, _formatFn.getStrValue)(locale.percent, "%"),
    minus = (0, _formatFn.getStrValue)(locale.minus, "−"),
    nan = (0, _formatFn.getStrValue)(locale.nan, "NaN"),
    format = specifier => {
      specifier = (0, _formatSpecifier.formatSpecifier)(specifier);
      let fill = specifier.fill,
        align = specifier.align,
        sign = specifier.sign,
        symbol = specifier.symbol,
        zero = specifier.zero,
        width = specifier.width,
        comma = specifier.comma,
        precision = specifier.precision,
        trim = specifier.trim,
        type = specifier.type;

      // The "n" type is an alias for ",g".
      if (type === "n") {
        comma = true;
        type = "g";
      }

      // The "" type, and any invalid type, is an alias for ".12~g".
      else if (!_formatTypes.default[type]) {
        if (precision === undefined) {
          precision = 12;
        }
        //precision === undefined && (precision = 12)
        trim = true;
        type = "g";
      }

      // If zero fill is specified, padding goes after sign and before digits.
      if (zero || fill === "0" && align === "=") {
        zero = true;
        fill = "0";
        align = "=";
      }

      // Compute the prefix and suffix.
      // For SI-prefix, the suffix is lazily computed.
      let prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
        suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "";

      // What format function should we use?
      // Is this an integer type?
      // Can this type generate exponential notation?
      let formatType = _formatTypes.default[type],
        maybeSuffix = /[defgprs%]/.test(type);

      // Set the default precision if not specified,
      // or clamp the specified precision to the supported range.
      // For significant precision, it must be in [1, 21].
      // For fixed precision, it must be in [0, 20].
      precision = precision === undefined ? 6 : /[gprs]/.test(type) ? _calcMaxMin(1, 21, precision) : _calcMaxMin(0, 20, precision);
      const formatImpl = value => {
        let valuePrefix = prefix,
          valueSuffix = suffix,
          i,
          n,
          c;
        if (type === "c") {
          valueSuffix = formatType(value) + valueSuffix;
          value = "";
        } else {
          value = +value;

          // Determine the sign. -0 is not less than 0, but 1 / -0 is!
          let valueNegative = value < 0 || 1 / value < 0;

          // Perform the initial formatting.
          value = isNaN(value) ? nan : formatType(Math.abs(value), precision);

          // Trim insignificant zeros.
          if (trim) value = (0, _formatTrim.default)(value);

          // If a negative value rounds to zero after formatting, and no explicit positive sign is requested, hide the sign.
          if (valueNegative && +value === 0 && sign !== "+") valueNegative = false;

          // Compute the prefix and suffix.
          valuePrefix = (valueNegative ? sign === "(" ? sign : minus : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
          valueSuffix = (type === "s" ? prefixes[8 + _formatPrefixAuto.prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");

          // Break the formatted value into the integer “value” part that can be
          // grouped, and fractional or exponential “suffix” part that is not.
          if (maybeSuffix) {
            i = -1;
            n = value.length;
            while (++i < n) {
              if (c = value.charCodeAt(i), 48 > c || c > 57) {
                valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
                value = value.slice(0, i);
                break;
              }
            }
          }
        }

        // If the fill character is not "0", grouping is applied before padding.
        if (comma && !zero) value = group(value, Infinity);

        // Compute the padding.
        let length = valuePrefix.length + value.length + valueSuffix.length,
          padding = length < width ? new Array(width - length + 1).join(fill) : "";

        // If the fill character is "0", grouping is applied after padding.
        if (comma && zero) {
          value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity);
          padding = "";
        }

        // Reconstruct the final output based on the desired alignment.
        value = align === "<" ? valuePrefix + value + valueSuffix + padding : align === "=" ? valuePrefix + padding + value + valueSuffix : align === "^" ? padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length) : padding + valuePrefix + value + valueSuffix;
        return numerals(value);
      };
      formatImpl.toString = () => specifier + "";
      return formatImpl;
    },
    formatPrefix = (specifier, value) => {
      const f = format((specifier = (0, _formatSpecifier.formatSpecifier)(specifier), specifier.type = "f", specifier)),
        e = _calcMaxMin(-8, 8, Math.floor((0, _exponent.default)(value) / 3)) * 3,
        k = Math.pow(10, -e),
        prefix = prefixes[8 + e / 3];
      return value => f(k * value) + prefix;
    };
  return {
    format,
    formatPrefix
  };
}
//# sourceMappingURL=locale.js.map