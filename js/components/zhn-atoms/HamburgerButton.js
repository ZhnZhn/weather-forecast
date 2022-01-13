"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _uiApi = require("../uiApi");

var _reactRedux = require("react-redux");

var _crCn = _interopRequireDefault(require("../zhn-utils/crCn"));

var _jsxRuntime = require("react/jsx-runtime");

var CL_BT_HAMBURGER = "bt-hamburger",
    CL_OPENED = "opened",
    S_HAMBURGER = {
  width: '2.2rem',
  height: '2.2rem',
  verticalAlign: 'middle',
  marginBottom: '0.5rem',
  marginLeft: '0.8rem',
  borderRadius: '0.4rem'
};

var HamburgerButton = function HamburgerButton(_ref) {
  var storeKey = _ref.storeKey,
      onClick = _ref.onClick;

  var isOpen = (0, _reactRedux.useSelector)(function (state) {
    return state.layout[storeKey];
  })
  /*eslint-disable react-hooks/exhaustive-deps */
  ,
      _hClick = (0, _uiApi.useCallback)(function () {
    onClick(storeKey);
  }, [storeKey]) // onClick

  /*eslint-enable react-hooks/exhaustive-deps */
  ,
      btClass = (0, _crCn["default"])(CL_BT_HAMBURGER, [isOpen, CL_OPENED]);

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    className: btClass,
    style: S_HAMBURGER,
    onClick: _hClick,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {})
  });
};

var _default = HamburgerButton;
exports["default"] = _default;
//# sourceMappingURL=HamburgerButton.js.map