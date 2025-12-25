"use strict";

exports.__esModule = true;
exports.isNeedClip = exports.isHideOrNoData = exports.dataPointFormatter = exports.crClipPath = exports.DF_AXIS_PROPS = void 0;
var _isTypeFn = require("../../../utils/isTypeFn");
var _ChartUtils = require("../util/ChartUtils");
const DF_AXIS_PROPS = exports.DF_AXIS_PROPS = {
  allowDataOverflow: false,
  allowDecimals: true,
  hide: false,
  mirror: false,
  tickCount: 5,
  scale: 'auto',
  reversed: false
};
const isHideOrNoData = (_ref, data) => {
  let {
    hide
  } = _ref;
  return hide || !data || !data.length;
};
exports.isHideOrNoData = isHideOrNoData;
const _isAllowDataOverflow = axis => axis && axis.allowDataOverflow;
const isNeedClip = _ref2 => {
  let {
    xAxis,
    yAxis
  } = _ref2;
  return _isAllowDataOverflow(xAxis) || _isAllowDataOverflow(yAxis);
};
exports.isNeedClip = isNeedClip;
const dataPointFormatter = (dataPoint, dataKey) => ({
  x: dataPoint.x,
  y: dataPoint.y,
  value: (0, _isTypeFn.isArr)(dataPoint.value) ? dataPoint.value[1] : dataPoint.value,
  errorVal: (0, _ChartUtils.getValueByDataKey)(dataPoint, dataKey)
});
exports.dataPointFormatter = dataPointFormatter;
const crClipPath = (needClip, clipPathId) => needClip ? `url(#clipPath-${clipPathId})` : null;
exports.crClipPath = crClipPath;
//# sourceMappingURL=cartesianFn.js.map