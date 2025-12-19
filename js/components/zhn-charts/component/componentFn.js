"use strict";

exports.__esModule = true;
exports.getUniqPayload = void 0;
var _isTypeFn = require("../../../utils/isTypeFn");
const _uniqBy = (arr, iteratee) => {
  if ((0, _isTypeFn.isStr)(iteratee)) {
    const prop = iteratee;
    iteratee = item => item[prop];
  }
  return arr.filter((x, i, arrSelf) => i === arrSelf.findIndex(y => iteratee(x) === iteratee(y)));
};
const getUniqPayload = (option, payload, getUniqBy) => option === !0 ? _uniqBy(payload, getUniqBy) : (0, _isTypeFn.isFn)(option) ? _uniqBy(payload, option) : payload;
exports.getUniqPayload = getUniqPayload;
//# sourceMappingURL=componentFn.js.map