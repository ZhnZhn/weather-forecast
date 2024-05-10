"use strict";

exports.__esModule = true;
exports.IS_SSR = void 0;
const parseIsSsrByDefault = () => !(typeof window !== 'undefined' && window.document && window.document.createElement && window.setTimeout);
const IS_SSR = exports.IS_SSR = parseIsSsrByDefault();
//# sourceMappingURL=Global.js.map