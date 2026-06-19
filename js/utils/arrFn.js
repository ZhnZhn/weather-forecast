"use strict";

exports.__esModule = true;
exports.joinByCollon2 = exports.getByIndexAndProp = void 0;
var _isTypeFn = require("./isTypeFn");
const getByIndexAndProp = (arr, i, prop, dfValue) => (0, _isTypeFn.isArr)(arr) ? arr?.[i]?.[prop] ?? dfValue : dfValue;
exports.getByIndexAndProp = getByIndexAndProp;
const joinByCollon2 = (v1, v2) => [v1, v2].filter(Boolean).join(': ');
exports.joinByCollon2 = joinByCollon2;
//# sourceMappingURL=arrFn.js.map