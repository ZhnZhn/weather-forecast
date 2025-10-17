"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.formatPrefix = exports.format = void 0;
var _locale = _interopRequireDefault(require("./locale"));
const _DF_LOCALE_DEFINITION = {
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
};
let locale = (0, _locale.default)(_DF_LOCALE_DEFINITION);
let format = exports.format = locale.format;
let formatPrefix = exports.formatPrefix = locale.formatPrefix;
//# sourceMappingURL=defaultLocale.js.map