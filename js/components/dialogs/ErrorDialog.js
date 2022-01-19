"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _useTheme = _interopRequireDefault(require("../hooks/useTheme"));

var _Dialog = _interopRequireDefault(require("./Dialog.Style"));

var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));

var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));

var _selectors = require("../../flux/selectors");

var _jsxRuntime = require("react/jsx-runtime");

var S_MODAL = {
  position: 'static',
  width: 335,
  height: 285,
  margin: '70px auto 0px'
},
    S_MSG = {
  height: 200,
  padding: 16,
  lineHeight: 1.2,
  fontWeight: 600
};

var ErrorDialog = function ErrorDialog(_ref) {
  var isShow = _ref.isShow,
      store = _ref.store,
      onClose = _ref.onClose;

  var TS = (0, _useTheme["default"])(_Dialog["default"]),
      _errMsg = _selectors.sModal.errMsg(store.getState());

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalDialog["default"], {
    style: (0, _extends2["default"])({}, S_MODAL, TS.R_DIALOG),
    caption: "Error Description",
    isShow: isShow,
    onClose: onClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: S_MSG,
      children: _errMsg
    })
  });
};

var _default = (0, _memoIsShow["default"])(ErrorDialog);

exports["default"] = _default;
//# sourceMappingURL=ErrorDialog.js.map