"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _Chart = _interopRequireDefault(require("../charts/Chart"));

var _Chart2 = _interopRequireDefault(require("./Chart.Style"));

var _jsxRuntime = require("react/jsx-runtime");

var ResponsiveContainer = _Chart["default"].ResponsiveContainer,
    ComposedChart = _Chart["default"].ComposedChart,
    LineChart = _Chart["default"].LineChart,
    XAxis = _Chart["default"].XAxis,
    CartesianGrid = _Chart["default"].CartesianGrid,
    Tooltip = _Chart["default"].Tooltip;

var ChartType1 = function ChartType1(_ref) {
  var _ref$chartStyle = _ref.chartStyle,
      chartStyle = _ref$chartStyle === void 0 ? _Chart2["default"].HourlyChart : _ref$chartStyle,
      data = _ref.data,
      type = _ref.type,
      TooltipComp = _ref.TooltipComp,
      children = _ref.children;
  var ChartComp = type === 'line' ? LineChart : ComposedChart;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(ResponsiveContainer, {
    width: "100%",
    height: 300,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(ChartComp, (0, _extends2["default"])({}, chartStyle, {
      data: data,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(XAxis, (0, _extends2["default"])({}, _Chart2["default"].XAxis, {
        dataKey: "day"
      })), /*#__PURE__*/(0, _jsxRuntime.jsx)(CartesianGrid, (0, _extends2["default"])({}, _Chart2["default"].CartesianGrid)), /*#__PURE__*/(0, _jsxRuntime.jsx)(Tooltip, {
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