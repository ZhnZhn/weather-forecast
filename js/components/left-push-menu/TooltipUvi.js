"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("../_react"));

var _TooltipContent = _interopRequireDefault(require("./TooltipContent"));

var _TooltipRow = _interopRequireDefault(require("./TooltipRow"));

var TooltipUvi = function TooltipUvi(_ref) {
  var active = _ref.active,
      payload = _ref.payload;

  if (!active) {
    return null;
  }

  var _ref2 = (payload[0] || {}).payload || {},
      day = _ref2.day,
      uvi = _ref2.uvi;

  return /*#__PURE__*/_react["default"].createElement(_TooltipContent["default"], {
    caption: day + ":00"
  }, /*#__PURE__*/_react["default"].createElement(_TooltipRow["default"], {
    caption: "UV index",
    value: uvi
  }));
};

var _default = TooltipUvi;
exports["default"] = _default;
//# sourceMappingURL=TooltipUvi.js.map