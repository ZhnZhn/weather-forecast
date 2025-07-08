"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.crShowHide = exports.S_NONE = exports.S_BLOCK = exports.CL_DIALOG = exports.CL_BG = void 0;
var _crCn = _interopRequireDefault(require("./zhn-utils/crCn"));
const CL_BG = exports.CL_BG = 'bg';
const CL_DIALOG = exports.CL_DIALOG = 'dialog';
const S_BLOCK = exports.S_BLOCK = {
  display: 'block'
};
const S_NONE = exports.S_NONE = {
  display: 'none'
};
const CL_SHOW_POPUP = 'show-popup';
const crShowHide = (is, className, withoutAnimation, animationClassName) => is ? [(0, _crCn.default)(className, [!withoutAnimation, animationClassName || CL_SHOW_POPUP]), S_BLOCK] : [className, S_NONE];
exports.crShowHide = crShowHide;
//# sourceMappingURL=styleFn.js.map