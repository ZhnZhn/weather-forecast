"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("../_react"));

var CL_SELECT_NONE = 'select-none',
    ROOT_DIV = {
  display: 'inline',
  color: '#795548',
  width: '100%',
  paddingLeft: 8,
  marginBottom: 8,
  borderBottom: '3px solid #795548',
  fontSize: '24px',
  fontWeight: 'bold'
};

var Caption = function Caption(_ref) {
  var style = _ref.style,
      forecast = _ref.forecast;

  var _ref2 = forecast || {},
      city = _ref2.city,
      _ref3 = city || {},
      _ref3$name = _ref3.name,
      name = _ref3$name === void 0 ? 'Forecast' : _ref3$name,
      country = _ref3.country,
      _caption = [name, country].filter(Boolean).join(':');

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: CL_SELECT_NONE,
    style: (0, _extends2["default"])({}, ROOT_DIV, style)
  }, _caption);
};

var _default = Caption;
exports["default"] = _default;
//# sourceMappingURL=Caption.js.map