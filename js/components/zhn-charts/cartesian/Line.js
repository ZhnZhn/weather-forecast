"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.getLineComposedData = exports.Line = void 0;
var _uiApi = require("../../uiApi");
var _styleFn = require("../../styleFn");
var _Layer = require("../container/Layer");
var _ChartUtils = require("../util/ChartUtils");
var _cartesianFn = require("./cartesianFn");
var _useClipPathId = _interopRequireDefault(require("./useClipPathId"));
var _ClipPathRect = _interopRequireDefault(require("./ClipPathRect"));
var _LineDots = require("./LineDots");
var _LineCurveStatically = require("./LineCurveStatically");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
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
  hide: false,
  label: false
};
const Line = exports.Line = (0, _uiApi.memo)(props => {
  const _props = (0, _uiApi.crProps)(DF_PROPS, props),
    {
      dot,
      points,
      className,
      id
    } = _props,
    _refPath = (0, _uiApi.useRef)(),
    clipPathId = (0, _useClipPathId.default)(_CL.CL_LINE, id);
  if ((0, _cartesianFn.isHideOrNoData)(_props, points)) {
    return null;
  }
  const _needClip = (0, _cartesianFn.isNeedClip)(_props),
    _clipPath = (0, _cartesianFn.crClipPath)(_needClip, clipPathId),
    _isLineDots = points.length === 1 || dot;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Layer.Layer, {
    className: (0, _styleFn.crCn)(_CL.CL_LINE, className),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ClipPathRect.default, {
      is: _needClip,
      id: clipPathId,
      props: _props
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_LineCurveStatically.LineCurveStatically, {
      clipPath: _clipPath,
      points: points,
      props: _props,
      refPath: _refPath
    }), ")", _isLineDots && /*#__PURE__*/(0, _jsxRuntime.jsx)(_LineDots.LineDots, {
      clipPath: _clipPath,
      props: _props
    })]
  });
});
(0, _uiApi.setDisplayNameTo)(Line, 'Line');
const _getAxisScaleValue = (axis, value) => value == null ? value : axis.scale(value);
const _getCateCoordinateOfLine = _ref => {
  let {
    axis,
    ticks,
    bandSize,
    entry,
    index,
    dataKey
  } = _ref;
  if (axis.type === 'category') {
    return ticks[index] ? ticks[index].coordinate + bandSize / 2 : null;
  }
  const value = (0, _ChartUtils.getValueByDataKey)(entry, dataKey == null ? axis.dataKey : dataKey);
  return _getAxisScaleValue(axis, value);
};

/**
 * Compose the data of each group
 * @param {Object} props The props from the component
 * @param  {Object} xAxis   The configuration of x-axis
 * @param  {Object} yAxis   The configuration of y-axis
 * @param  {String} dataKey The unique key of a group
 * @return {Array}  Composed data
 */
const getLineComposedData = _ref2 => {
  let {
    layout,
    xAxis,
    yAxis,
    xAxisTicks,
    yAxisTicks,
    bandSize,
    dataKey,
    displayedData,
    offset
  } = _ref2;
  const [_crX, _crY] = (0, _ChartUtils.isLayoutHorizontal)(layout) ? [(value, entry, index) => _getCateCoordinateOfLine({
    axis: xAxis,
    ticks: xAxisTicks,
    bandSize,
    entry,
    index
  }), value => _getAxisScaleValue(yAxis, value)] : [value => _getAxisScaleValue(xAxis, value), (value, entry, index) => _getCateCoordinateOfLine({
    axis: yAxis,
    ticks: yAxisTicks,
    bandSize,
    entry,
    index
  })];
  return Object.assign({
    points: displayedData.map((entry, index) => {
      const value = (0, _ChartUtils.getValueByDataKey)(entry, dataKey);
      return {
        x: _crX(value, entry, index),
        y: _crY(value, entry, index),
        value,
        payload: entry
      };
    }),
    layout
  }, offset);
};
exports.getLineComposedData = getLineComposedData;
//# sourceMappingURL=Line.js.map