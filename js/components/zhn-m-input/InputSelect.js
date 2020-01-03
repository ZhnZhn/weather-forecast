"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("../_react"));

var _ArrowCell = _interopRequireDefault(require("./ArrowCell"));

var _OptionsPane = _interopRequireDefault(require("./OptionsPane"));

var Component = _react["default"].Component;
var CL = {
  SELECT: 'm-select',
  LABEL: 'm-select__label',
  DIV: 'm-select__div',
  DIV_VALUE: 'm-select__div__value',
  DIV_BT: 'm-select__div__bt',
  INPUT_LINE: 'm-select__line',
  ITEM: 'm-select__item'
};

var InputSelect =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(InputSelect, _Component);

  function InputSelect(props) {
    var _this;

    _this = _Component.call(this) || this;

    _this._handleOpen = function () {
      _this.setState({
        isShow: true
      });
    };

    _this._handleClose = function () {
      _this.setState({
        isShow: false
      });
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

  var _proto = InputSelect.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        caption = _this$props.caption,
        options = _this$props.options,
        _this$props$styleConf = _this$props.styleConfig,
        TS = _this$props$styleConf === void 0 ? {} : _this$props$styleConf,
        selectedItem = _this$props.selectedItem,
        _this$state = this.state,
        isShow = _this$state.isShow,
        item = _this$state.item,
        _item = selectedItem || item;

    return _react["default"].createElement("div", {
      className: CL.SELECT,
      style: TS.ROOT,
      onClick: this._handleOpen
    }, _react["default"].createElement(_OptionsPane["default"], {
      rootStyle: TS.MODAL_PANE,
      isShow: isShow,
      item: _item,
      options: options,
      clItem: TS.CL_ITEM || CL.ITEM,
      onSelect: this._handleSelect,
      onClose: this._handleClose
    }), _react["default"].createElement("label", {
      className: CL.LABEL
    }, caption), _react["default"].createElement("div", {
      className: CL.DIV
    }, _react["default"].createElement("div", {
      className: CL.DIV_VALUE
    }, _item.caption), _react["default"].createElement("button", {
      className: CL.DIV_BT,
      tabIndex: "0"
    }, _react["default"].createElement("div", null, _react["default"].createElement(_ArrowCell["default"], null))), _react["default"].createElement("div", {
      className: CL.INPUT_LINE
    })));
  };

  return InputSelect;
}(Component);

InputSelect.defaultProps = {
  initItem: {
    caption: '',
    value: ''
  }
};
var _default = InputSelect;
exports["default"] = _default;
//# sourceMappingURL=InputSelect.js.map