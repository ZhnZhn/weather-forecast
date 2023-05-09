"use strict";

exports.__esModule = true;
exports.LineChart = void 0;
var _generateCategoricalChart = require("./generateCategoricalChart");
var _Line = require("../cartesian/Line");
var _XAxis = require("../cartesian/XAxis");
var _YAxis = require("../cartesian/YAxis");
var _CartesianUtils = require("../util/CartesianUtils");
var _chartFn = require("./chartFn");
var LineChart = (0, _generateCategoricalChart.generateCategoricalChart)({
  chartName: 'LineChart',
  GraphicalChild: _Line.Line,
  axisComponents: [(0, _chartFn.crAxisComponent)('xAxis', _XAxis.XAxis), (0, _chartFn.crAxisComponent)('yAxis', _YAxis.YAxis)],
  formatAxisMap: _CartesianUtils.formatAxisMap
});
exports.LineChart = LineChart;
//# sourceMappingURL=LineChart.js.map