"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("../_react"));

var Component = _react["default"].Component;

var ModalPane =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(ModalPane, _Component);

  function ModalPane() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this._handleClickOutside = function (event) {
      var onClose = _this.props.onClose;

      if (!_this.rootNode.contains(event.target)) {
        onClose(event);
      }
    };

    return _this;
  }

  var _proto = ModalPane.prototype;

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      if (nextProps.isShow) {
        document.addEventListener('click', this._handleClickOutside, true);
      } else {
        document.removeEventListener('click', this._handleClickOutside, true);
      }
    }
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        style = _this$props.style,
        children = _this$props.children;
    return _react["default"].createElement("div", {
      style: style,
      ref: function ref(n) {
        return _this2.rootNode = n;
      }
    }, children);
  };

  return ModalPane;
}(Component);

ModalPane.defaultProps = {
  onClose: function onClose() {}
};
var _default = ModalPane;
exports["default"] = _default;
//# sourceMappingURL=ModalPane.js.map