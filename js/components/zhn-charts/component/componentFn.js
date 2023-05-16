"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.getUniqPayload = void 0;
var _uniqBy2 = _interopRequireDefault(require("lodash/uniqBy"));
var _FnUtils = require("../util/FnUtils");
var getUniqPayload = function getUniqPayload(option, payload, getUniqBy) {
  return option === true ? (0, _uniqBy2["default"])(payload, getUniqBy) : (0, _FnUtils._isFn)(option) ? (0, _uniqBy2["default"])(payload, option) : payload;
};
exports.getUniqPayload = getUniqPayload;
//# sourceMappingURL=componentFn.js.map