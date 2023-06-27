"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.generateCategoricalChart = void 0;
var _uiApi = require("../../uiApi");
var _crCn = _interopRequireDefault(require("../../zhn-utils/crCn"));
var _FnUtils = require("../util/FnUtils");
var _getTicks = require("../cartesian/getTicks");
var _CartesianAxis = require("../cartesian/CartesianAxis");
var _Surface = require("../container/Surface");
var _Tooltip = require("../component/Tooltip");
var _RectangleFn = require("../shape/RectangleFn");
var _ReactUtils = require("../util/ReactUtils");
var _DOMUtils = require("../util/DOMUtils");
var _DataUtils = require("../util/DataUtils");
var _ChartUtils = require("../util/ChartUtils");
var _Events = require("../util/Events");
var _types = require("../util/types");
var _chartFn = require("./chartFn");
var _AccessibilityManager = require("./AccessibilityManager");
var _getTooltipContent = require("./getTooltipContent");
var _fUpdateStateOfAxisOffsetAndStackGroups = require("./fUpdateStateOfAxisOffsetAndStackGroups");
var _generateCategoricalChartFn = require("./generateCategoricalChartFn");
var _fGetDerivedStateFromProps = require("./fGetDerivedStateFromProps");
var _renderFn = require("./renderFn");
var _renderLegend = require("./renderLegend");
var _renderTooltip = require("./renderTooltip");
var _renderClipPath = require("./renderClipPath");
var _CL = require("../CL");
var _react = require("react");
var _jsxRuntime = require("react/jsx-runtime");
const _inRange = (x, y, props, state) => {
  const {
    layout
  } = props;
  if ((0, _ChartUtils.isLayoutHorizontal)(layout) || (0, _ChartUtils.isLayoutVertical)(layout)) {
    const {
        offset
      } = state,
      isInRange = x >= offset.left && x <= offset.left + offset.width && y >= offset.top && y <= offset.top + offset.height;
    return isInRange ? {
      x,
      y
    } : null;
  }
  return null;
};
const generateCategoricalChart = _ref => {
  var _class;
  let {
    chartName,
    GraphicalChild,
    defaultTooltipEventType = 'axis',
    validateTooltipEventTypes = ['axis'],
    axisComponents,
    legendContent,
    formatAxisMap,
    defaultProps
  } = _ref;
  const updateStateOfAxisMapsOffsetAndStackGroups = (0, _fUpdateStateOfAxisOffsetAndStackGroups.fUpdateStateOfAxisMapsOffsetAndStackGroups)(chartName, GraphicalChild, axisComponents, formatAxisMap);
  return _class = class CategoricalChartWrapper extends _uiApi.Component {
    constructor(props) {
      super(props);
      this._chartName = chartName;
      this.accessibilityManager = new _AccessibilityManager.AccessibilityManager();
      this.clearDeferId = () => {
        if (!(0, _FnUtils._isNil)(this.deferId) && _generateCategoricalChartFn.deferClear) {
          (0, _generateCategoricalChartFn.deferClear)(this.deferId);
        }
        this.deferId = null;
      };
      this.axesTicksGenerator = axis => (0, _ChartUtils.getTicksOfAxis)(axis, true);
      this.verticalCoordinatesGenerator = _ref2 => {
        let {
          xAxis,
          width,
          height,
          offset
        } = _ref2;
        return (0, _ChartUtils.getCoordinatesOfGrid)((0, _getTicks.getTicks)({
          ..._CartesianAxis.CartesianAxis.defaultProps,
          ...xAxis,
          ticks: (0, _ChartUtils.getTicksOfAxis)(xAxis, true),
          viewBox: {
            x: 0,
            y: 0,
            width,
            height
          }
        }), offset.left, offset.left + offset.width);
      };
      this.horizontalCoordinatesGenerator = _ref3 => {
        let {
          yAxis,
          width,
          height,
          offset
        } = _ref3;
        return (0, _ChartUtils.getCoordinatesOfGrid)((0, _getTicks.getTicks)({
          ..._CartesianAxis.CartesianAxis.defaultProps,
          ...yAxis,
          ticks: (0, _ChartUtils.getTicksOfAxis)(yAxis, true),
          viewBox: {
            x: 0,
            y: 0,
            width,
            height
          }
        }), offset.top, offset.top + offset.height);
      };
      this.handleLegendBBoxUpdate = box => {
        if (box) {
          const {
            dataStartIndex,
            dataEndIndex,
            updateId
          } = this.state;
          this.setState({
            legendBBox: box,
            ...updateStateOfAxisMapsOffsetAndStackGroups({
              props: this.props,
              dataStartIndex,
              dataEndIndex,
              updateId
            }, {
              ...this.state,
              legendBBox: box
            })
          });
        }
      };
      this.handleReceiveSyncEvent = (cId, chartId, data) => {
        const {
          syncId
        } = this.props;
        if (syncId === cId && chartId !== this.uniqueChartId) {
          this.clearDeferId();
          this.deferId = _generateCategoricalChartFn.defer && (0, _generateCategoricalChartFn.defer)(this.applySyncEvent.bind(this, data));
        }
      };
      this.handleBrushChange = _ref4 => {
        let {
          startIndex,
          endIndex
        } = _ref4;
        // Only trigger changes if the extents of the brush have actually changed
        if (startIndex !== this.state.dataStartIndex || endIndex !== this.state.dataEndIndex) {
          const {
            updateId
          } = this.state;
          this.setState(() => ({
            dataStartIndex: startIndex,
            dataEndIndex: endIndex,
            ...updateStateOfAxisMapsOffsetAndStackGroups({
              props: this.props,
              dataStartIndex: startIndex,
              dataEndIndex: endIndex,
              updateId
            }, this.state)
          }));
          this.triggerSyncEvent({
            dataStartIndex: startIndex,
            dataEndIndex: endIndex
          });
        }
      };
      this.handleMouseEnter = e => {
        const {
            onMouseEnter
          } = this.props,
          mouse = this.getMouseInfo(e);
        if (mouse) {
          const nextState = {
            ...mouse,
            isTooltipActive: true
          };
          this.setState(nextState);
          this.triggerSyncEvent(nextState);
          if ((0, _FnUtils._isFn)(onMouseEnter)) {
            onMouseEnter(nextState, e);
          }
        }
      };
      this.triggeredAfterMouseMove = e => {
        const {
            onMouseMove
          } = this.props,
          mouse = this.getMouseInfo(e),
          nextState = mouse ? {
            ...mouse,
            isTooltipActive: true
          } : {
            isTooltipActive: false
          };
        this.setState(nextState);
        this.triggerSyncEvent(nextState);
        if ((0, _FnUtils._isFn)(onMouseMove)) {
          onMouseMove(nextState, e);
        }
      };
      this.handleItemMouseEnter = el => {
        this.setState(() => ({
          isTooltipActive: true,
          activeItem: el,
          activePayload: el.tooltipPayload,
          activeCoordinate: el.tooltipPosition || {
            x: el.cx,
            y: el.cy
          }
        }));
      };
      this.handleItemMouseLeave = () => {
        this.setState(() => ({
          isTooltipActive: false
        }));
      };
      this.handleMouseMove = e => {
        if (e && (0, _FnUtils._isFn)(e.persist)) {
          e.persist();
        }
        this.triggeredAfterMouseMove(e);
      };
      this.handleMouseLeave = e => {
        const {
            onMouseLeave
          } = this.props,
          nextState = {
            isTooltipActive: false
          };
        this.setState(nextState);
        this.triggerSyncEvent(nextState);
        if ((0, _FnUtils._isFn)(onMouseLeave)) {
          onMouseLeave(nextState, e);
        }
        this.cancelThrottledTriggerAfterMouseMove();
      };
      this.handleOuterEvent = e => {
        const eventName = (0, _ReactUtils.getReactEventByType)(e),
          event = (0, _FnUtils._getByPropName)(this.props, "" + eventName);
        if (eventName && (0, _FnUtils._isFn)(event)) {
          const mouse = /.*touch.*/i.test(eventName) ? this.getMouseInfo(e.changedTouches[0]) : this.getMouseInfo(e);
          // handler event case;
          event(mouse, e);
        }
      };
      this.handleClick = e => {
        const {
            onClick
          } = this.props,
          mouse = this.getMouseInfo(e);
        if (mouse) {
          const nextState = {
            ...mouse,
            isTooltipActive: true
          };
          this.setState(nextState);
          this.triggerSyncEvent(nextState);
          if ((0, _FnUtils._isFn)(onClick)) {
            onClick(nextState, e);
          }
        }
      };
      this.handleMouseDown = e => {
        const {
          onMouseDown
        } = this.props;
        if ((0, _FnUtils._isFn)(onMouseDown)) {
          const nextState = this.getMouseInfo(e);
          onMouseDown(nextState, e);
        }
      };
      this.handleMouseUp = e => {
        const {
          onMouseUp
        } = this.props;
        if ((0, _FnUtils._isFn)(onMouseUp)) {
          const nextState = this.getMouseInfo(e);
          onMouseUp(nextState, e);
        }
      };
      this.handleTouchMove = e => {
        if (e.changedTouches != null && e.changedTouches.length > 0) {
          this.handleMouseMove(e.changedTouches[0]);
        }
      };
      this.handleTouchStart = e => {
        if (e.changedTouches != null && e.changedTouches.length > 0) {
          this.handleMouseDown(e.changedTouches[0]);
        }
      };
      this.handleTouchEnd = e => {
        if (e.changedTouches != null && e.changedTouches.length > 0) {
          this.handleMouseUp(e.changedTouches[0]);
        }
      };
      this._refLegend = legend => {
        this.legendInstance = legend;
      };
      this.uniqueChartId = (0, _FnUtils._isNil)(props.id) ? (0, _DataUtils.uniqueId)('recharts') : props.id;
      this.clipPathId = this.uniqueChartId + "-clip";
      if (props.throttleDelay) {
        this.triggeredAfterMouseMove = (0, _FnUtils._throttle)(this.triggeredAfterMouseMove, props.throttleDelay);
      }
      this.state = {};
    }
    componentDidMount() {
      var _this$props$margin$le, _this$props$margin$to;
      if (!(0, _FnUtils._isNil)(this.props.syncId)) {
        this.addListener();
      }
      this.accessibilityManager.setDetails({
        container: this.container,
        offset: {
          left: (_this$props$margin$le = this.props.margin.left) != null ? _this$props$margin$le : 0,
          top: (_this$props$margin$to = this.props.margin.top) != null ? _this$props$margin$to : 0
        },
        coordinateList: this.state.tooltipTicks,
        mouseHandlerCallback: this.handleMouseMove,
        layout: this.props.layout
      });
    }
    getSnapshotBeforeUpdate(prevProps, prevState) {
      if (!this.props.accessibilityLayer) {
        return null;
      }
      if (this.state.tooltipTicks !== prevState.tooltipTicks) {
        this.accessibilityManager.setDetails({
          coordinateList: this.state.tooltipTicks
        });
      }
      if (this.props.layout !== prevProps.layout) {
        this.accessibilityManager.setDetails({
          layout: this.props.layout
        });
      }
      if (this.props.margin !== prevProps.margin) {
        var _this$props$margin$le2, _this$props$margin$to2;
        this.accessibilityManager.setDetails({
          offset: {
            left: (_this$props$margin$le2 = this.props.margin.left) != null ? _this$props$margin$le2 : 0,
            top: (_this$props$margin$to2 = this.props.margin.top) != null ? _this$props$margin$to2 : 0
          }
        });
      }
      // Something has to be returned for getSnapshotBeforeUpdate
      return null;
    }
    componentDidUpdate(prevProps) {
      // add syncId
      if ((0, _FnUtils._isNil)(prevProps.syncId) && !(0, _FnUtils._isNil)(this.props.syncId)) {
        this.addListener();
      }
      // remove syncId
      if (!(0, _FnUtils._isNil)(prevProps.syncId) && (0, _FnUtils._isNil)(this.props.syncId)) {
        this.removeListener();
      }
    }
    componentWillUnmount() {
      this.clearDeferId();
      if (!(0, _FnUtils._isNil)(this.props.syncId)) {
        this.removeListener();
      }
      this.cancelThrottledTriggerAfterMouseMove();
    }
    cancelThrottledTriggerAfterMouseMove() {
      if (typeof this.triggeredAfterMouseMove.cancel === 'function') {
        this.triggeredAfterMouseMove.cancel();
      }
    }
    getTooltipEventType() {
      const tooltipItem = (0, _ReactUtils.findChildByType)(this.props.children, _Tooltip.Tooltip);
      if (tooltipItem && (0, _FnUtils._isBool)(tooltipItem.props.shared)) {
        const eventType = tooltipItem.props.shared ? 'axis' : 'item';
        return validateTooltipEventTypes.indexOf(eventType) >= 0 ? eventType : defaultTooltipEventType;
      }
      return defaultTooltipEventType;
    }

    /**
     * Get the information of mouse in chart, return null when the mouse is not in the chart
     * @param  {Object} event    The event object
     * @return {Object}          Mouse data
     */
    getMouseInfo(event) {
      if (!this.container) {
        return null;
      }
      const containerOffset = (0, _DOMUtils.getOffset)(this.container),
        e = (0, _DOMUtils.calculateChartCoordinate)(event, containerOffset),
        rangeObj = _inRange(e.chartX, e.chartY, this.props, this.state);
      if (!rangeObj) {
        return null;
      }
      const {
        xAxisMap,
        yAxisMap
      } = this.state;
      const tooltipEventType = this.getTooltipEventType();
      if (tooltipEventType !== 'axis' && xAxisMap && yAxisMap) {
        const xScale = (0, _DataUtils.getAnyElementOfObject)(xAxisMap).scale;
        const yScale = (0, _DataUtils.getAnyElementOfObject)(yAxisMap).scale;
        const xValue = xScale && xScale.invert ? xScale.invert(e.chartX) : null;
        const yValue = yScale && yScale.invert ? yScale.invert(e.chartY) : null;
        return {
          ...e,
          xValue,
          yValue
        };
      }
      const toolTipData = (0, _generateCategoricalChartFn.getTooltipData)(this.state, this.props.data, this.props.layout, rangeObj);
      if (toolTipData) {
        return {
          ...e,
          ...toolTipData
        };
      }
      return null;
    }
    getCursorRectangle() {
      const {
          layout
        } = this.props,
        {
          activeCoordinate,
          offset,
          tooltipAxisBandSize
        } = this.state,
        halfSize = tooltipAxisBandSize / 2,
        _isLayoutHorizontal = (0, _ChartUtils.isLayoutHorizontal)(layout);
      return {
        stroke: 'none',
        fill: '#ccc',
        x: _isLayoutHorizontal ? activeCoordinate.x - halfSize : offset.left + 0.5,
        y: _isLayoutHorizontal ? offset.top + 0.5 : activeCoordinate.y - halfSize,
        width: _isLayoutHorizontal ? tooltipAxisBandSize : offset.width - 1,
        height: _isLayoutHorizontal ? offset.height - 1 : tooltipAxisBandSize
      };
    }
    getCursorPoints() {
      const {
        layout
      } = this.props;
      const {
        activeCoordinate,
        offset
      } = this.state;
      let x1, y1, x2, y2;
      if ((0, _ChartUtils.isLayoutHorizontal)(layout)) {
        x1 = activeCoordinate.x;
        x2 = x1;
        y1 = offset.top;
        y2 = offset.top + offset.height;
      } else if ((0, _ChartUtils.isLayoutVertical)(layout)) {
        y1 = activeCoordinate.y;
        y2 = y1;
        x1 = offset.left;
        x2 = offset.left + offset.width;
      }
      return [{
        x: x1,
        y: y1
      }, {
        x: x2,
        y: y2
      }];
    }
    parseEventsOfWrapper() {
      const {
          children
        } = this.props,
        tooltipEventType = this.getTooltipEventType(),
        tooltipItem = (0, _ReactUtils.findChildByType)(children, _Tooltip.Tooltip),
        tooltipEvents = tooltipItem && tooltipEventType === 'axis' ? tooltipItem.props.trigger === 'click' ? {
          onClick: this.handleClick
        } : {
          onMouseEnter: this.handleMouseEnter,
          onMouseMove: this.handleMouseMove,
          onMouseLeave: this.handleMouseLeave,
          onTouchMove: this.handleTouchMove,
          onTouchStart: this.handleTouchStart,
          onTouchEnd: this.handleTouchEnd
        } : {},
        outerEvents = (0, _types.adaptEventHandlers)(this.props, this.handleOuterEvent);
      return {
        ...outerEvents,
        ...tooltipEvents
      };
    }
    addListener() {
      _Events.eventCenter.on(_Events.SYNC_EVENT, this.handleReceiveSyncEvent);
      if (_Events.eventCenter.setMaxListeners && _Events.eventCenter._maxListeners) {
        _Events.eventCenter.setMaxListeners(_Events.eventCenter._maxListeners + 1);
      }
    }
    removeListener() {
      _Events.eventCenter.removeListener(_Events.SYNC_EVENT, this.handleReceiveSyncEvent);
      if (_Events.eventCenter.setMaxListeners && _Events.eventCenter._maxListeners) {
        _Events.eventCenter.setMaxListeners(_Events.eventCenter._maxListeners - 1);
      }
    }
    triggerSyncEvent(data) {
      const {
        syncId
      } = this.props;
      if (!(0, _FnUtils._isNil)(syncId)) {
        _Events.eventCenter.emit(_Events.SYNC_EVENT, syncId, this.uniqueChartId, data);
      }
    }
    applySyncEvent(data) {
      const {
        layout,
        syncMethod
      } = this.props;
      const {
        updateId
      } = this.state;
      const {
        dataStartIndex,
        dataEndIndex
      } = data;
      if (!(0, _FnUtils._isNil)(data.dataStartIndex) || !(0, _FnUtils._isNil)(data.dataEndIndex)) {
        this.setState({
          dataStartIndex,
          dataEndIndex,
          ...updateStateOfAxisMapsOffsetAndStackGroups({
            props: this.props,
            dataStartIndex,
            dataEndIndex,
            updateId
          }, this.state)
        });
      } else if (!(0, _FnUtils._isNil)(data.activeTooltipIndex)) {
        const {
          chartX,
          chartY
        } = data;
        let {
          activeTooltipIndex
        } = data;
        const {
          offset,
          tooltipTicks
        } = this.state;
        if (!offset) {
          return;
        }
        if (typeof syncMethod === 'function') {
          // Call a callback function. If there is an application specific algorithm
          activeTooltipIndex = syncMethod(tooltipTicks, data);
        } else if (syncMethod === 'value') {
          // Set activeTooltipIndex to the index with the same value as data.activeLabel
          // For loop instead of findIndex because the latter is very slow in some browsers
          activeTooltipIndex = -1; // in case we cannot find the element
          for (let i = 0; i < tooltipTicks.length; i++) {
            if (tooltipTicks[i].value === data.activeLabel) {
              activeTooltipIndex = i;
              break;
            }
          }
        }
        const viewBox = {
          ...offset,
          x: offset.left,
          y: offset.top
        };
        // When a categorical chart is combined with another chart, the value of chartX
        // and chartY may beyond the boundaries.
        const validateChartX = Math.min(chartX, viewBox.x + viewBox.width);
        const validateChartY = Math.min(chartY, viewBox.y + viewBox.height);
        const activeLabel = tooltipTicks[activeTooltipIndex] && tooltipTicks[activeTooltipIndex].value;
        const activePayload = (0, _getTooltipContent.getTooltipContent)(this.state, this.props.data, activeTooltipIndex);
        const activeCoordinate = tooltipTicks[activeTooltipIndex] ? {
          x: (0, _ChartUtils.isLayoutHorizontal)(layout) ? tooltipTicks[activeTooltipIndex].coordinate : validateChartX,
          y: (0, _ChartUtils.isLayoutHorizontal)(layout) ? validateChartY : tooltipTicks[activeTooltipIndex].coordinate
        } : _chartFn.originCoordinate;
        this.setState({
          ...data,
          activeLabel,
          activeCoordinate,
          activePayload,
          activeTooltipIndex
        });
      } else {
        this.setState(data);
      }
    }

    /**
     * Draw axis
     * @param {Object} axisOptions The options of axis
     * @param {Object} element      The axis element
     * @param {String} displayName  The display name of axis
     * @param {Number} index        The index of element
     * @return {ReactElement}       The instance of x-axes
     */
    renderAxis(axisOptions, element, displayName, index) {
      const {
          width,
          height
        } = this.props,
        {
          axisType,
          className
        } = axisOptions;
      return /*#__PURE__*/(0, _react.createElement)(_CartesianAxis.CartesianAxis, {
        ...axisOptions,
        key: element.key || displayName + "-" + index,
        className: (0, _crCn.default)((0, _CL.crAxisCl)(axisType), className),
        viewBox: {
          x: 0,
          y: 0,
          width,
          height
        },
        ticksGenerator: this.axesTicksGenerator
      });
    }
    getXScales() {
      const {
        xAxisMap
      } = this.state;
      return xAxisMap ? Object.entries(xAxisMap).reduce((res, _ref5) => {
        let [axisId, axisProps] = _ref5;
        return {
          ...res,
          [axisId]: axisProps.scale
        };
      }, {}) : null;
    }
    getYScales() {
      const {
        yAxisMap
      } = this.state;
      return yAxisMap ? Object.entries(yAxisMap).reduce((res, _ref6) => {
        let [axisId, axisProps] = _ref6;
        return {
          ...res,
          [axisId]: axisProps.scale
        };
      }, {}) : null;
    }
    getXScaleByAxisId(axisId) {
      var _this$state$xAxisMap, _this$state$xAxisMap$;
      return (_this$state$xAxisMap = this.state.xAxisMap) == null ? void 0 : (_this$state$xAxisMap$ = _this$state$xAxisMap[axisId]) == null ? void 0 : _this$state$xAxisMap$.scale;
    }
    getYScaleByAxisId(axisId) {
      var _this$state$yAxisMap, _this$state$yAxisMap$;
      return (_this$state$yAxisMap = this.state.yAxisMap) == null ? void 0 : (_this$state$yAxisMap$ = _this$state$yAxisMap[axisId]) == null ? void 0 : _this$state$yAxisMap$.scale;
    }
    getItemByXY(chartXY) {
      const {
        formattedGraphicalItems
      } = this.state;
      if (formattedGraphicalItems && formattedGraphicalItems.length) {
        for (let i = 0, len = formattedGraphicalItems.length; i < len; i++) {
          const graphicalItem = formattedGraphicalItems[i],
            {
              props,
              item
            } = graphicalItem,
            itemDisplayName = (0, _ReactUtils.getDisplayName)(item.type);
          if (itemDisplayName === 'Bar') {
            const activeBarItem = (props.data || []).find(entry => (0, _RectangleFn.isInRectangle)(chartXY, entry));
            if (activeBarItem) {
              return {
                graphicalItem,
                payload: activeBarItem
              };
            }
          }
        }
      }
      return null;
    }
    render() {
      if (!(0, _ReactUtils.validateWidthHeight)(this)) {
        return null;
      }
      const {
          className,
          width,
          height,
          style,
          compact,
          title,
          desc,
          ...others
        } = this.props,
        attrs = (0, _ReactUtils.filterProps)(others);

      // The "compact" mode is mainly used as the panorama within Brush
      if (compact) {
        return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Surface.Surface, {
          ...attrs,
          width: width,
          height: height,
          title: title,
          desc: desc,
          children: [(0, _renderClipPath.renderClipPath)(this), (0, _ReactUtils.renderByMap)(this, _renderFn.renderMap)]
        });
      }
      if (this.props.accessibilityLayer) {
        var _, _img;
        // Set tabIndex to 0 by default (can be overwritten)
        attrs.tabIndex = (_ = 0) != null ? _ : this.props.tabIndex;
        // Set role to img by default (can be overwritten)
        attrs.role = (_img = 'img') != null ? _img : this.props.role;
        attrs.onKeyDown = e => {
          this.accessibilityManager.keyboardEvent(e);
          // 'onKeyDown' is not currently a supported prop that can be passed through
          // if it's added, this should be added: this.props.onKeyDown(e);
        };

        attrs.onFocus = () => {
          this.accessibilityManager.focus();
          // 'onFocus' is not currently a supported prop that can be passed through
          // if it's added, the focus event should be forwarded to the prop
        };
      }

      const events = this.parseEventsOfWrapper();
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: (0, _crCn.default)(_CL.CL_WRAPPER, className),
        style: {
          position: 'relative',
          cursor: 'default',
          width,
          height,
          ...style
        },
        ...events,
        ref: node => {
          this.container = node;
        },
        role: "region",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_Surface.Surface, {
          ...attrs,
          width: width,
          height: height,
          title: title,
          desc: desc,
          children: [(0, _renderClipPath.renderClipPath)(this), (0, _ReactUtils.renderByMap)(this, _renderFn.renderMap)]
        }), (0, _renderLegend.renderLegend)(this, legendContent), (0, _renderTooltip.renderTooltip)(this)]
      });
    }
  }, _class.displayName = chartName, _class.defaultProps = {
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
    syncMethod: 'index',
    ...defaultProps
  }, _class.getDerivedStateFromProps = (0, _fGetDerivedStateFromProps.fGetDerivedStateFromProps)(updateStateOfAxisMapsOffsetAndStackGroups), _class;
};
exports.generateCategoricalChart = generateCategoricalChart;
//# sourceMappingURL=generateCategoricalChart.js.map