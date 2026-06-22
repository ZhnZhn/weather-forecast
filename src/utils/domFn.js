import {
  isNumber,
  isStr
} from './isTypeFn';

const _reEscapeHtml = /[<>&"]/g
, HP_ESCAPE_HTML = Object.create(null);
HP_ESCAPE_HTML['<'] = '&lt;'
HP_ESCAPE_HTML['>'] = '&gt;'
HP_ESCAPE_HTML['&'] = '&amp;'
HP_ESCAPE_HTML['"'] = '&quot;'
Object.freeze(HP_ESCAPE_HTML)

export const escapeStrHtml = (str) => isStr(str)
  ? str.replace(_reEscapeHtml, (ch) => HP_ESCAPE_HTML[ch] || ch)
  : ''

export const getNumberOr = (
  v
) => isNumber(v)
  ? v
  : ''

const _iconTokens = [
  '01d', '01n',
  '02d', '02n',
  '03d', '03n',
  '04d', '04n',
  '09d', '09n',
  '10d', '10n',
  '11d', '11n',
  '13d', '13n',
  '50d', '50n'
];

const _isIconToken = (
  icon
) => _iconTokens.indexOf(icon) !== -1

export const crIconImgSrc = icon => _isIconToken(icon)
  ? `./img/${icon}.png`
  : void 0
