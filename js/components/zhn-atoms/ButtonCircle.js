"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("../_react"));

var CL_NOT_SELECTED = "not-selected";
var Component = _react["default"].Component;
var S = {
  ROOT: {
    display: 'inline-block',
    color: '#80c040',
    border: '2px solid #80c040',
    borderRadius: '50%',
    width: '22px',
    height: '22px',
    textAlign: 'center',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  NOT_ACTIVE: {
    //color : '#9e9e9e'
    color: '#5b5b5b'
  }
};

var _getIsActive = function _getIsActive(props) {
  var store = props.store,
      storeKey = props.storeKey;
  return store.getState().layout[storeKey];
};

var ButtonCircle =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(ButtonCircle, _Component);

  function ButtonCircle(props) {
    var _this;

    _this = _Component.call(this) || this;

    _this._onStore = function () {
      var isActive = _getIsActive(_this.props);

      if (isActive !== _this.state.isActive) {
        _this.setState({
          isActive: isActive
        });
      }
    };

    _this._hClick = function () {
      var _this$props = _this.props,
          storeKey = _this$props.storeKey,
          onClick = _this$props.onClick;
      onClick(storeKey);
    };

    _this.state = {
      isActive: _getIsActive(props)
    };
    return _this;
  }

  var _proto = ButtonCircle.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.unsubscribe = this.props.store.subscribe(this._onStore);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.unsubscribe();
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        caption = _this$props2.caption,
        title = _this$props2.title,
        style = _this$props2.style,
        isActive = this.state.isActive,
        _style = isActive ? (0, _extends2["default"])({}, S.ROOT, {}, style) : (0, _extends2["default"])({}, S.ROOT, {}, style, {}, S.NOT_ACTIVE);

    return _react["default"].createElement("span", {
      className: CL_NOT_SELECTED,
      style: _style,
      title: title,
      onClick: this._hClick
    }, caption);
  };

  return ButtonCircle;
}(Component);

var _default = ButtonCircle;
exports["default"] = _default;
//# sourceMappingURL=ButtonCircle.js.map