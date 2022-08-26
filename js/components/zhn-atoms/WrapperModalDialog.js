"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime");

var CL_INIT = 'modal-root',
    CL_SHOWING = CL_INIT + " show-modal",
    S_SHOW = {
  display: 'block'
},
    S_HIDE = {
  display: 'none'
};

var WrapperModalDialog = function WrapperModalDialog(_ref) {
  var isShow = _ref.isShow,
      onClose = _ref.onClose,
      children = _ref.children;

  var _ref2 = isShow ? [CL_SHOWING, S_SHOW] : [CL_INIT, S_HIDE],
      _className = _ref2[0],
      _style = _ref2[1];

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    role: "presentation",
    className: _className,
    style: _style,
    onClick: onClose,
    children: children
  });
};

var _default = WrapperModalDialog;
exports["default"] = _default;
//# sourceMappingURL=WrapperModalDialog.js.map