"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("../_react"));

var _handlers = _interopRequireDefault(require("../../flux/handlers"));

var _TabPane = _interopRequireDefault(require("../zhn-atoms/TabPane"));

var _Tab = _interopRequireDefault(require("../zhn-atoms/Tab"));

var _ForecastChart = _interopRequireDefault(require("./ForecastChart"));

var _HourlyChart = _interopRequireDefault(require("./HourlyChart"));

var _UviChart = _interopRequireDefault(require("./UviChart"));

var requestHourly = _handlers["default"].requestHourly,
    requestUvi = _handlers["default"].requestUvi;
var S = {
  TABS: {
    textAlign: 'left'
  }
};

var ChartTabPane = function ChartTabPane() {
  return /*#__PURE__*/_react["default"].createElement(_TabPane["default"], {
    key: "1",
    width: "100%",
    tabsStyle: S.TABS
  }, /*#__PURE__*/_react["default"].createElement(_Tab["default"], {
    title: "7 Days"
  }, /*#__PURE__*/_react["default"].createElement(_ForecastChart["default"], null)), /*#__PURE__*/_react["default"].createElement(_Tab["default"], {
    title: "5 Days/3 Hours",
    onClick: requestHourly
  }, /*#__PURE__*/_react["default"].createElement(_HourlyChart["default"], null)), /*#__PURE__*/_react["default"].createElement(_Tab["default"], {
    title: "UV index",
    onClick: requestUvi
  }, /*#__PURE__*/_react["default"].createElement(_UviChart["default"], null)));
};

var _default = ChartTabPane;
exports["default"] = _default;
//# sourceMappingURL=ChartTabPane.js.map