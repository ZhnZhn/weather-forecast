"use strict";

exports.__esModule = true;
exports.getUniqPayload = void 0;
var _FnUtils = require("../util/FnUtils");
var getUniqPayload = function getUniqPayload(option, payload, getUniqBy) {
  return option === true ? (0, _FnUtils._uniqBy)(payload, getUniqBy) : (0, _FnUtils._isFn)(option) ? (0, _FnUtils._uniqBy)(payload, option) : payload;
};
exports.getUniqPayload = getUniqPayload;
//# sourceMappingURL=componentFn.js.map