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

var _selectors = require('../../flux/selectors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//import PropTypes from 'prop-types';

var Component = _react2.default.Component;


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

var ErrorDialog = function (_Component) {
  _inherits(ErrorDialog, _Component);

  function ErrorDialog() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ErrorDialog);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ErrorDialog.__proto__ || Object.getPrototypeOf(ErrorDialog)).call.apply(_ref, [this].concat(args))), _this), _this._isNextPropIsShowSame = function (nextProps) {
      return nextProps !== _this.props && nextProps.isShow === _this.props.isShow;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ErrorDialog, [{
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
          store = _props.store,
          onClose = _props.onClose,
          TS = theme.createStyle(_Dialog2.default),
          _errMsg = _selectors.sModal.errMsg(store.getState());

      return _react2.default.createElement(
        _ModalDialog2.default,
        {
          style: _extends({}, S.MODAL, TS.R_DIALOG),
          caption: 'Error Description',
          isShow: isShow,
          onClose: onClose
        },
        _react2.default.createElement(
          'div',
          { style: S.MSG },
          _errMsg
        )
      );
    }
  }]);

  return ErrorDialog;
}(Component);

exports.default = (0, _withTheme2.default)(ErrorDialog);
//# sourceMappingURL=ErrorDialog.js.map