"use strict";

exports.__esModule = true;
exports.generateCategoricalChart = void 0;
var _uiApi = require("../../uiApi");
var _styleFn = require("../../styleFn");
var _FnUtils = require("../util/FnUtils");
var _Surface = require("../container/Surface");
var _Tooltip = require("../component/Tooltip");
var _ReactUtils = require("../util/ReactUtils");
var _DOMUtils = require("../util/DOMUtils");
var _DataUtils = require("../util/DataUtils");
var _ChartUtils = require("../util/ChartUtils");
var _types = require("../util/types");
var _AccessibilityManager = require("./AccessibilityManager");
var _fUpdateStateOfAxisOffsetAndStackGroups = require("./fUpdateStateOfAxisOffsetAndStackGroups");
var _generateCategoricalChartFn = require("./generateCategoricalChartFn");
var _fGetDerivedStateFromProps = require("./fGetDerivedStateFromProps");
var _renderFn = require("./renderFn");
var _renderLegend = require("./renderLegend");
var _renderTooltip = require("./renderTooltip");
var _renderClipPath = require("./renderClipPath");
var _CL = require("../CL");
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
  return class CategoricalChartWrapper extends _uiApi.Component {
    static displayName = (() => chartName)();
    // todo join specific chart propTypes
    static defaultProps = {
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
    };
    static getDerivedStateFromProps = (() => (0, _fGetDerivedStateFromProps.fGetDerivedStateFromProps)(updateStateOfAxisMapsOffsetAndStackGroups))();
    _chartName = (() => chartName)();
    accessibilityManager = (() => new _AccessibilityManager.AccessibilityManager())();
    constructor(props) {
      super(props);
      this.uniqueChartId = (0, _FnUtils._isNil)(props.id) ? (0, _DataUtils.uniqueId)('recharts') : props.id;
      this.clipPathId = `${this.uniqueChartId}-clip`;
      if (props.throttleDelay) {
        this.triggeredAfterMouseMove = (0, _FnUtils._throttle)(this.triggeredAfterMouseMove, props.throttleDelay);
      }
      this.state = {};
    }
    handleLegendBBoxUpdate = box => {
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
    handleBrushChange = _ref2 => {
      let {
        startIndex,
        endIndex
      } = _ref2;
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
      }
    };
    handleMouseEnter = e => {
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
        if ((0, _FnUtils._isFn)(onMouseEnter)) {
          onMouseEnter(nextState, e);
        }
      }
    };
    triggeredAfterMouseMove = e => {
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
      if ((0, _FnUtils._isFn)(onMouseMove)) {
        onMouseMove(nextState, e);
      }
    };
    handleItemMouseEnter = el => {
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
    handleItemMouseLeave = () => {
      this.setState(() => ({
        isTooltipActive: false
      }));
    };
    handleMouseMove = e => {
      if (e && (0, _FnUtils._isFn)(e.persist)) {
        e.persist();
      }
      this.triggeredAfterMouseMove(e);
    };
    handleMouseLeave = e => {
      const {
          onMouseLeave
        } = this.props,
        nextState = {
          isTooltipActive: false
        };
      this.setState(nextState);
      if ((0, _FnUtils._isFn)(onMouseLeave)) {
        onMouseLeave(nextState, e);
      }
      this.cancelThrottledTriggerAfterMouseMove();
    };
    handleOuterEvent = e => {
      const eventName = (0, _ReactUtils.getReactEventByType)(e),
        event = (0, _FnUtils._getByPropName)(this.props, `${eventName}`);
      if (eventName && (0, _FnUtils._isFn)(event)) {
        const mouse = /.*touch.*/i.test(eventName) ? this.getMouseInfo(e.changedTouches[0]) : this.getMouseInfo(e);
        // handler event case;
        event(mouse, e);
      }
    };
    handleClick = e => {
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
        if ((0, _FnUtils._isFn)(onClick)) {
          onClick(nextState, e);
        }
      }
    };
    handleMouseDown = e => {
      const {
        onMouseDown
      } = this.props;
      if ((0, _FnUtils._isFn)(onMouseDown)) {
        const nextState = this.getMouseInfo(e);
        onMouseDown(nextState, e);
      }
    };
    handleMouseUp = e => {
      const {
        onMouseUp
      } = this.props;
      if ((0, _FnUtils._isFn)(onMouseUp)) {
        const nextState = this.getMouseInfo(e);
        onMouseUp(nextState, e);
      }
    };
    handleTouchMove = e => {
      if (e.changedTouches != null && e.changedTouches.length > 0) {
        this.handleMouseMove(e.changedTouches[0]);
      }
    };
    handleTouchStart = e => {
      if (e.changedTouches != null && e.changedTouches.length > 0) {
        this.handleMouseDown(e.changedTouches[0]);
      }
    };
    handleTouchEnd = e => {
      if (e.changedTouches != null && e.changedTouches.length > 0) {
        this.handleMouseUp(e.changedTouches[0]);
      }
    };
    _refLegend = legend => {
      this.legendInstance = legend;
    };
    _refContainer = node => {
      this.container = node;
    };
    componentDidMount() {
      this.accessibilityManager.setDetails({
        container: this.container,
        offset: {
          left: this.props.margin.left ?? 0,
          top: this.props.margin.top ?? 0
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
        this.accessibilityManager.setDetails({
          offset: {
            left: this.props.margin.left ?? 0,
            top: this.props.margin.top ?? 0
          }
        });
      }
      // Something has to be returned for getSnapshotBeforeUpdate
      return null;
    }
    componentDidUpdate(prevProps) {
      //required for getShapshotBeforeUpdate
    }
    componentWillUnmount() {
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
        // Set tabIndex to 0 by default (can be overwritten)
        attrs.tabIndex = 0 ?? this.props.tabIndex;
        // Set role to img by default (can be overwritten)
        attrs.role = 'img' ?? this.props.role;
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
        role: "region",
        ref: this._refContainer,
        className: (0, _styleFn.crCn)(_CL.CL_WRAPPER, className),
        style: {
          position: 'relative',
          cursor: 'default',
          width,
          height,
          ...style
        },
        ...events,
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
  };
};
exports.generateCategoricalChart = generateCategoricalChart;
//# sourceMappingURL=generateCategoricalChart.js.map