"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var _uiApi = require("../uiApi");
var _ThemeContext = _interopRequireDefault(require("./ThemeContext"));
var _jsxRuntime = require("react/jsx-runtime");
var withTheme = function withTheme(Wrapper) {
  return /*#__PURE__*/function (_Component) {
    (0, _inheritsLoose2["default"])(_class, _Component);
    function _class() {
      return _Component.apply(this, arguments) || this;
    }
    var _proto = _class.prototype;
    _proto.render = function render() {
      var _this = this;
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ThemeContext["default"].Consumer, {
        children: function children(theme) {
          return /*#__PURE__*/(0, _jsxRuntime.jsx)(Wrapper, (0, _extends2["default"])({}, _this.props, {
            theme: theme
          }));
        }
      });
    };
    return _class;
  }(_uiApi.Component);
};
var _default = withTheme;
exports["default"] = _default;
//# sourceMappingURL=withTheme.js.map