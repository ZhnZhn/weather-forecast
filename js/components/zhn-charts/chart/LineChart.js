"use strict";

exports.__esModule = true;
exports.LineChart = void 0;
var _generateCategoricalChart = require("./generateCategoricalChart");
var _Line = require("../cartesian/Line");
var _fUpdateStateOfAxisOffsetAndStackGroups = require("./fUpdateStateOfAxisOffsetAndStackGroups");
const chartName = 'LineChart';
const LineChart = exports.LineChart = (0, _generateCategoricalChart.generateCategoricalChart)(chartName, (0, _fUpdateStateOfAxisOffsetAndStackGroups.fUpdateStateOfAxisMapsOffsetAndStackGroups)(chartName, _Line.Line));
//# sourceMappingURL=LineChart.js.map