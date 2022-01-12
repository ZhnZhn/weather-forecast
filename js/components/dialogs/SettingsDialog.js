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

var _TabPane = _interopRequireDefault(require("../zhn-atoms/TabPane"));

var _Tab = _interopRequireDefault(require("../zhn-atoms/Tab"));

var _CardApiKey = _interopRequireDefault(require("./CardApiKey"));

var _CardUi = _interopRequireDefault(require("./CardUi"));

//import PropTypes from 'prop-types';
var Component = _react["default"].Component;
var S_MODAL = {
  position: 'static',
  width: 342,
  height: 285,
  margin: '70px auto 0px'
},
    S_TABS = {
  textAlign: 'left',
  marginLeft: 24
},
    S_TAB_SELECTED = {
  color: 'black'
},
    S_CARD_ROOT = {
  position: 'relative',
  height: 200
},
    S_CARD_BUTTONS = {
  position: 'absolute',
  right: 4,
  bottom: 0,
  cursor: 'default'
};

var SettingsDialog = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(SettingsDialog, _Component);

  function SettingsDialog() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this._isNextPropIsShowSame = function (nextProps) {
      return nextProps !== _this.props && nextProps.isShow === _this.props.isShow;
    };

    _this._handleSetTheme = function (item) {
      var _this$props = _this.props,
          theme = _this$props.theme,
          data = _this$props.data,
          onSetTheme = data.onSetTheme,
          prevTheme = theme.themeName;
      onSetTheme(theme, item.value);

      if (prevTheme !== item.value) {
        _this.forceUpdate();
      }
    };

    return _this;
  }

  var _proto = SettingsDialog.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    if (this._isNextPropIsShowSame(nextProps)) {
      return false;
    }

    return true;
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        theme = _this$props2.theme,
        isShow = _this$props2.isShow,
        onClose = _this$props2.onClose,
        data = _this$props2.data,
        onSet = data.onSet,
        TS = theme.createStyle(_Dialog["default"]);
    return /*#__PURE__*/_react["default"].createElement(_ModalDialog["default"], {
      style: (0, _extends2["default"])({}, S_MODAL, TS.R_DIALOG),
      caption: "User Settings",
      isShow: isShow,
      isWithButton: false,
      onClose: onClose
    }, /*#__PURE__*/_react["default"].createElement(_TabPane["default"], {
      width: "100%",
      tabsStyle: S_TABS
    }, /*#__PURE__*/_react["default"].createElement(_Tab["default"], {
      title: "API Key",
      selectedStyle: S_TAB_SELECTED
    }, /*#__PURE__*/_react["default"].createElement(_CardApiKey["default"], {
      style: S_CARD_ROOT,
      buttonsStyle: S_CARD_BUTTONS,
      onSet: onSet,
      onClose: onClose
    })), /*#__PURE__*/_react["default"].createElement(_Tab["default"], {
      title: "UI Theme",
      selectedStyle: S_TAB_SELECTED
    }, /*#__PURE__*/_react["default"].createElement(_CardUi["default"], {
      style: S_CARD_ROOT,
      buttonsStyle: S_CARD_BUTTONS,
      onSetTheme: this._handleSetTheme,
      onClose: onClose
    }))));
  };

  return SettingsDialog;
}(Component);

var _default = (0, _withTheme["default"])(SettingsDialog);

exports["default"] = _default;
//# sourceMappingURL=SettingsDialog.js.map