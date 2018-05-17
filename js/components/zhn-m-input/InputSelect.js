'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('../_react');

var _react2 = _interopRequireDefault(_react);

var _ArrowCell = require('./ArrowCell');

var _ArrowCell2 = _interopRequireDefault(_ArrowCell);

var _OptionsPane = require('./OptionsPane');

var _OptionsPane2 = _interopRequireDefault(_OptionsPane);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = _react2.default.Component;

var CL = {
  SELECT: 'm-select',
  LABEL: 'm-select__label',
  DIV: 'm-select__div',
  DIV_VALUE: 'm-select__div__value',
  DIV_BT: 'm-select__div__bt',
  INPUT_LINE: 'm-select__line',
  ITEM: 'm-select__item'
};

var InputSelect = (_temp = _class = function (_Component) {
  _inherits(InputSelect, _Component);

  function InputSelect(props) {
    _classCallCheck(this, InputSelect);

    var _this = _possibleConstructorReturn(this, (InputSelect.__proto__ || Object.getPrototypeOf(InputSelect)).call(this));

    _this._handleOpen = function () {
      _this.setState({ isShow: true });
    };

    _this._handleClose = function () {
      _this.setState({ isShow: false });
    };

    _this._handleSelect = function (item, event) {
      event.stopPropagation();
      _this.props.onSelect(item);
      _this.setState({
        isShow: false,
        item: item
      });
    };

    _this.state = {
      isShow: false,
      item: props.initItem
    };
    return _this;
  }

  _createClass(InputSelect, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          caption = _props.caption,
          options = _props.options,
          _props$styleConfig = _props.styleConfig,
          TS = _props$styleConfig === undefined ? {} : _props$styleConfig,
          selectedItem = _props.selectedItem,
          _state = this.state,
          isShow = _state.isShow,
          item = _state.item,
          _item = selectedItem || item;

      return _react2.default.createElement(
        'div',
        {
          className: CL.SELECT,
          style: TS.ROOT,
          onClick: this._handleOpen
        },
        _react2.default.createElement(_OptionsPane2.default, {
          rootStyle: TS.MODAL_PANE,
          isShow: isShow,
          item: _item,
          options: options,
          clItem: TS.CL_ITEM || CL.ITEM,
          onSelect: this._handleSelect,
          onClose: this._handleClose
        }),
        _react2.default.createElement(
          'label',
          { className: CL.LABEL },
          caption
        ),
        _react2.default.createElement(
          'div',
          { className: CL.DIV },
          _react2.default.createElement(
            'div',
            { className: CL.DIV_VALUE },
            _item.caption
          ),
          _react2.default.createElement(
            'button',
            { className: CL.DIV_BT, tabIndex: '0' },
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(_ArrowCell2.default, null)
            )
          ),
          _react2.default.createElement('div', { className: CL.INPUT_LINE })
        )
      );
    }
  }]);

  return InputSelect;
}(Component), _class.defaultProps = {
  initItem: {
    caption: '',
    value: ''
  }
}, _temp);
exports.default = InputSelect;
//# sourceMappingURL=InputSelect.js.map