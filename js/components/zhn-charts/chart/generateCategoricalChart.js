"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.generateCategoricalChart = void 0;
var _uiApi = require("../../uiApi");
var _styleFn = require("../../styleFn");
var _localState = require("../context/localState");
var _TooltipContext = require("../context/TooltipContext");
var _Surface = require("../container/Surface");
var _ClipPath = require("../container/ClipPath");
var _ReactUtils = require("../util/ReactUtils");
var _DataUtils = require("../util/DataUtils");
var _useLegendBox = _interopRequireDefault(require("./useLegendBox"));
var _useTooltipEvents = _interopRequireDefault(require("./useTooltipEvents"));
var _generateCategoricalChartFn = require("./generateCategoricalChartFn");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
const DF_PROPS = {
    layout: 'horizontal',
    stackOffset: 'none',
    barCategoryGap: '10%',
    barGap: 4,
    margin: {
      top: 5,
      right: 5,
      bottom: 5,
      left: 5
    },
    reverseStackOrder: false,
    syncMethod: 'index'
  },
  SURFACE_ATTRS = {
    tabIndex: 0,
    role: 'img'
  };
const generateCategoricalChart = function (chartName, updateStateOfAxisMapsOffsetAndStackGroups, validateTooltipEventTypes) {
  if (validateTooltipEventTypes === void 0) {
    validateTooltipEventTypes = ['axis'];
  }
  const ChartWrapper = props => {
    const _props = (0, _uiApi.crProps)(DF_PROPS, props),
      {
        className,
        width,
        height,
        margin,
        style,
        compact,
        title,
        desc,
        layout,
        data
      } = _props,
      [_useTooltipState, _setTooltipState] = (0, _localState.useLocalStateTuple)({
        isTooltipActive: false
      }),
      _refClipPathId = (0, _uiApi.useRef)((_props.id || (0, _DataUtils.uniqueId)('recharts')) + "-clip"),
      _refContainer = (0, _uiApi.useRef)(),
      [legendBBox, handleLegendBBoxUpdate] = (0, _useLegendBox.default)(),
      clipPathId = (0, _uiApi.getRefValue)(_refClipPathId),
      [offset, orderedTooltipTicks, graphicalItems, _graphicItems, _legendProps, _legendItem] = (0, _uiApi.useMemo)(() => updateStateOfAxisMapsOffsetAndStackGroups({
        props: _props
      }, legendBBox, clipPathId), [_props, legendBBox, clipPathId]),
      getMouseTooltipData = evt => {
        const _containerElement = (0, _uiApi.getRefValue)(_refContainer);
        if (!_containerElement) {
          return null;
        }
        const _mouseRange = (0, _generateCategoricalChartFn.crMouseRange)(_containerElement, evt, offset);
        if (!_mouseRange) {
          return null;
        }
        const tooltipData = (0, _generateCategoricalChartFn.getTooltipData)(orderedTooltipTicks, graphicalItems, data, layout, _mouseRange);
        return tooltipData ? tooltipData : null;
      },
      [tooltipItem, events, handleCloseTooltip] = (0, _useTooltipEvents.default)(_props, getMouseTooltipData, _setTooltipState);
    if (!(0, _ReactUtils.validateWidthHeight)(width, height)) {
      return null;
    }
    const _graphicItemsEl = /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Surface.Surface, Object.assign({}, SURFACE_ATTRS, {
      width: width,
      height: height,
      title: title,
      desc: desc,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ClipPath.ClipPath, {
        id: clipPathId,
        offset: offset
      }), _graphicItems]
    }));

    // The "compact" mode is mainly used as the panorama within Brush
    return compact ? _graphicItemsEl : /*#__PURE__*/(0, _jsxRuntime.jsx)("div", Object.assign({
      role: "region",
      ref: _refContainer,
      className: (0, _styleFn.crCn)(_CL.CL_WRAPPER, className),
      style: Object.assign({
        position: 'relative',
        cursor: 'default',
        width,
        height
      }, style)
    }, events, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TooltipContext.TooltipProvider, {
        value: _useTooltipState,
        children: [_graphicItemsEl, _legendProps ? (0, _uiApi.cloneUiElement)(_legendItem, Object.assign({}, _legendProps, {
          chartWidth: width || 0,
          chartHeight: height || 0,
          margin,
          onBBoxUpdate: handleLegendBBoxUpdate
        })) : null, tooltipItem ? (0, _uiApi.cloneUiElement)(tooltipItem, {
          viewBox: Object.assign({}, offset, {
            x: offset.left,
            y: offset.top
          }),
          onClose: handleCloseTooltip
        }) : null]
      })
    }));
  };
  ChartWrapper.displayName = chartName;
  return ChartWrapper;
};
exports.generateCategoricalChart = generateCategoricalChart;
//# sourceMappingURL=generateCategoricalChart.js.map