"use strict";

exports.__esModule = true;
exports.isNeedClip = exports.fCreateElement = exports.dataPointFormatter = exports.crClipPathProps = exports.crClipPathIdIf = exports.DF_AXIS_PROPS = void 0;
var _uiApi = require("../../uiApi");
var _ChartUtils = require("../util/ChartUtils");
var _IfOverflowMatches = require("../util/IfOverflowMatches");
var _FnUtils = require("../util/FnUtils");
var DF_AXIS_PROPS = {
  allowDataOverflow: false,
  allowDecimals: true,
  allowDuplicatedCategory: true,
  hide: false,
  mirror: false,
  tickCount: 5,
  scale: 'auto',
  reversed: false
};
exports.DF_AXIS_PROPS = DF_AXIS_PROPS;
var isNeedClip = function isNeedClip(_ref) {
  var xAxis = _ref.xAxis,
    yAxis = _ref.yAxis;
  return xAxis && xAxis.allowDataOverflow || yAxis && yAxis.allowDataOverflow;
};
exports.isNeedClip = isNeedClip;
var crClipPathIdIf = function crClipPathIdIf(props) {
  return (0, _IfOverflowMatches.ifOverflowMatches)(props, 'hidden') ? "url(#" + props.clipPathId + ")" : void 0;
};
exports.crClipPathIdIf = crClipPathIdIf;
var fCreateElement = function fCreateElement(crElement) {
  return function (option, props) {
    return (0, _uiApi.isValidElement)(option) ? (0, _uiApi.cloneElement)(option, props) : (0, _FnUtils._isFn)(option) ? option(props) : crElement(props, option);
  };
};
exports.fCreateElement = fCreateElement;
var dataPointFormatter = function dataPointFormatter(dataPoint, dataKey) {
  return {
    x: dataPoint.x,
    y: dataPoint.y,
    value: dataPoint.value,
    errorVal: (0, _ChartUtils.getValueByDataKey)(dataPoint, dataKey)
  };
};
exports.dataPointFormatter = dataPointFormatter;
var crClipPathProps = function crClipPathProps(needClip, clipPathId) {
  return {
    clipPath: needClip ? "url(#clipPath-" + clipPathId + ")" : null
  };
};
exports.crClipPathProps = crClipPathProps;
//# sourceMappingURL=cartesianFn.js.map