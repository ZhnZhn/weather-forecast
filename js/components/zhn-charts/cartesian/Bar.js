"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.Bar = void 0;
var _isTypeFn = require("../../../utils/isTypeFn");
var _uiApi = require("../../uiApi");
var _styleFn = require("../../styleFn");
var _Global = require("../util/Global");
var _DataUtils = require("../util/DataUtils");
var _ChartUtils = require("../util/ChartUtils");
var _Layer = require("../container/Layer");
var _BarRenderFn = require("./BarRenderFn");
var _cartesianFn = require("./cartesianFn");
var _useClipPathId = _interopRequireDefault(require("./useClipPathId"));
var _ClipPathRect = _interopRequireDefault(require("./ClipPathRect"));
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
//import useAnimationHandle from './useAnimationHandle';
//import usePrevCurData from './usePrevCurData';

const DF_PROPS = {
  xAxisId: 0,
  yAxisId: 0,
  legendType: 'rect',
  minPointSize: 0,
  hide: false,
  // data of bar
  data: [],
  layout: 'vertical',
  isAnimationActive: !_Global.IS_SSR,
  animationBegin: 0,
  animationDuration: 400,
  animationEasing: 'ease'
};
const Bar = exports.Bar = (0, _uiApi.memo)(props => {
  const _props = (0, _uiApi.crProps)(DF_PROPS, props),
    {
      data,
      className,
      id
    } = _props
    /*
    , [
      isAnimationFinished,
      handleAnimationStart,
      handleAnimationEnd
    ] = useAnimationHandle(_props)
    */
    /*eslint-disable no-unused-vars*/
    /*
    , [
      prevData,
      _,
      animationId
    ] = usePrevCurData(data)
    */
    // _
    /*eslint-enable no-unused-vars*/,
    clipPathId = (0, _useClipPathId.default)(_CL.CL_BAR, id);
  if ((0, _cartesianFn.isHideOrNoData)(_props, data)) {
    return null;
  }
  const needClip = (0, _cartesianFn.isNeedClip)(_props);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Layer.Layer, {
    className: (0, _styleFn.crCn)(_CL.CL_BAR, className),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ClipPathRect.default, {
      is: needClip,
      id: clipPathId,
      props: _props
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Layer.Layer, {
      className: _CL.CL_BAR_RECTANGLES,
      clipPath: (0, _cartesianFn.crClipPath)(needClip, clipPathId),
      children: [(0, _BarRenderFn.renderBackground)(_props), (0, _BarRenderFn.renderRectangles)(_props
      //prevData,
      //handleAnimationStart,
      //handleAnimationEnd,
      //animationId,
      //isAnimationFinished
      )]
    })]
  });
});
Bar.displayName = 'Bar';
const _getValueArr = (arrOrValue, baseValue) => (0, _isTypeFn.isArr)(arrOrValue) ? arrOrValue : [baseValue, arrOrValue];
const _isMinPointSizeCase = (minPointSize, value) => (0, _DataUtils.mathAbs)(minPointSize) > 0 && (0, _DataUtils.mathAbs)(value) < (0, _DataUtils.mathAbs)(minPointSize),
  _calcMinPointSizeDelta = (minPointSize, value) => (0, _DataUtils.mathSign)(value || minPointSize) * ((0, _DataUtils.mathAbs)(minPointSize) - (0, _DataUtils.mathAbs)(value)),
  _crValueScaleTuple = (xyAxis, value) => [xyAxis.scale(value[0]), xyAxis.scale(value[1])];

/**
 * Compose the data of each group
 * @param {Object} props Props for the component
 * @param {Object} item        An instance of Bar
 * @param {Array} barPosition  The offset and size of each bar
 * @param {Object} xAxis       The configuration of x-axis
 * @param {Object} yAxis       The configuration of y-axis
 * @param {Array} stackedData  The stacked data of a bar item
 * @return{Array} Composed data
 */
Bar.getComposedData = _ref => {
  let {
    props,
    item,
    barPosition,
    bandSize,
    xAxis,
    yAxis,
    xAxisTicks,
    yAxisTicks,
    stackedData,
    dataStartIndex = 0,
    displayedData,
    offset
  } = _ref;
  const pos = (0, _ChartUtils.findPositionOfBar)(barPosition, item);
  if (!pos) {
    return null;
  }
  const {
      layout
    } = props,
    {
      dataKey,
      minPointSize
    } = item.props,
    numericAxis = (0, _ChartUtils.isLayoutHorizontal)(layout) ? yAxis : xAxis,
    baseValue = (0, _ChartUtils.getBaseValueOfBar)({
      numericAxis
    }),
    _crDisplayedDataValue = (entry, index) => _getValueArr((0, _ChartUtils.getValueByDataKey)(entry, dataKey), baseValue);
  const rects = displayedData.map((entry, index) => {
    let value = _crDisplayedDataValue(entry, index),
      x,
      y,
      width,
      height,
      background;
    if ((0, _ChartUtils.isLayoutHorizontal)(layout)) {
      var _ref2;
      const [baseValueScale, currentValueScale] = _crValueScaleTuple(yAxis, value);
      x = (0, _ChartUtils.getCateCoordinateOfBar)({
        axis: xAxis,
        ticks: xAxisTicks,
        offset: pos.offset,
        bandSize,
        entry,
        index
      });
      y = (_ref2 = currentValueScale != null ? currentValueScale : baseValueScale) != null ? _ref2 : void 0;
      width = pos.size;
      const computedHeight = baseValueScale - currentValueScale;
      height = (0, _isTypeFn.isNaN)(computedHeight) ? 0 : computedHeight;
      background = {
        y: yAxis.y,
        height: yAxis.height,
        x,
        width
      };
      if (_isMinPointSizeCase(minPointSize, height)) {
        const delta = _calcMinPointSizeDelta(minPointSize, height);
        y -= delta;
        height += delta;
      }
    } else {
      const [baseValueScale, currentValueScale] = _crValueScaleTuple(xAxis, value);
      x = baseValueScale;
      y = (0, _ChartUtils.getCateCoordinateOfBar)({
        axis: yAxis,
        ticks: yAxisTicks,
        offset: pos.offset,
        bandSize,
        entry,
        index
      });
      width = currentValueScale - baseValueScale;
      height = pos.size;
      background = {
        x: xAxis.x,
        width: xAxis.width,
        y,
        height
      };
      if (_isMinPointSizeCase(minPointSize, width)) {
        width += _calcMinPointSizeDelta(minPointSize, width);
      }
    }
    return Object.assign({}, entry, {
      x,
      y,
      width,
      height,
      value: stackedData ? value : value[1],
      payload: entry,
      background,
      tooltipPayload: [(0, _ChartUtils.getTooltipItem)(item, entry)],
      tooltipPosition: {
        x: x + width / 2,
        y: y + height / 2
      }
    });
  });
  return Object.assign({
    data: rects,
    layout
  }, offset);
};
//# sourceMappingURL=Bar.js.map