"use strict";

exports.__esModule = true;
exports.ComposedChart = void 0;
var _generateCategoricalChart = require("./generateCategoricalChart");
var _Bar = require("../cartesian/Bar");
var _Line = require("../cartesian/Line");
var _fUpdateStateOfAxisOffsetAndStackGroups = require("./fUpdateStateOfAxisOffsetAndStackGroups");
const chartName = 'ComposedChart';
const ComposedChart = exports.ComposedChart = (0, _generateCategoricalChart.generateCategoricalChart)(chartName, (0, _fUpdateStateOfAxisOffsetAndStackGroups.fUpdateStateOfAxisMapsOffsetAndStackGroups)(chartName, [_Line.Line, _Bar.Bar]));
//# sourceMappingURL=ComposedChart.js.map