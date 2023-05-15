"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.Bar = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _uiApi = require("../../uiApi");
var _classnames = _interopRequireDefault(require("classnames"));
var _FnUtils = require("../util/FnUtils");
var _Layer = require("../container/Layer");
var _Cell = require("../component/Cell");
var _LabelList = require("../component/LabelList");
var _Global = require("../util/Global");
var _DataUtils = require("../util/DataUtils");
var _ReactUtils = require("../util/ReactUtils");
var _ChartUtils = require("../util/ChartUtils");
var _BarRenderFn = require("./BarRenderFn");
var _useAnimationHandle2 = _interopRequireDefault(require("./useAnimationHandle"));
var _usePrevCurData2 = _interopRequireDefault(require("./usePrevCurData"));
var _jsxRuntime = require("react/jsx-runtime");
var CL_BAR = "recharts-bar",
  CL_BAR_RECTANGLES = CL_BAR + "-rectangles";
var _isNeedClip = function _isNeedClip(_ref) {
  var xAxis = _ref.xAxis,
    yAxis = _ref.yAxis;
  return xAxis && xAxis.allowDataOverflow || yAxis && yAxis.allowDataOverflow;
};
var Bar = (0, _uiApi.memo)(function (props) {
  var hide = props.hide,
    data = props.data,
    className = props.className,
    left = props.left,
    top = props.top,
    width = props.width,
    height = props.height,
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
    clipPathId = (0, _uiApi.useMemo)(function () {
      return (0, _FnUtils._isNil)(id) ? (0, _DataUtils.uniqueId)(CL_BAR + "-") : id;
    }, [id]);
  if (hide || !data || !data.length) {
    return null;
  }
  var layerClass = (0, _classnames["default"])(CL_BAR, className),
    needClip = _isNeedClip(props);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Layer.Layer, {
    className: layerClass,
    children: [needClip ? /*#__PURE__*/(0, _jsxRuntime.jsx)("defs", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("clipPath", {
        id: "clipPath-" + clipPathId,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
          x: left,
          y: top,
          width: width,
          height: height
        })
      })
    }) : null, /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Layer.Layer, {
      className: CL_BAR_RECTANGLES,
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
Bar.getComposedData = function (_ref2) {
  var props = _ref2.props,
    item = _ref2.item,
    barPosition = _ref2.barPosition,
    bandSize = _ref2.bandSize,
    xAxis = _ref2.xAxis,
    yAxis = _ref2.yAxis,
    xAxisTicks = _ref2.xAxisTicks,
    yAxisTicks = _ref2.yAxisTicks,
    stackedData = _ref2.stackedData,
    dataStartIndex = _ref2.dataStartIndex,
    displayedData = _ref2.displayedData,
    offset = _ref2.offset;
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
      var _ref4;
      var _ref3 = [yAxis.scale(value[0]), yAxis.scale(value[1])],
        baseValueScale = _ref3[0],
        currentValueScale = _ref3[1];
      x = (0, _ChartUtils.getCateCoordinateOfBar)({
        axis: xAxis,
        ticks: xAxisTicks,
        offset: pos.offset,
        bandSize: bandSize,
        entry: entry,
        index: index
      });
      y = (_ref4 = currentValueScale != null ? currentValueScale : baseValueScale) != null ? _ref4 : void 0;
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
      var _ref5 = [xAxis.scale(value[0]), xAxis.scale(value[1])],
        _baseValueScale = _ref5[0],
        _currentValueScale = _ref5[1];
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