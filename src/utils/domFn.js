import { isStr } from './isTypeFn';

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
