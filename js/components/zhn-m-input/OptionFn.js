"use strict";

exports.__esModule = true;
exports.getItemValue = exports.getItemCaption = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
const getItemCaption = item => (0, _isTypeFn.isArr)(item) ? item[0] : (0, _isTypeFn.isStr)(item) ? item : void 0;
exports.getItemCaption = getItemCaption;
const getItemValue = item => {
  const value = (0, _isTypeFn.isArr)(item) ? (0, _isTypeFn.isStr)(item[1]) ? item[1] : item[0] : (0, _isTypeFn.isStr)(item) ? item : void 0;
  return (0, _isTypeFn.isStr)(value) ? value.trim() : value;
};
exports.getItemValue = getItemValue;
//# sourceMappingURL=OptionFn.js.map