"use strict";

exports.__esModule = true;
exports.crShowHideStyle = exports.crShowHide = exports.crCn = exports.S_NONE = exports.S_BLOCK = exports.CL_DIALOG = exports.CL_BG = void 0;
const _isArr = Array.isArray;
const _getCn = arrOrStr => _isArr(arrOrStr) ? arrOrStr[0] ? arrOrStr[1] : '' : arrOrStr || '';
const crCn = (conf1, conf2) => {
  const _cl1 = _getCn(conf1),
    _cl2 = _getCn(conf2);
  return _cl1 ? _cl2 ? `${_cl1} ${_cl2}` : _cl1 : _cl2 || void 0;
};
exports.crCn = crCn;
const CL_BG = exports.CL_BG = 'bg';
const CL_DIALOG = exports.CL_DIALOG = 'dialog';
const S_BLOCK = exports.S_BLOCK = {
  display: 'block'
};
const S_NONE = exports.S_NONE = {
  display: 'none'
};
const CL_SHOW_POPUP = 'show-popup';
const crShowHide = (is, className, withoutAnimation, animationClassName) => is ? [crCn(className, [!withoutAnimation, animationClassName || CL_SHOW_POPUP]), S_BLOCK] : [className, S_NONE];
exports.crShowHide = crShowHide;
const crShowHideStyle = is => is ? S_BLOCK : S_NONE;
exports.crShowHideStyle = crShowHideStyle;
//# sourceMappingURL=styleFn.js.map