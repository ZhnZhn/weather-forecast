"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.Line = void 0;
var _uiApi = require("../../uiApi");
var _crCn = _interopRequireDefault(require("../../zhn-utils/crCn"));
var _FnUtils = require("../util/FnUtils");
var _ReactUtils = require("../util/ReactUtils");
var _Layer = require("../container/Layer");
var _LabelList = require("../component/LabelList");
var _Global = require("../util/Global");
var _ChartUtils = require("../util/ChartUtils");
var _cartesianFn = require("./cartesianFn");
var _useAnimationHandle = _interopRequireDefault(require("./useAnimationHandle"));
var _usePrevCurData = _interopRequireDefault(require("./usePrevCurData"));
var _useClipPathId = _interopRequireDefault(require("./useClipPathId"));
var _ClipPathRect = _interopRequireDefault(require("./ClipPathRect"));
var _LineDots = require("./LineDots");
var _LineCurveStatically = require("./LineCurveStatically");
var _LineCurveWithAnimation = require("./LineCurveWithAnimation");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
const DF_TOTAL_LENGTH = 0;
const _getTotalLength = curveDom => {
  try {
    return curveDom && curveDom.getTotalLength && curveDom.getTotalLength() || DF_TOTAL_LENGTH;
  } catch (err) {
    return DF_TOTAL_LENGTH;
  }
};
const DF_PROPS = {
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
  isAnimationActive: !_Global.IS_SSR,
  animateNewValues: true,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: 'ease',
  hide: false,
  label: false
};
const Line = exports.Line = (0, _uiApi.memo)(props => {
  const _props = (0, _ReactUtils.crProps)(DF_PROPS, props),
    {
      dot,
      points,
      className,
      isAnimationActive,
      id,
      animationId
    } = _props,
    _refPath = (0, _uiApi.useRef)(),
    [isAnimationFinished, handleAnimationStart, handleAnimationEnd] = (0, _useAnimationHandle.default)(_props),
    [prevPoints] = (0, _usePrevCurData.default)(points, animationId),
    clipPathId = (0, _useClipPathId.default)(_CL.CL_LINE, id),
    [totalLength, setTotalLength] = (0, _uiApi.useState)(0);

  /*eslint-disable react-hooks/exhaustive-deps */
  (0, _uiApi.useEffect)(() => {
    if (!isAnimationActive) {
      return;
    }
    setTotalLength(_getTotalLength(_refPath.current));
  }, []);
  //isAnimationActive
  /*eslint-enable react-hooks/exhaustive-deps */

  if ((0, _cartesianFn.isHideOrNoData)(_props, points)) {
    return null;
  }
  const hasSinglePoint = points.length === 1,
    layerClass = (0, _crCn.default)(_CL.CL_LINE, className),
    needClip = (0, _cartesianFn.isNeedClip)(_props),
    _clipPathProps = (0, _cartesianFn.crClipPathProps)(needClip, clipPathId),
    _isAnimationNotActiveOrFinished = !isAnimationActive || isAnimationFinished,
    _isLineDots = (hasSinglePoint || dot) && _isAnimationNotActiveOrFinished,
    _isLineCurveWithAnimaton = !hasSinglePoint && isAnimationActive
    //&& ((!prevPoints && totalLength > 0) || !_isEqual(prevPoints, points))
    && (!prevPoints && totalLength > 0 || prevPoints !== points);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Layer.Layer, {
    className: layerClass,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ClipPathRect.default, {
      is: needClip,
      id: clipPathId,
      props: _props
    }), _isLineCurveWithAnimaton ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_LineCurveWithAnimation.LineCurveWithAnimation, {
      clipPathProps: _clipPathProps,
      prevPoints: prevPoints,
      totalLength: totalLength,
      props: _props,
      refPath: _refPath,
      handleAnimationStart: handleAnimationStart,
      handleAnimationEnd: handleAnimationEnd
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_LineCurveStatically.LineCurveStatically, {
      clipPathProps: _clipPathProps,
      points: points,
      props: _props,
      refPath: _refPath
    }), _isLineDots && /*#__PURE__*/(0, _jsxRuntime.jsx)(_LineDots.LineDots, {
      clipPathProps: _clipPathProps,
      props: _props
    }), _isAnimationNotActiveOrFinished && _LabelList.LabelList.renderCallByParent(_props, points)]
  });
});
Line.displayName = 'Line';

/**
 * Compose the data of each group
 * @param {Object} props The props from the component
 * @param  {Object} xAxis   The configuration of x-axis
 * @param  {Object} yAxis   The configuration of y-axis
 * @param  {String} dataKey The unique key of a group
 * @return {Array}  Composed data
 */
Line.getComposedData = _ref => {
  let {
    props,
    xAxis,
    yAxis,
    xAxisTicks,
    yAxisTicks,
    dataKey,
    bandSize,
    displayedData,
    offset
  } = _ref;
  const {
      layout
    } = props,
    points = displayedData.map((entry, index) => {
      const value = (0, _ChartUtils.getValueByDataKey)(entry, dataKey);
      return layout === 'horizontal' ? {
        x: (0, _ChartUtils.getCateCoordinateOfLine)({
          axis: xAxis,
          ticks: xAxisTicks,
          bandSize,
          entry,
          index
        }),
        y: (0, _FnUtils._isNil)(value) ? null : yAxis.scale(value),
        value,
        payload: entry
      } : {
        x: (0, _FnUtils._isNil)(value) ? null : xAxis.scale(value),
        y: (0, _ChartUtils.getCateCoordinateOfLine)({
          axis: yAxis,
          ticks: yAxisTicks,
          bandSize,
          entry,
          index
        }),
        value,
        payload: entry
      };
    });
  return {
    points,
    layout,
    ...offset
  };
};
//# sourceMappingURL=Line.js.map