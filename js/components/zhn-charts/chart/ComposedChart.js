"use strict";

exports.__esModule = true;
exports.ComposedChart = void 0;
var _generateCategoricalChart = require("./generateCategoricalChart");
var _Area = require("../cartesian/Area");
var _Bar = require("../cartesian/Bar");
var _Line = require("../cartesian/Line");
var _Scatter = require("../cartesian/Scatter");
var _XAxis = require("../cartesian/XAxis");
var _YAxis = require("../cartesian/YAxis");
var _ZAxis = require("../cartesian/ZAxis");
var _CartesianUtils = require("../util/CartesianUtils");
var _chartFn = require("./chartFn");
var ComposedChart = (0, _generateCategoricalChart.generateCategoricalChart)({
  chartName: 'ComposedChart',
  GraphicalChild: [_Line.Line, _Area.Area, _Bar.Bar, _Scatter.Scatter],
  axisComponents: [(0, _chartFn.crAxisComponent)('xAxis', _XAxis.XAxis), (0, _chartFn.crAxisComponent)('yAxis', _YAxis.YAxis), (0, _chartFn.crAxisComponent)('zAxis', _ZAxis.ZAxis)],
  formatAxisMap: _CartesianUtils.formatAxisMap
});
exports.ComposedChart = ComposedChart;
//# sourceMappingURL=ComposedChart.js.map