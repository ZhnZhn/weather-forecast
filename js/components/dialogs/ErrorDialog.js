"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("../_react"));

var _withTheme = _interopRequireDefault(require("../hoc/withTheme"));

var _Dialog = _interopRequireDefault(require("./Dialog.Style"));

var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));

var _selectors = require("../../flux/selectors");

//import PropTypes from 'prop-types';
var Component = _react["default"].Component;
var S = {
  MODAL: {
    position: 'static',
    width: '335px',
    height: '285px',
    margin: '70px auto 0px'
  },
  MSG: {
    height: '200px',
    lineHeight: 1.2,
    padding: '16px',
    fontWeight: 600
  }
};

var ErrorDialog =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(ErrorDialog, _Component);

  function ErrorDialog() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this._isNextPropIsShowSame = function (nextProps) {
      return nextProps !== _this.props && nextProps.isShow === _this.props.isShow;
    };

    return _this;
  }

  var _proto = ErrorDialog.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    if (this._isNextPropIsShowSame(nextProps)) {
      return false;
    }

    return true;
  };

  _proto.render = function render() {
    var _this$props = this.props,
        theme = _this$props.theme,
        isShow = _this$props.isShow,
        store = _this$props.store,
        onClose = _this$props.onClose,
        TS = theme.createStyle(_Dialog["default"]),
        _errMsg = _selectors.sModal.errMsg(store.getState());

    return _react["default"].createElement(_ModalDialog["default"], {
      style: (0, _extends2["default"])({}, S.MODAL, {}, TS.R_DIALOG),
      caption: "Error Description",
      isShow: isShow,
      onClose: onClose
    }, _react["default"].createElement("div", {
      style: S.MSG
    }, _errMsg));
  };

  return ErrorDialog;
}(Component);

var _default = (0, _withTheme["default"])(ErrorDialog);

exports["default"] = _default;
//# sourceMappingURL=ErrorDialog.js.map