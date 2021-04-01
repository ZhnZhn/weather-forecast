"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("../_react"));

var _getPayload = _interopRequireDefault(require("./getPayload"));

var _TooltipContent = _interopRequireDefault(require("./TooltipContent"));

var _TooltipRow = _interopRequireDefault(require("./TooltipRow1"));

var TooltipUvi = function TooltipUvi(props) {
  var payload = (0, _getPayload["default"])(props);

  if (!payload) {
    return null;
  }

  var day = payload.day,
      uvi = payload.uvi;
  return /*#__PURE__*/_react["default"].createElement(_TooltipContent["default"], {
    caption: day + ":00"
  }, /*#__PURE__*/_react["default"].createElement(_TooltipRow["default"], {
    t: "UV index",
    v: uvi
  }));
};

var _default = TooltipUvi;
exports["default"] = _default;
//# sourceMappingURL=TooltipUvi.js.map