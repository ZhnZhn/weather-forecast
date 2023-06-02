"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.Line = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _uiApi = require("../../uiApi");
var _crCn = _interopRequireDefault(require("../../zhn-utils/crCn"));
var _FnUtils = require("../util/FnUtils");
var _Layer = require("../container/Layer");
var _LabelList = require("../component/LabelList");
var _Global = require("../util/Global");
var _ChartUtils = require("../util/ChartUtils");
var _LineRenderFn = require("./LineRenderFn");
var _cartesianFn = require("./cartesianFn");
var _useAnimationHandle2 = _interopRequireDefault(require("./useAnimationHandle"));
var _usePrevCurData2 = _interopRequireDefault(require("./usePrevCurData"));
var _useClipPathId = _interopRequireDefault(require("./useClipPathId"));
var _ClipPathRect = _interopRequireDefault(require("./ClipPathRect"));
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
var DF_TOTAL_LENGTH = 0;
var _getTotalLength = function _getTotalLength(curveDom) {
  try {
    return curveDom && curveDom.getTotalLength && curveDom.getTotalLength() || DF_TOTAL_LENGTH;
  } catch (err) {
    return DF_TOTAL_LENGTH;
  }
};
var Line = (0, _uiApi.memo)(function (props) {
  var hide = props.hide,
    dot = props.dot,
    points = props.points,
    className = props.className,
    isAnimationActive = props.isAnimationActive,
    id = props.id,
    animationId = props.animationId,
    _refPath = (0, _uiApi.useRef)(),
    _useAnimationHandle = (0, _useAnimationHandle2["default"])(props),
    isAnimationFinished = _useAnimationHandle[0],
    handleAnimationStart = _useAnimationHandle[1],
    handleAnimationEnd = _useAnimationHandle[2],
    _usePrevCurData = (0, _usePrevCurData2["default"])(points, animationId),
    prevPoints = _usePrevCurData[0],
    clipPathId = (0, _useClipPathId["default"])(_CL.CL_LINE, id),
    _useState = (0, _uiApi.useState)(0),
    totalLength = _useState[0],
    setTotalLength = _useState[1];

  /*eslint-disable react-hooks/exhaustive-deps */
  (0, _uiApi.useEffect)(function () {
    if (!isAnimationActive) {
      return;
    }
    setTotalLength(_getTotalLength(_refPath.current));
  }, []);
  //isAnimationActive
  /*eslint-enable react-hooks/exhaustive-deps */

  if (hide || !points || !points.length) {
    return null;
  }
  var hasSinglePoint = points.length === 1,
    layerClass = (0, _crCn["default"])(_CL.CL_LINE, className),
    needClip = (0, _cartesianFn.isNeedClip)(props);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Layer.Layer, {
    className: layerClass,
    children: [needClip ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_ClipPathRect["default"], {
      id: clipPathId,
      props: props
    }) : null, !hasSinglePoint && (0, _LineRenderFn.renderCurve)(needClip, clipPathId, prevPoints, totalLength, props, _refPath, handleAnimationStart, handleAnimationEnd), (0, _LineRenderFn.renderErrorBar)(needClip, clipPathId, isAnimationFinished, props), (hasSinglePoint || dot) && (0, _LineRenderFn.renderDots)(needClip, clipPathId, isAnimationFinished, props), (!isAnimationActive || isAnimationFinished) && _LabelList.LabelList.renderCallByParent(props, points)]
  });
});
exports.Line = Line;
Line.displayName = 'Line';
Line.defaultProps = {
  xAxisId: 0,
  yAxisId: 0,
  connectNulls: false,
  activeDot: true,
  dot: true,
  legendType: 'line',
  stroke: '#3182bd',
  strokeWidth: 1,
  fill: '#fff',
  points: [],
  isAnimationActive: !_Global.Global.isSsr,
  animateNewValues: true,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: 'ease',
  hide: false,
  label: false
};

/**
 * Compose the data of each group
 * @param {Object} props The props from the component
 * @param  {Object} xAxis   The configuration of x-axis
 * @param  {Object} yAxis   The configuration of y-axis
 * @param  {String} dataKey The unique key of a group
 * @return {Array}  Composed data
 */
Line.getComposedData = function (_ref) {
  var props = _ref.props,
    xAxis = _ref.xAxis,
    yAxis = _ref.yAxis,
    xAxisTicks = _ref.xAxisTicks,
    yAxisTicks = _ref.yAxisTicks,
    dataKey = _ref.dataKey,
    bandSize = _ref.bandSize,
    displayedData = _ref.displayedData,
    offset = _ref.offset;
  var layout = props.layout,
    points = displayedData.map(function (entry, index) {
      var value = (0, _ChartUtils.getValueByDataKey)(entry, dataKey);
      return layout === 'horizontal' ? {
        x: (0, _ChartUtils.getCateCoordinateOfLine)({
          axis: xAxis,
          ticks: xAxisTicks,
          bandSize: bandSize,
          entry: entry,
          index: index
        }),
        y: (0, _FnUtils._isNil)(value) ? null : yAxis.scale(value),
        value: value,
        payload: entry
      } : {
        x: (0, _FnUtils._isNil)(value) ? null : xAxis.scale(value),
        y: (0, _ChartUtils.getCateCoordinateOfLine)({
          axis: yAxis,
          ticks: yAxisTicks,
          bandSize: bandSize,
          entry: entry,
          index: index
        }),
        value: value,
        payload: entry
      };
    });
  return (0, _extends2["default"])({
    points: points,
    layout: layout
  }, offset);
};
//# sourceMappingURL=Line.js.map