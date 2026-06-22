"use strict";

exports.__esModule = true;
exports.getNumberOr = exports.escapeStrHtml = exports.crIconImgSrc = void 0;
var _isTypeFn = require("./isTypeFn");
const _reEscapeHtml = /[<>&"]/g,
  HP_ESCAPE_HTML = Object.create(null);
HP_ESCAPE_HTML['<'] = '&lt;';
HP_ESCAPE_HTML['>'] = '&gt;';
HP_ESCAPE_HTML['&'] = '&amp;';
HP_ESCAPE_HTML['"'] = '&quot;';
Object.freeze(HP_ESCAPE_HTML);
const escapeStrHtml = str => (0, _isTypeFn.isStr)(str) ? str.replace(_reEscapeHtml, ch => HP_ESCAPE_HTML[ch] || ch) : '';
exports.escapeStrHtml = escapeStrHtml;
const getNumberOr = v => (0, _isTypeFn.isNumber)(v) ? v : '';
exports.getNumberOr = getNumberOr;
const _iconTokens = ['01d', '01n', '02d', '02n', '03d', '03n', '04d', '04n', '09d', '09n', '10d', '10n', '11d', '11n', '13d', '13n', '50d', '50n'];
const _isIconToken = icon => _iconTokens.indexOf(icon) !== -1;
const crIconImgSrc = icon => _isIconToken(icon) ? `./img/${icon}.png` : void 0;
exports.crIconImgSrc = crIconImgSrc;
//# sourceMappingURL=domFn.js.map