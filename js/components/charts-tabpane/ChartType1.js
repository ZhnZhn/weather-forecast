"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _Chart = require("../charts/Chart");
var _Chart2 = require("./Chart.Style");
var _jsxRuntime = require("react/jsx-runtime");
const S_POINTER_EVENTS_UNSET = {
    pointerEvents: 'unset'
  },
  _crWrapperStyle = tooltipTrigger => tooltipTrigger === "click" ? S_POINTER_EVENTS_UNSET : void 0;
const ChartType1 = _ref => {
  let {
    chartStyle = _Chart2.S_HOURLY_CHART,
    data,
    type,
    TooltipComp,
    tooltipTrigger,
    children
  } = _ref;
  const tooltipContent = (0, _uiApi.useMemo)(() => /*#__PURE__*/(0, _jsxRuntime.jsx)(TooltipComp, {
      data: data
    }), [data]),
    ChartComp = type === 'line' ? _Chart.LineChart : _Chart.ComposedChart;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Chart.ResponsiveContainer, {
    width: "100%",
    height: 300,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(ChartComp, Object.assign({}, chartStyle, {
      data: data,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Chart.XAxis, Object.assign({}, _Chart2.S_XAXIS, {
        dataKey: "day"
      })), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Chart.CartesianGrid, Object.assign({}, _Chart2.S_CARTESIAN_GRID)), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Chart.Tooltip, {
        offset: 24,
        trigger: tooltipTrigger,
        wrapperStyle: _crWrapperStyle(tooltipTrigger),
        content: tooltipContent
      }), children]
    }))
  });
};
var _default = exports.default = ChartType1;
//# sourceMappingURL=ChartType1.js.map