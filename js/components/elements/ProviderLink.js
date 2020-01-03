"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("../_react"));

var CL = "data-provider-link";
var S = {
  LINK: {
    color: '#ff9800'
  }
};

var ProviderLink = function ProviderLink(_ref) {
  var className = _ref.className,
      style = _ref.style,
      prefixCL = _ref.prefixCL,
      _ref$prefix = _ref.prefix,
      prefix = _ref$prefix === void 0 ? 'Powered By ' : _ref$prefix;
  return _react["default"].createElement("div", {
    className: className,
    style: style
  }, _react["default"].createElement("span", {
    className: prefixCL
  }, prefix), _react["default"].createElement("a", {
    className: CL,
    style: S.LINK,
    href: "https://openweathermap.org/"
  }, "OpenWeatherMap"));
};

var _default = ProviderLink;
exports["default"] = _default;
//# sourceMappingURL=ProviderLink.js.map