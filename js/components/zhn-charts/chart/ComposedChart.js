"use strict";

exports.__esModule = true;
exports.ComposedChart = void 0;
var _generateCategoricalChart = require("./generateCategoricalChart");
var _Bar = require("../cartesian/Bar");
var _Line = require("../cartesian/Line");
var _XAxis = require("../cartesian/XAxis");
var _YAxis = require("../cartesian/YAxis");
var _CartesianUtils = require("../util/CartesianUtils");
var _chartFn = require("./chartFn");
var _fUpdateStateOfAxisOffsetAndStackGroups = require("./fUpdateStateOfAxisOffsetAndStackGroups");
const chartName = 'ComposedChart';
const ComposedChart = exports.ComposedChart = (0, _generateCategoricalChart.generateCategoricalChart)(chartName, (0, _fUpdateStateOfAxisOffsetAndStackGroups.fUpdateStateOfAxisMapsOffsetAndStackGroups)(chartName, [_Line.Line, _Bar.Bar], [(0, _chartFn.crAxisComponent)('xAxis', _XAxis.XAxis), (0, _chartFn.crAxisComponent)('yAxis', _YAxis.YAxis)], _CartesianUtils.formatAxisMap));
//# sourceMappingURL=ComposedChart.js.map