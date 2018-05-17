'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('../_react');

var _react2 = _interopRequireDefault(_react);

var _Router = require('../dialogs/Router');

var _Router2 = _interopRequireDefault(_Router);

var _RouterData = require('../dialogs/RouterData');

var _RouterData2 = _interopRequireDefault(_RouterData);

var _WrapperModalDialog = require('../zhn-atoms/WrapperModalDialog');

var _WrapperModalDialog2 = _interopRequireDefault(_WrapperModalDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//import PropTypes from 'prop-types'

var Component = _react2.default.Component;

var ModalDialogContainer = function (_Component) {
  _inherits(ModalDialogContainer, _Component);

  function ModalDialogContainer() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ModalDialogContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ModalDialogContainer.__proto__ || Object.getPrototypeOf(ModalDialogContainer)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isShow: false,
      inits: {},
      shows: {},
      data: {},
      dialogs: [],
      currentDialog: null
    }, _this._onStore = function () {
      var store = _this.props.store,
          _store$getState = store.getState(),
          modal = _store$getState.modal,
          type = modal.id;

      if (type && _this.modal !== modal) {
        _this.modal = modal;
        var _this$state = _this.state,
            inits = _this$state.inits,
            shows = _this$state.shows,
            data = _this$state.data,
            dialogs = _this$state.dialogs;

        if (!inits[type]) {
          dialogs.push({ type: type, comp: _Router2.default[type] });
          data[type] = _RouterData2.default.getData(store, type);
          inits[type] = true;
          shows[type] = true;
          _this.setState({
            isShow: true, currentDialog: type,
            shows: shows, data: data, dialogs: dialogs
          });
        } else {
          shows[type] = true;
          _this.setState({
            isShow: true, currentDialog: type,
            shows: shows, data: data
          });
        }
      }
    }, _this._handleClose = function (type) {
      var data = _this.state.data[type] || {},
          onBeforeClose = data.onBeforeClose;

      if (typeof onBeforeClose === 'function') {
        onBeforeClose();
      }
      _this.setState(function (prevState) {
        prevState.shows[type] = false;
        return {
          isShow: false,
          currentDialog: null,
          shows: prevState.shows
        };
      });
    }, _this._renderDialogs = function () {
      var store = _this.props.store,
          _this$state2 = _this.state,
          shows = _this$state2.shows,
          data = _this$state2.data,
          dialogs = _this$state2.dialogs;


      return dialogs.map(function (dialog) {
        var type = dialog.type,
            comp = dialog.comp;

        return _react2.default.createElement(comp, {
          key: type,
          isShow: shows[type],
          data: data[type],
          store: store,
          onClose: _this._handleClose.bind(null, type) });
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /*
  static propTypes = {
    store: PropTypes.shape({
      subscribe: PropTypes.func
    })
  }
  */

  _createClass(ModalDialogContainer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.unsubscribe = this.props.store.subscribe(this._onStore);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unsubscribe();
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          isShow = _state.isShow,
          currentDialog = _state.currentDialog;

      return _react2.default.createElement(
        _WrapperModalDialog2.default,
        {
          isShow: isShow,
          onClose: this._handleClose.bind(null, currentDialog)
        },
        this._renderDialogs()
      );
    }
  }]);

  return ModalDialogContainer;
}(Component);

exports.default = ModalDialogContainer;
//# sourceMappingURL=ModalDialogContainer.js.map