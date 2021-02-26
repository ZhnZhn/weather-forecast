"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("../_react"));

var _reactRedux = require("react-redux");

var _dt = _interopRequireDefault(require("../../utils/dt"));

var _Chart = _interopRequireDefault(require("../charts/Chart"));

var _selectors = require("../../flux/selectors");

var _TooltipUvi = _interopRequireDefault(require("./TooltipUvi"));

var _Chart2 = _interopRequireDefault(require("./Chart.Style"));

var useMemo = _react["default"].useMemo;
var CartesianGrid = _Chart["default"].CartesianGrid,
    Line = _Chart["default"].Line,
    YAxis = _Chart["default"].YAxis,
    XAxis = _Chart["default"].XAxis,
    ResponsiveContainer = _Chart["default"].ResponsiveContainer,
    LineChart = _Chart["default"].LineChart,
    Tooltip = _Chart["default"].Tooltip;

var _transformUvi = function _transformUvi(hourlyArr) {
  return (hourlyArr || []).map(function (_ref) {
    var timestamp = _ref.dt,
        uvi = _ref.uvi;
    return {
      day: _dt["default"].toDayHour(timestamp),
      uvi: uvi
    };
  });
};

var UviChart = function UviChart() {
  var uviArr = (0, _reactRedux.useSelector)(_selectors.sUV.forecast),
      data = useMemo(function () {
    return _transformUvi(uviArr);
  }, [uviArr]);
  return /*#__PURE__*/_react["default"].createElement(ResponsiveContainer, {
    width: "100%",
    height: 300
  }, /*#__PURE__*/_react["default"].createElement(LineChart, (0, _extends2["default"])({
    data: data
  }, _Chart2["default"].HourlyChart), /*#__PURE__*/_react["default"].createElement(XAxis, (0, _extends2["default"])({
    dataKey: "day"
  }, _Chart2["default"].XAxis)), /*#__PURE__*/_react["default"].createElement(YAxis, {
    yAxisId: 1,
    orientation: "right",
    width: 45 //label="UV"
    ,
    dataKey: "uvi"
  }), /*#__PURE__*/_react["default"].createElement(CartesianGrid, _Chart2["default"].CartesianGrid), /*#__PURE__*/_react["default"].createElement(Tooltip, {
    offset: 24,
    content: /*#__PURE__*/_react["default"].createElement(_TooltipUvi["default"], {
      data: data
    })
  }), /*#__PURE__*/_react["default"].createElement(Line, (0, _extends2["default"])({}, _Chart2["default"].LineTempNight, {
    connectNulls: true,
    yAxisId: 1,
    dataKey: "uvi"
  }))));
};

var _default = UviChart;
exports["default"] = _default;
//# sourceMappingURL=UviChart.js.map