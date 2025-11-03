"use strict";

exports.__esModule = true;
exports.generateCategoricalChart = void 0;
var _isTypeFn = require("../../../utils/isTypeFn");
var _uiApi = require("../../uiApi");
var _has = require("../../has");
var _styleFn = require("../../styleFn");
var _Surface = require("../container/Surface");
var _ClipPath = require("../container/ClipPath");
var _Tooltip = require("../component/Tooltip");
var _ReactUtils = require("../util/ReactUtils");
var _DOMUtils = require("../util/DOMUtils");
var _DataUtils = require("../util/DataUtils");
var _ChartUtils = require("../util/ChartUtils");
var _generateCategoricalChartFn = require("./generateCategoricalChartFn");
var _renderFn = require("./renderFn");
var _renderLegend = require("./renderLegend");
var _renderTooltip = require("./renderTooltip");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
const _getEvtTouch = _ref => {
  let {
    changedTouches
  } = _ref;
  return (0, _isTypeFn.isNotEmptyArr)(changedTouches) ? changedTouches[0] : void 0;
};
const _inRange = (x, y, layout, offset) => ((0, _ChartUtils.isLayoutHorizontal)(layout) || (0, _ChartUtils.isLayoutVertical)(layout)) && x >= offset.left && x <= offset.left + offset.width && y >= offset.top && y <= offset.top + offset.height ? {
  x,
  y
} : null;
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
  _createDefaultState = props => ({
    chartX: 0,
    chartY: 0,
    dataStartIndex: 0,
    dataEndIndex: props.data && props.data.length - 1 || 0,
    activeTooltipIndex: -1,
    isTooltipActive: !!props.defaultShowTooltip
  });
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
        data,
        children,
        onMouseEnter,
        onMouseDown,
        onMouseUp,
        onMouseMove,
        onMouseLeave,
        onClick
      } = _props,
      _refData = (0, _uiApi.useRef)(false),
      _refClipPathId = (0, _uiApi.useRef)((_props.id || (0, _DataUtils.uniqueId)('recharts')) + "-clip"),
      _refContainer = (0, _uiApi.useRef)(),
      [state, setState] = (0, _uiApi.useState)(() => Object.assign({}, _createDefaultState(_props), {
        updateId: 0,
        prevData: data,
        prevWidth: width,
        prevHeight: height,
        prevChildren: children
      })),
      {
        isTooltipActive,
        activeCoordinate,
        activePayload,
        activeLabel,
        activeTooltipIndex,
        dataStartIndex,
        dataEndIndex,
        legendBBox,
        updateId
      } = state,
      {
        offset,
        formattedGraphicalItems,
        tooltipAxis,
        xAxisMap,
        yAxisMap,
        orderedTooltipTicks,
        tooltipTicks,
        graphicalItems
      } = (0, _uiApi.useMemo)(() => updateStateOfAxisMapsOffsetAndStackGroups({
        props: _props,
        dataStartIndex,
        dataEndIndex,
        updateId
      }, legendBBox), [_props, dataStartIndex, dataEndIndex, updateId, legendBBox]),
      handleLegendBBoxUpdate = legendBBox => {
        if (legendBBox) {
          setState(prevState => Object.assign({}, prevState, {
            legendBBox
          }));
        }
      },
      getMouseInfo = evt => {
        const _containerElement = (0, _uiApi.getRefValue)(_refContainer);
        if (!_containerElement) {
          return null;
        }
        const containerOffset = (0, _DOMUtils.getOffset)(_containerElement),
          e = (0, _DOMUtils.calculateChartCoordinate)(evt, containerOffset),
          rangeObj = _inRange(e.chartX, e.chartY, layout, offset);
        if (!rangeObj) {
          return null;
        }
        const tooltipData = (0, _generateCategoricalChartFn.getTooltipData)({
          orderedTooltipTicks,
          tooltipAxis,
          tooltipTicks,
          graphicalItems,
          dataStartIndex,
          dataEndIndex
        }, data, layout, rangeObj);
        return tooltipData ? Object.assign({}, e, tooltipData) : null;
      },
      handleMouseEnter = evt => {
        const mouse = getMouseInfo(evt);
        if (mouse) {
          const nextState = Object.assign({}, mouse, {
            isTooltipActive: true
          });
          setState(prevState => Object.assign({}, prevState, nextState));
          if ((0, _isTypeFn.isFn)(onMouseEnter)) {
            onMouseEnter(nextState, evt);
          }
        }
      },
      handleMouseMove = evt => {
        const mouse = getMouseInfo(evt),
          nextState = mouse ? Object.assign({}, mouse, {
            isTooltipActive: true
          }) : {
            isTooltipActive: false
          };
        setState(prevState => Object.assign({}, prevState, nextState));
        if ((0, _isTypeFn.isFn)(onMouseMove)) {
          onMouseMove(nextState, evt);
        }
      },
      handleMouseLeave = evt => {
        const nextState = {
          isTooltipActive: false
        };
        setState(prevState => Object.assign({}, prevState, nextState));
        if ((0, _isTypeFn.isFn)(onMouseLeave)) {
          onMouseLeave(nextState, evt);
        }
      },
      handleCloseTooltip = () => {
        setState(prevState => Object.assign({}, prevState, {
          isTooltipActive: false
        }));
      },
      handleClick = evt => {
        const mouse = getMouseInfo(evt);
        if (mouse) {
          const nextState = Object.assign({}, mouse, {
            isTooltipActive: true
          });
          setState(prevState => Object.assign({}, prevState, nextState));
          if ((0, _isTypeFn.isFn)(onClick)) {
            onClick(nextState, evt);
          }
        }
      },
      handleMouseDown = evt => {
        if ((0, _isTypeFn.isFn)(onMouseDown)) {
          const nextState = getMouseInfo(evt);
          onMouseDown(nextState, evt);
        }
      },
      handleMouseUp = evt => {
        if ((0, _isTypeFn.isFn)(onMouseUp)) {
          const nextState = getMouseInfo(evt);
          onMouseUp(nextState, evt);
        }
      },
      handleTouchMove = evt => {
        const evtTouch = _getEvtTouch(evt);
        if (evtTouch) {
          handleMouseMove(evtTouch);
        }
      },
      handleTouchStart = evt => {
        const evtTouch = _getEvtTouch(evt);
        if (evtTouch) {
          handleMouseDown(evtTouch);
        }
      },
      handleTouchEnd = evt => {
        const evtTouch = _getEvtTouch(evt);
        if (evtTouch) {
          handleMouseUp(evtTouch);
        }
      };

    /*eslint-disable react-hooks/exhaustive-deps*/
    (0, _uiApi.useEffect)(() => {
      if (data !== state.prevData || width !== state.prevWidth || height !== state.prevHeight
      //|| layout !== prevState.prevLayout
      //|| stackOffset !== prevState.prevStackOffset
      //|| !shallowEqual(margin, prevState.prevMargin)
      ) {
        (0, _uiApi.setRefValue)(_refData, true);
        const defaultState = _createDefaultState(_props),
          keepFromPrevState = {
            chartX: state.chartX,
            chartY: state.chartY,
            isTooltipActive: state.isTooltipActive
          },
          updatesToState = Object.assign({}, (0, _generateCategoricalChartFn.getTooltipData)({
            orderedTooltipTicks,
            tooltipAxis,
            tooltipTicks,
            graphicalItems,
            dataStartIndex,
            dataEndIndex
          }, _props.data, layout), {
            updateId: state.updateId + 1
          }),
          newState = Object.assign({}, defaultState, keepFromPrevState, updatesToState);
        setState(prevState => Object.assign({}, prevState, newState, {
          prevData: data,
          prevWidth: width,
          prevHeight: height,
          //prevLayout: layout,
          //prevStackOffset: stackOffset,
          //prevMargin: margin,
          prevChildren: children
        }));
      } else if (!(0, _ReactUtils.isChildrenEqual)(_props.children, state.prevChildren) && !(0, _uiApi.getRefValue)(_refData)) {
        const hasGlobalData = !(0, _isTypeFn.isNullOrUndef)(_props.data),
          newUpdateId = hasGlobalData ? state.updateId : state.updateId + 1;
        setState(prevState => Object.assign({}, prevState, {
          updateId: newUpdateId,
          prevChildren: children
        }));
      } else {
        (0, _uiApi.setRefValue)(_refData, false);
      }
    });
    /*eslint-enable react-hooks/exhaustive-deps*/

    const attrs = {
      tabIndex: 0,
      role: 'img'
    };
    if (!(0, _ReactUtils.validateWidthHeight)(width, height)) {
      return null;
    }
    const clipPathId = (0, _uiApi.getRefValue)(_refClipPathId),
      _graphicItems = (0, _ReactUtils.renderByMap)(children, {
        clipPathId,
        width,
        height,
        layout,
        children,
        offset,
        xAxisMap,
        yAxisMap,
        formattedGraphicalItems,
        isTooltipActive,
        tooltipAxis,
        activeTooltipIndex,
        activeLabel,
        activeCoordinate,
        activePayload
      }, _renderFn.renderMap);

    // The "compact" mode is mainly used as the panorama within Brush
    if (compact) {
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Surface.Surface, Object.assign({}, attrs, {
        width: width,
        height: height,
        title: title,
        desc: desc,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ClipPath.ClipPath, {
          id: clipPathId,
          offset: offset
        }), _graphicItems]
      }));
    }
    const tooltipItem = (0, _ReactUtils.findChildByType)(children, _Tooltip.Tooltip),
      events = tooltipItem ? tooltipItem.props.trigger === 'click' ? {
        onClick: handleClick
      } : Object.assign({
        onMouseEnter: handleMouseEnter,
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave
      }, _has.HAS_TOUCH_EVENTS ? {
        onTouchMove: handleTouchMove,
        onTouchStart: handleTouchStart,
        onTouchEnd: handleTouchEnd
      } : void 0) : {};
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", Object.assign({
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
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_Surface.Surface, Object.assign({}, attrs, {
        width: width,
        height: height,
        title: title,
        desc: desc,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ClipPath.ClipPath, {
          id: clipPathId,
          offset: offset
        }), _graphicItems]
      })), (0, _renderLegend.renderLegend)(width, height, margin, children, formattedGraphicalItems, handleLegendBBoxUpdate), (0, _renderTooltip.renderTooltip)(tooltipItem, isTooltipActive, activeCoordinate, activePayload, activeLabel, offset, handleCloseTooltip)]
    }));
  };
  ChartWrapper.displayName = chartName;
  return ChartWrapper;
};
exports.generateCategoricalChart = generateCategoricalChart;
//# sourceMappingURL=generateCategoricalChart.js.map