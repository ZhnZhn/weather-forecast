"use strict";

exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../styleFn");
var _jsxRuntime = require("react/jsx-runtime");
const CL_SHOW_POPUP = 'show-popup';
const ShowHide = _ref => {
  let {
    isShow,
    className,
    style,
    children,
    ...restProps
  } = _ref;
  const _className = (0, _styleFn.crCn)(className, [isShow, CL_SHOW_POPUP]),
    _styleShow = isShow ? _styleFn.S_BLOCK : _styleFn.S_NONE;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: _className,
    style: {
      ...style,
      ..._styleShow
    },
    ...restProps,
    children: children
  });
};
var _default = exports.default = ShowHide;
//# sourceMappingURL=ShowHide.js.map