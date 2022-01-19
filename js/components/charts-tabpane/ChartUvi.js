"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _memoEqual = _interopRequireDefault(require("../hoc/memoEqual"));

var _dt = _interopRequireDefault(require("../../utils/dt"));

var _Chart = _interopRequireDefault(require("../charts/Chart"));

var _selectors = require("../../flux/selectors");

var _useSelectorData = _interopRequireDefault(require("./useSelectorData"));

var _ChartType = _interopRequireDefault(require("./ChartType1"));

var _TooltipUvi = _interopRequireDefault(require("./TooltipUvi"));

var _Chart2 = _interopRequireDefault(require("./Chart.Style"));

var _jsxRuntime = require("react/jsx-runtime");

var YAxis = _Chart["default"].YAxis,
    Line = _Chart["default"].Line,
    _transformUvi = function _transformUvi(hourlyArr) {
  return (hourlyArr || []).map(function (_ref) {
    var date = _ref.date,
        value = _ref.value;
    return {
      day: _dt["default"].toDayHour(date),
      uvi: value
    };
  });
};

var ChartUvi = function ChartUvi() {
  var data = (0, _useSelectorData["default"])(_selectors.sUV.forecast, _transformUvi);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ChartType["default"], {
    type: "line",
    data: data,
    TooltipComp: _TooltipUvi["default"],
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(YAxis, {
      yAxisId: 1,
      orientation: "right",
      width: 45,
      dataKey: "uvi"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Line, (0, _extends2["default"])({}, _Chart2["default"].LineTempNight, {
      connectNulls: true,
      yAxisId: 1,
      dataKey: "uvi"
    }))]
  });
};

var _default = (0, _memoEqual["default"])(ChartUvi);

exports["default"] = _default;
//# sourceMappingURL=ChartUvi.js.map