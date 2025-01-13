"use strict";

exports.__esModule = true;
exports.isNeedClip = exports.isHideOrNoData = exports.fCreateElement = exports.dataPointFormatter = exports.crClipPathProps = exports.crClipPathIdIf = exports.DF_AXIS_PROPS = void 0;
var _uiApi = require("../../uiApi");
var _ChartUtils = require("../util/ChartUtils");
var _IfOverflowMatches = require("../util/IfOverflowMatches");
var _FnUtils = require("../util/FnUtils");
const DF_AXIS_PROPS = exports.DF_AXIS_PROPS = {
  allowDataOverflow: false,
  allowDecimals: true,
  allowDuplicatedCategory: true,
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
const isNeedClip = _ref2 => {
  let {
    xAxis,
    yAxis
  } = _ref2;
  return xAxis && xAxis.allowDataOverflow || yAxis && yAxis.allowDataOverflow;
};
exports.isNeedClip = isNeedClip;
const crClipPathIdIf = props => (0, _IfOverflowMatches.ifOverflowMatches)(props, 'hidden') ? `url(#${props.clipPathId})` : void 0;
exports.crClipPathIdIf = crClipPathIdIf;
const fCreateElement = crElement => (option, props, value) => (0, _uiApi.isValidElement)(option) ? (0, _uiApi.cloneUiElement)(option, props) : (0, _FnUtils._isFn)(option) ? option(props) : crElement(props, option, value);
exports.fCreateElement = fCreateElement;
const dataPointFormatter = (dataPoint, dataKey) => ({
  x: dataPoint.x,
  y: dataPoint.y,
  value: (0, _FnUtils._isArr)(dataPoint.value) ? dataPoint.value[1] : dataPoint.value,
  errorVal: (0, _ChartUtils.getValueByDataKey)(dataPoint, dataKey)
});
exports.dataPointFormatter = dataPointFormatter;
const crClipPathProps = (needClip, clipPathId) => ({
  clipPath: needClip ? `url(#clipPath-${clipPathId})` : null
});
exports.crClipPathProps = crClipPathProps;
//# sourceMappingURL=cartesianFn.js.map