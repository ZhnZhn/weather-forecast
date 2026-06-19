import {
  isNumber,
  isStr
} from './isTypeFn';

export const escapeStrHtml = (str) => isStr(str)
  ? str.replace(/[<>&"]/g, (ch) => {
     switch (ch) {
       case '<': return '&lt;';
       case '>': return '&gt;';
       case '&': return '&amp;';
       case '"': return '&quot;';
       default: return ch;
     }
  }) : ''

export const getNumberOr = (
  v
) => isNumber(v)
  ? v
  : ''

  const iconTokens = [
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
