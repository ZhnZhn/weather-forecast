'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('../_react');

var _react2 = _interopRequireDefault(_react);

var _withTheme = require('../hoc/withTheme');

var _withTheme2 = _interopRequireDefault(_withTheme);

var _Dialog = require('./Dialog.Style');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _ModalDialog = require('../zhn-moleculs/ModalDialog');

var _ModalDialog2 = _interopRequireDefault(_ModalDialog);

var _TabPane = require('../zhn-atoms/TabPane');

var _TabPane2 = _interopRequireDefault(_TabPane);

var _Tab = require('../zhn-atoms/Tab');

var _Tab2 = _interopRequireDefault(_Tab);

var _CardApiKey = require('./CardApiKey');

var _CardApiKey2 = _interopRequireDefault(_CardApiKey);

var _CardUi = require('./CardUi');

var _CardUi2 = _interopRequireDefault(_CardUi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//import PropTypes from 'prop-types';

var Component = _react2.default.Component;


var S = {
  MODAL: {
    position: 'static',
    width: '342px',
    height: '285px',
    margin: '70px auto 0px'
  },
  TABS: {
    textAlign: 'left',
    marginLeft: '24px'
  },
  TAB_SELECTED: {
    //color: '#2f7ed8'
    color: 'black'
  },
  CARD_ROOT: {
    position: 'relative',
    height: '200px'
  },
  CARD_BUTTONS: {
    position: 'absolute',
    right: '4px',
    bottom: 0,
    cursor: 'default'
  }
};

var SettingsDialog = function (_Component) {
  _inherits(SettingsDialog, _Component);

  function SettingsDialog() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SettingsDialog);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SettingsDialog.__proto__ || Object.getPrototypeOf(SettingsDialog)).call.apply(_ref, [this].concat(args))), _this), _this._isNextPropIsShowSame = function (nextProps) {
      return nextProps !== _this.props && nextProps.isShow === _this.props.isShow;
    }, _this._handleSet = function () {
      var _this$props = _this.props,
          data = _this$props.data,
          onClose = _this$props.onClose,
          onSet = data.onSet;

      onSet(_this.inputApiKey.getValue());
      onClose();
    }, _this._handleSetTheme = function (item) {
      var _this$props2 = _this.props,
          theme = _this$props2.theme,
          data = _this$props2.data,
          onSetTheme = data.onSetTheme,
          prevTheme = theme.themeName;

      onSetTheme(theme, item.value);
      if (prevTheme !== item.value) {
        _this.forceUpdate();
      }
    }, _this._refInput = function (c) {
      return _this.inputApiKey = c;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  /*
  static propTypes = {
    isShow: PropTypes.bool,
    data: PropTypes.shape({
      onSet: PropTypes.func
    }),
    onClose: PropTypes.func
  }
  */

  _createClass(SettingsDialog, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (this._isNextPropIsShowSame(nextProps)) {
        return false;
      }
      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          theme = _props.theme,
          isShow = _props.isShow,
          onClose = _props.onClose,
          TS = theme.createStyle(_Dialog2.default);

      return _react2.default.createElement(
        _ModalDialog2.default,
        {
          style: _extends({}, S.MODAL, TS.R_DIALOG),
          caption: 'User Settings',
          isShow: isShow,
          isWithButton: false,
          onClose: onClose
        },
        _react2.default.createElement(
          _TabPane2.default,
          { width: '100%', tabsStyle: S.TABS },
          _react2.default.createElement(
            _Tab2.default,
            {
              title: 'API Key',
              selectedStyle: S.TAB_SELECTED
            },
            _react2.default.createElement(_CardApiKey2.default, {
              ref: this._refInput,
              style: S.CARD_ROOT,
              buttonsStyle: S.CARD_BUTTONS,
              onSet: this._handleSet,
              onClose: onClose
            })
          ),
          _react2.default.createElement(
            _Tab2.default,
            {
              title: 'UI Theme',
              selectedStyle: S.TAB_SELECTED
            },
            _react2.default.createElement(_CardUi2.default, {
              style: S.CARD_ROOT,
              buttonsStyle: S.CARD_BUTTONS,
              onSetTheme: this._handleSetTheme,
              onClose: onClose
            })
          )
        )
      );
    }
  }]);

  return SettingsDialog;
}(Component);

exports.default = (0, _withTheme2.default)(SettingsDialog);
//# sourceMappingURL=SettingsDialog.js.map