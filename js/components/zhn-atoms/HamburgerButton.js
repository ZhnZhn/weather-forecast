"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("../_react"));

var _reactRedux = require("react-redux");

var useCallback = _react["default"].useCallback;
var S = {
  HAMBURGER: {
    width: '2.2rem',
    height: '2.2rem',
    verticalAlign: 'middle',
    marginBottom: '0.5rem',
    marginLeft: '0.8rem',
    borderRadius: '0.4rem'
  }
};

var HamburgerButton = function HamburgerButton(_ref) {
  var storeKey = _ref.storeKey,
      onClick = _ref.onClick;

  var isOpen = (0, _reactRedux.useSelector)(function (state) {
    return state.layout[storeKey];
  }),
      _hClick = useCallback(function () {
    onClick(storeKey);
  }, [storeKey]),
      btClass = isOpen ? "bt-hamburger opened" : "bt-hamburger";

  return /*#__PURE__*/_react["default"].createElement("button", {
    className: btClass,
    style: S.HAMBURGER,
    onClick: _hClick
  }, /*#__PURE__*/_react["default"].createElement("span", null));
};

var _default = HamburgerButton;
exports["default"] = _default;
//# sourceMappingURL=HamburgerButton.js.map