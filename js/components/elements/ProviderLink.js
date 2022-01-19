"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime");

var CL = "data-provider-link",
    S_LINK = {
  color: '#ff9800'
};

var ProviderLink = function ProviderLink(_ref) {
  var className = _ref.className,
      style = _ref.style,
      prefixCL = _ref.prefixCL,
      _ref$prefix = _ref.prefix,
      prefix = _ref$prefix === void 0 ? 'Powered By ' : _ref$prefix;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    style: style,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: prefixCL,
      children: prefix
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
      className: CL,
      style: S_LINK,
      href: "https://openweathermap.org/",
      children: "OpenWeatherMap"
    })]
  });
};

var _default = ProviderLink;
exports["default"] = _default;
//# sourceMappingURL=ProviderLink.js.map