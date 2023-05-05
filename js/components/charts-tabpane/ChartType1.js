"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _Chart = require("../charts/Chart");
var _Chart2 = require("./Chart.Style");
var _jsxRuntime = require("react/jsx-runtime");
var ChartType1 = function ChartType1(_ref) {
  var _ref$chartStyle = _ref.chartStyle,
    chartStyle = _ref$chartStyle === void 0 ? _Chart2.S_HOURLY_CHART : _ref$chartStyle,
    data = _ref.data,
    type = _ref.type,
    TooltipComp = _ref.TooltipComp,
    children = _ref.children;
  var ChartComp = type === 'line' ? _Chart.LineChart : _Chart.ComposedChart;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Chart.ResponsiveContainer, {
    width: "100%",
    height: 300,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(ChartComp, (0, _extends2["default"])({}, chartStyle, {
      data: data,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Chart.XAxis, (0, _extends2["default"])({}, _Chart2.S_XAXIS, {
        dataKey: "day"
      })), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Chart.CartesianGrid, (0, _extends2["default"])({}, _Chart2.S_CARTESIAN_GRID)), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Chart.Tooltip, {
        offset: 24,
        content: /*#__PURE__*/(0, _jsxRuntime.jsx)(TooltipComp, {
          data: data
        })
      }), children]
    }))
  });
};
var _default = ChartType1;
exports["default"] = _default;
//# sourceMappingURL=ChartType1.js.map