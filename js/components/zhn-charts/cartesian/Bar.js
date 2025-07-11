"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.Bar = void 0;
var _uiApi = require("../../uiApi");
var _styleFn = require("../../styleFn");
var _FnUtils = require("../util/FnUtils");
var _Global = require("../util/Global");
var _DataUtils = require("../util/DataUtils");
var _ReactUtils = require("../util/ReactUtils");
var _ChartUtils = require("../util/ChartUtils");
var _Layer = require("../container/Layer");
var _Cell = require("../component/Cell");
var _LabelList = require("../component/LabelList");
var _BarRenderFn = require("./BarRenderFn");
var _cartesianFn = require("./cartesianFn");
var _useAnimationHandle = _interopRequireDefault(require("./useAnimationHandle"));
var _usePrevCurData = _interopRequireDefault(require("./usePrevCurData"));
var _useClipPathId = _interopRequireDefault(require("./useClipPathId"));
var _ClipPathRect = _interopRequireDefault(require("./ClipPathRect"));
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
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
  const _props = (0, _ReactUtils.crProps)(DF_PROPS, props),
    {
      data,
      className,
      isAnimationActive,
      //background,
      id,
      animationId
    } = _props,
    [isAnimationFinished, handleAnimationStart, handleAnimationEnd] = (0, _useAnimationHandle.default)(_props),
    [prevData] = (0, _usePrevCurData.default)(data, animationId),
    clipPathId = (0, _useClipPathId.default)(_CL.CL_BAR, id);
  if ((0, _cartesianFn.isHideOrNoData)(_props, data)) {
    return null;
  }
  const layerClass = (0, _styleFn.crCn)(_CL.CL_BAR, className),
    needClip = (0, _cartesianFn.isNeedClip)(_props);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Layer.Layer, {
    className: layerClass,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ClipPathRect.default, {
      is: needClip,
      id: clipPathId,
      props: _props
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Layer.Layer, {
      className: _CL.CL_BAR_RECTANGLES,
      clipPath: needClip ? `url(#clipPath-${clipPathId})` : null,
      children: [(0, _BarRenderFn.renderBackground)(_props), (0, _BarRenderFn.renderRectangles)(_props, prevData, handleAnimationStart, handleAnimationEnd)]
    }), (!isAnimationActive || isAnimationFinished) && _LabelList.LabelList.renderCallByParent(_props, data)]
  });
});
Bar.displayName = 'Bar';

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
    dataStartIndex,
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
      children,
      minPointSize
    } = item.props,
    numericAxis = layout === 'horizontal' ? yAxis : xAxis,
    stackedDomain = stackedData ? numericAxis.scale.domain() : null,
    baseValue = (0, _ChartUtils.getBaseValueOfBar)({
      numericAxis
    }),
    cells = (0, _ReactUtils.findAllByType)(children, _Cell.Cell);
  const rects = displayedData.map((entry, index) => {
    let value, x, y, width, height, background;
    if (stackedData) {
      value = (0, _ChartUtils.truncateByDomain)(stackedData[dataStartIndex + index], stackedDomain);
    } else {
      value = (0, _ChartUtils.getValueByDataKey)(entry, dataKey);
      if (!(0, _FnUtils._isArr)(value)) {
        value = [baseValue, value];
      }
    }
    if (layout === 'horizontal') {
      const [baseValueScale, currentValueScale] = [yAxis.scale(value[0]), yAxis.scale(value[1])];
      x = (0, _ChartUtils.getCateCoordinateOfBar)({
        axis: xAxis,
        ticks: xAxisTicks,
        offset: pos.offset,
        bandSize,
        entry,
        index
      });
      y = currentValueScale ?? baseValueScale ?? void 0;
      width = pos.size;
      const computedHeight = baseValueScale - currentValueScale;
      height = Number.isNaN(computedHeight) ? 0 : computedHeight;
      background = {
        y: yAxis.y,
        height: yAxis.height,
        x,
        width
      };
      if (Math.abs(minPointSize) > 0 && Math.abs(height) < Math.abs(minPointSize)) {
        const delta = (0, _DataUtils.mathSign)(height || minPointSize) * (Math.abs(minPointSize) - Math.abs(height));
        y -= delta;
        height += delta;
      }
    } else {
      const [baseValueScale, currentValueScale] = [xAxis.scale(value[0]), xAxis.scale(value[1])];
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
      if (Math.abs(minPointSize) > 0 && Math.abs(width) < Math.abs(minPointSize)) {
        const delta = (0, _DataUtils.mathSign)(width || minPointSize) * (Math.abs(minPointSize) - Math.abs(width));
        width += delta;
      }
    }
    return {
      ...entry,
      x,
      y,
      width,
      height,
      value: stackedData ? value : value[1],
      payload: entry,
      background,
      ...(cells && cells[index] && cells[index].props),
      tooltipPayload: [(0, _ChartUtils.getTooltipItem)(item, entry)],
      tooltipPosition: {
        x: x + width / 2,
        y: y + height / 2
      }
    };
  });
  return {
    data: rects,
    layout,
    ...offset
  };
};
//# sourceMappingURL=Bar.js.map