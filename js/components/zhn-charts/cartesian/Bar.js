"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.Bar = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _uiApi = require("../../uiApi");
var _crCn = _interopRequireDefault(require("../../zhn-utils/crCn"));
var _FnUtils = require("../util/FnUtils");
var _Layer = require("../container/Layer");
var _Cell = require("../component/Cell");
var _LabelList = require("../component/LabelList");
var _Global = require("../util/Global");
var _DataUtils = require("../util/DataUtils");
var _ReactUtils = require("../util/ReactUtils");
var _ChartUtils = require("../util/ChartUtils");
var _BarRenderFn = require("./BarRenderFn");
var _cartesianFn = require("./cartesianFn");
var _useAnimationHandle2 = _interopRequireDefault(require("./useAnimationHandle"));
var _usePrevCurData2 = _interopRequireDefault(require("./usePrevCurData"));
var _useClipPathId = _interopRequireDefault(require("./useClipPathId"));
var _ClipPathRect = _interopRequireDefault(require("./ClipPathRect"));
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
var Bar = (0, _uiApi.memo)(function (props) {
  var hide = props.hide,
    data = props.data,
    className = props.className,
    isAnimationActive = props.isAnimationActive,
    background = props.background,
    id = props.id,
    animationId = props.animationId,
    _useAnimationHandle = (0, _useAnimationHandle2["default"])(props),
    isAnimationFinished = _useAnimationHandle[0],
    handleAnimationStart = _useAnimationHandle[1],
    handleAnimationEnd = _useAnimationHandle[2],
    _usePrevCurData = (0, _usePrevCurData2["default"])(data, animationId),
    prevData = _usePrevCurData[0],
    clipPathId = (0, _useClipPathId["default"])(_CL.CL_BAR, id);
  if (hide || !data || !data.length) {
    return null;
  }
  var layerClass = (0, _crCn["default"])(_CL.CL_BAR, className),
    needClip = (0, _cartesianFn.isNeedClip)(props);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Layer.Layer, {
    className: layerClass,
    children: [needClip ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_ClipPathRect["default"], {
      id: clipPathId,
      props: props
    }) : null, /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Layer.Layer, {
      className: _CL.CL_BAR_RECTANGLES,
      clipPath: needClip ? "url(#clipPath-" + clipPathId + ")" : null,
      children: [background ? (0, _BarRenderFn.renderBackground)(props) : null, (0, _BarRenderFn.renderRectangles)(props, prevData, handleAnimationStart, handleAnimationEnd)]
    }), (0, _BarRenderFn.renderErrorBar)(needClip, clipPathId, isAnimationFinished, props), (!isAnimationActive || isAnimationFinished) && _LabelList.LabelList.renderCallByParent(props, data)]
  });
});
exports.Bar = Bar;
Bar.displayName = 'Bar';
Bar.defaultProps = {
  xAxisId: 0,
  yAxisId: 0,
  legendType: 'rect',
  minPointSize: 0,
  hide: false,
  // data of bar
  data: [],
  layout: 'vertical',
  isAnimationActive: !_Global.Global.isSsr,
  animationBegin: 0,
  animationDuration: 400,
  animationEasing: 'ease'
};

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
Bar.getComposedData = function (_ref) {
  var props = _ref.props,
    item = _ref.item,
    barPosition = _ref.barPosition,
    bandSize = _ref.bandSize,
    xAxis = _ref.xAxis,
    yAxis = _ref.yAxis,
    xAxisTicks = _ref.xAxisTicks,
    yAxisTicks = _ref.yAxisTicks,
    stackedData = _ref.stackedData,
    dataStartIndex = _ref.dataStartIndex,
    displayedData = _ref.displayedData,
    offset = _ref.offset;
  var pos = (0, _ChartUtils.findPositionOfBar)(barPosition, item);
  if (!pos) {
    return null;
  }
  var layout = props.layout,
    _item$props = item.props,
    dataKey = _item$props.dataKey,
    children = _item$props.children,
    minPointSize = _item$props.minPointSize,
    numericAxis = layout === 'horizontal' ? yAxis : xAxis,
    stackedDomain = stackedData ? numericAxis.scale.domain() : null,
    baseValue = (0, _ChartUtils.getBaseValueOfBar)({
      numericAxis: numericAxis
    }),
    cells = (0, _ReactUtils.findAllByType)(children, _Cell.Cell);
  var rects = displayedData.map(function (entry, index) {
    var value, x, y, width, height, background;
    if (stackedData) {
      value = (0, _ChartUtils.truncateByDomain)(stackedData[dataStartIndex + index], stackedDomain);
    } else {
      value = (0, _ChartUtils.getValueByDataKey)(entry, dataKey);
      if (!(0, _FnUtils._isArr)(value)) {
        value = [baseValue, value];
      }
    }
    if (layout === 'horizontal') {
      var _ref3;
      var _ref2 = [yAxis.scale(value[0]), yAxis.scale(value[1])],
        baseValueScale = _ref2[0],
        currentValueScale = _ref2[1];
      x = (0, _ChartUtils.getCateCoordinateOfBar)({
        axis: xAxis,
        ticks: xAxisTicks,
        offset: pos.offset,
        bandSize: bandSize,
        entry: entry,
        index: index
      });
      y = (_ref3 = currentValueScale != null ? currentValueScale : baseValueScale) != null ? _ref3 : void 0;
      width = pos.size;
      var computedHeight = baseValueScale - currentValueScale;
      height = Number.isNaN(computedHeight) ? 0 : computedHeight;
      background = {
        y: yAxis.y,
        height: yAxis.height,
        x: x,
        width: width
      };
      if (Math.abs(minPointSize) > 0 && Math.abs(height) < Math.abs(minPointSize)) {
        var delta = (0, _DataUtils.mathSign)(height || minPointSize) * (Math.abs(minPointSize) - Math.abs(height));
        y -= delta;
        height += delta;
      }
    } else {
      var _ref4 = [xAxis.scale(value[0]), xAxis.scale(value[1])],
        _baseValueScale = _ref4[0],
        _currentValueScale = _ref4[1];
      x = _baseValueScale;
      y = (0, _ChartUtils.getCateCoordinateOfBar)({
        axis: yAxis,
        ticks: yAxisTicks,
        offset: pos.offset,
        bandSize: bandSize,
        entry: entry,
        index: index
      });
      width = _currentValueScale - _baseValueScale;
      height = pos.size;
      background = {
        x: xAxis.x,
        width: xAxis.width,
        y: y,
        height: height
      };
      if (Math.abs(minPointSize) > 0 && Math.abs(width) < Math.abs(minPointSize)) {
        var _delta = (0, _DataUtils.mathSign)(width || minPointSize) * (Math.abs(minPointSize) - Math.abs(width));
        width += _delta;
      }
    }
    return (0, _extends2["default"])({}, entry, {
      x: x,
      y: y,
      width: width,
      height: height,
      value: stackedData ? value : value[1],
      payload: entry,
      background: background
    }, cells && cells[index] && cells[index].props, {
      tooltipPayload: [(0, _ChartUtils.getTooltipItem)(item, entry)],
      tooltipPosition: {
        x: x + width / 2,
        y: y + height / 2
      }
    });
  });
  return (0, _extends2["default"])({
    data: rects,
    layout: layout
  }, offset);
};
//# sourceMappingURL=Bar.js.map