"use strict";

exports.__esModule = true;
exports.getNumberOr = exports.escapeStrHtml = void 0;
var _isTypeFn = require("./isTypeFn");
const escapeStrHtml = str => (0, _isTypeFn.isStr)(str) ? str.replace(/[<>&"]/g, ch => {
  switch (ch) {
    case '<':
      return '&lt;';
    case '>':
      return '&gt;';
    case '&':
      return '&amp;';
    case '"':
      return '&quot;';
    default:
      return ch;
  }
}) : '';
exports.escapeStrHtml = escapeStrHtml;
const getNumberOr = v => (0, _isTypeFn.isNumber)(v) ? v : '';
exports.getNumberOr = getNumberOr;
//# sourceMappingURL=domFn.js.map