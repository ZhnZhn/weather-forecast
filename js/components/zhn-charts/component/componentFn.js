"use strict";

exports.__esModule = true;
exports.getUniqPayload = void 0;
var _isTypeFn = require("../../../utils/isTypeFn");
var _FnUtils = require("../util/FnUtils");
const getUniqPayload = (option, payload, getUniqBy) => option === !0 ? (0, _FnUtils._uniqBy)(payload, getUniqBy) : (0, _isTypeFn.isFn)(option) ? (0, _FnUtils._uniqBy)(payload, option) : payload;
exports.getUniqPayload = getUniqPayload;
//# sourceMappingURL=componentFn.js.map