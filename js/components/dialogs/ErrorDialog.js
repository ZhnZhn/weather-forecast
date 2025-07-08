"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));
var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));
var _selectors = require("../../flux/selectors");
var _jsxRuntime = require("react/jsx-runtime");
const S_MODAL = {
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
const ErrorDialog = _ref => {
  let {
    isShow,
    store,
    onClose
  } = _ref;
  const _errMsg = _selectors.sModal.errMsg(store.getState());
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalDialog.default, {
    style: S_MODAL,
    caption: "Error Description",
    isShow: isShow,
    onClose: onClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: S_MSG,
      children: _errMsg
    })
  });
};
var _default = exports.default = (0, _memoIsShow.default)(ErrorDialog);
//# sourceMappingURL=ErrorDialog.js.map