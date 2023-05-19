"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.generateCategoricalChart = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _extends4 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var _uiApi = require("../../uiApi");
var _classnames = _interopRequireDefault(require("classnames"));
var _throttle2 = _interopRequireDefault(require("lodash/throttle"));
var _FnUtils = require("../util/FnUtils");
var _getTicks = require("../cartesian/getTicks");
var _CartesianAxis = require("../cartesian/CartesianAxis");
var _Surface = require("../container/Surface");
var _Tooltip = require("../component/Tooltip");
var _Rectangle = require("../shape/Rectangle");
var _ReactUtils = require("../util/ReactUtils");
var _DOMUtils = require("../util/DOMUtils");
var _DataUtils = require("../util/DataUtils");
var _ChartUtils = require("../util/ChartUtils");
var _PolarUtils = require("../util/PolarUtils");
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
var _react = require("react");
var _jsxRuntime = require("react/jsx-runtime");
var _excluded = ["className", "width", "height", "style", "compact", "title", "desc"];
var _inRange = function _inRange(x, y, props, state) {
  var layout = props.layout;
  if ((0, _chartFn.isLayoutHorizontal)(layout) || (0, _chartFn.isLayoutVertical)(layout)) {
    var offset = state.offset,
      isInRange = x >= offset.left && x <= offset.left + offset.width && y >= offset.top && y <= offset.top + offset.height;
    return isInRange ? {
      x: x,
      y: y
    } : null;
  }
  var angleAxisMap = state.angleAxisMap,
    radiusAxisMap = state.radiusAxisMap;
  if (angleAxisMap && radiusAxisMap) {
    var angleAxis = (0, _DataUtils.getAnyElementOfObject)(angleAxisMap);
    return (0, _PolarUtils.inRangeOfSector)({
      x: x,
      y: y
    }, angleAxis);
  }
  return null;
};
var generateCategoricalChart = function generateCategoricalChart(_ref) {
  var _class;
  var chartName = _ref.chartName,
    GraphicalChild = _ref.GraphicalChild,
    _ref$defaultTooltipEv = _ref.defaultTooltipEventType,
    defaultTooltipEventType = _ref$defaultTooltipEv === void 0 ? 'axis' : _ref$defaultTooltipEv,
    _ref$validateTooltipE = _ref.validateTooltipEventTypes,
    validateTooltipEventTypes = _ref$validateTooltipE === void 0 ? ['axis'] : _ref$validateTooltipE,
    axisComponents = _ref.axisComponents,
    legendContent = _ref.legendContent,
    formatAxisMap = _ref.formatAxisMap,
    defaultProps = _ref.defaultProps;
  var updateStateOfAxisMapsOffsetAndStackGroups = (0, _fUpdateStateOfAxisOffsetAndStackGroups.fUpdateStateOfAxisMapsOffsetAndStackGroups)(chartName, GraphicalChild, axisComponents, formatAxisMap);
  return _class = /*#__PURE__*/function (_Component) {
    (0, _inheritsLoose2["default"])(CategoricalChartWrapper, _Component);
    // todo join specific chart propTypes

    function CategoricalChartWrapper(props) {
      var _this;
      _this = _Component.call(this, props) || this;
      _this._chartName = chartName;
      _this.accessibilityManager = new _AccessibilityManager.AccessibilityManager();
      _this.clearDeferId = function () {
        if (!(0, _FnUtils._isNil)(_this.deferId) && _generateCategoricalChartFn.deferClear) {
          (0, _generateCategoricalChartFn.deferClear)(_this.deferId);
        }
        _this.deferId = null;
      };
      _this.axesTicksGenerator = function (axis) {
        return (0, _ChartUtils.getTicksOfAxis)(axis, true);
      };
      _this.verticalCoordinatesGenerator = function (_ref2) {
        var xAxis = _ref2.xAxis,
          width = _ref2.width,
          height = _ref2.height,
          offset = _ref2.offset;
        return (0, _ChartUtils.getCoordinatesOfGrid)((0, _getTicks.getTicks)((0, _extends4["default"])({}, _CartesianAxis.CartesianAxis.defaultProps, xAxis, {
          ticks: (0, _ChartUtils.getTicksOfAxis)(xAxis, true),
          viewBox: {
            x: 0,
            y: 0,
            width: width,
            height: height
          }
        })), offset.left, offset.left + offset.width);
      };
      _this.horizontalCoordinatesGenerator = function (_ref3) {
        var yAxis = _ref3.yAxis,
          width = _ref3.width,
          height = _ref3.height,
          offset = _ref3.offset;
        return (0, _ChartUtils.getCoordinatesOfGrid)((0, _getTicks.getTicks)((0, _extends4["default"])({}, _CartesianAxis.CartesianAxis.defaultProps, yAxis, {
          ticks: (0, _ChartUtils.getTicksOfAxis)(yAxis, true),
          viewBox: {
            x: 0,
            y: 0,
            width: width,
            height: height
          }
        })), offset.top, offset.top + offset.height);
      };
      _this.handleLegendBBoxUpdate = function (box) {
        if (box) {
          var _this$state = _this.state,
            dataStartIndex = _this$state.dataStartIndex,
            dataEndIndex = _this$state.dataEndIndex,
            updateId = _this$state.updateId;
          _this.setState((0, _extends4["default"])({
            legendBBox: box
          }, updateStateOfAxisMapsOffsetAndStackGroups({
            props: _this.props,
            dataStartIndex: dataStartIndex,
            dataEndIndex: dataEndIndex,
            updateId: updateId
          }, (0, _extends4["default"])({}, _this.state, {
            legendBBox: box
          }))));
        }
      };
      _this.handleReceiveSyncEvent = function (cId, chartId, data) {
        var syncId = _this.props.syncId;
        if (syncId === cId && chartId !== _this.uniqueChartId) {
          _this.clearDeferId();
          _this.deferId = _generateCategoricalChartFn.defer && (0, _generateCategoricalChartFn.defer)(_this.applySyncEvent.bind((0, _assertThisInitialized2["default"])(_this), data));
        }
      };
      _this.handleBrushChange = function (_ref4) {
        var startIndex = _ref4.startIndex,
          endIndex = _ref4.endIndex;
        // Only trigger changes if the extents of the brush have actually changed
        if (startIndex !== _this.state.dataStartIndex || endIndex !== _this.state.dataEndIndex) {
          var updateId = _this.state.updateId;
          _this.setState(function () {
            return (0, _extends4["default"])({
              dataStartIndex: startIndex,
              dataEndIndex: endIndex
            }, updateStateOfAxisMapsOffsetAndStackGroups({
              props: _this.props,
              dataStartIndex: startIndex,
              dataEndIndex: endIndex,
              updateId: updateId
            }, _this.state));
          });
          _this.triggerSyncEvent({
            dataStartIndex: startIndex,
            dataEndIndex: endIndex
          });
        }
      };
      _this.handleMouseEnter = function (e) {
        var onMouseEnter = _this.props.onMouseEnter,
          mouse = _this.getMouseInfo(e);
        if (mouse) {
          var nextState = (0, _extends4["default"])({}, mouse, {
            isTooltipActive: true
          });
          _this.setState(nextState);
          _this.triggerSyncEvent(nextState);
          if ((0, _FnUtils._isFn)(onMouseEnter)) {
            onMouseEnter(nextState, e);
          }
        }
      };
      _this.triggeredAfterMouseMove = function (e) {
        var onMouseMove = _this.props.onMouseMove,
          mouse = _this.getMouseInfo(e),
          nextState = mouse ? (0, _extends4["default"])({}, mouse, {
            isTooltipActive: true
          }) : {
            isTooltipActive: false
          };
        _this.setState(nextState);
        _this.triggerSyncEvent(nextState);
        if ((0, _FnUtils._isFn)(onMouseMove)) {
          onMouseMove(nextState, e);
        }
      };
      _this.handleItemMouseEnter = function (el) {
        _this.setState(function () {
          return {
            isTooltipActive: true,
            activeItem: el,
            activePayload: el.tooltipPayload,
            activeCoordinate: el.tooltipPosition || {
              x: el.cx,
              y: el.cy
            }
          };
        });
      };
      _this.handleItemMouseLeave = function () {
        _this.setState(function () {
          return {
            isTooltipActive: false
          };
        });
      };
      _this.handleMouseMove = function (e) {
        if (e && (0, _FnUtils._isFn)(e.persist)) {
          e.persist();
        }
        _this.triggeredAfterMouseMove(e);
      };
      _this.handleMouseLeave = function (e) {
        var onMouseLeave = _this.props.onMouseLeave,
          nextState = {
            isTooltipActive: false
          };
        _this.setState(nextState);
        _this.triggerSyncEvent(nextState);
        if ((0, _FnUtils._isFn)(onMouseLeave)) {
          onMouseLeave(nextState, e);
        }
        _this.cancelThrottledTriggerAfterMouseMove();
      };
      _this.handleOuterEvent = function (e) {
        var eventName = (0, _ReactUtils.getReactEventByType)(e),
          event = (0, _FnUtils._getByPropName)(_this.props, "" + eventName);
        if (eventName && (0, _FnUtils._isFn)(event)) {
          var mouse = /.*touch.*/i.test(eventName) ? _this.getMouseInfo(e.changedTouches[0]) : _this.getMouseInfo(e);
          // handler event case;
          event(mouse, e);
        }
      };
      _this.handleClick = function (e) {
        var onClick = _this.props.onClick,
          mouse = _this.getMouseInfo(e);
        if (mouse) {
          var nextState = (0, _extends4["default"])({}, mouse, {
            isTooltipActive: true
          });
          _this.setState(nextState);
          _this.triggerSyncEvent(nextState);
          if ((0, _FnUtils._isFn)(onClick)) {
            onClick(nextState, e);
          }
        }
      };
      _this.handleMouseDown = function (e) {
        var onMouseDown = _this.props.onMouseDown;
        if ((0, _FnUtils._isFn)(onMouseDown)) {
          var nextState = _this.getMouseInfo(e);
          onMouseDown(nextState, e);
        }
      };
      _this.handleMouseUp = function (e) {
        var onMouseUp = _this.props.onMouseUp;
        if ((0, _FnUtils._isFn)(onMouseUp)) {
          var nextState = _this.getMouseInfo(e);
          onMouseUp(nextState, e);
        }
      };
      _this.handleTouchMove = function (e) {
        if (e.changedTouches != null && e.changedTouches.length > 0) {
          _this.handleMouseMove(e.changedTouches[0]);
        }
      };
      _this.handleTouchStart = function (e) {
        if (e.changedTouches != null && e.changedTouches.length > 0) {
          _this.handleMouseDown(e.changedTouches[0]);
        }
      };
      _this.handleTouchEnd = function (e) {
        if (e.changedTouches != null && e.changedTouches.length > 0) {
          _this.handleMouseUp(e.changedTouches[0]);
        }
      };
      _this._refLegend = function (legend) {
        _this.legendInstance = legend;
      };
      _this.uniqueChartId = (0, _FnUtils._isNil)(props.id) ? (0, _DataUtils.uniqueId)('recharts') : props.id;
      _this.clipPathId = _this.uniqueChartId + "-clip";
      if (props.throttleDelay) {
        _this.triggeredAfterMouseMove = (0, _throttle2["default"])(_this.triggeredAfterMouseMove, props.throttleDelay);
      }
      _this.state = {};
      return _this;
    }
    var _proto = CategoricalChartWrapper.prototype;
    _proto.componentDidMount = function componentDidMount() {
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
    };
    _proto.getSnapshotBeforeUpdate = function getSnapshotBeforeUpdate(prevProps, prevState) {
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
    };
    _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
      // add syncId
      if ((0, _FnUtils._isNil)(prevProps.syncId) && !(0, _FnUtils._isNil)(this.props.syncId)) {
        this.addListener();
      }
      // remove syncId
      if (!(0, _FnUtils._isNil)(prevProps.syncId) && (0, _FnUtils._isNil)(this.props.syncId)) {
        this.removeListener();
      }
    };
    _proto.componentWillUnmount = function componentWillUnmount() {
      this.clearDeferId();
      if (!(0, _FnUtils._isNil)(this.props.syncId)) {
        this.removeListener();
      }
      this.cancelThrottledTriggerAfterMouseMove();
    };
    _proto.cancelThrottledTriggerAfterMouseMove = function cancelThrottledTriggerAfterMouseMove() {
      if (typeof this.triggeredAfterMouseMove.cancel === 'function') {
        this.triggeredAfterMouseMove.cancel();
      }
    };
    _proto.getTooltipEventType = function getTooltipEventType() {
      var tooltipItem = (0, _ReactUtils.findChildByType)(this.props.children, _Tooltip.Tooltip);
      if (tooltipItem && (0, _FnUtils._isBool)(tooltipItem.props.shared)) {
        var eventType = tooltipItem.props.shared ? 'axis' : 'item';
        return validateTooltipEventTypes.indexOf(eventType) >= 0 ? eventType : defaultTooltipEventType;
      }
      return defaultTooltipEventType;
    }

    /**
     * Get the information of mouse in chart, return null when the mouse is not in the chart
     * @param  {Object} event    The event object
     * @return {Object}          Mouse data
     */;
    _proto.getMouseInfo = function getMouseInfo(event) {
      if (!this.container) {
        return null;
      }
      var containerOffset = (0, _DOMUtils.getOffset)(this.container),
        e = (0, _DOMUtils.calculateChartCoordinate)(event, containerOffset),
        rangeObj = _inRange(e.chartX, e.chartY, this.props, this.state);
      if (!rangeObj) {
        return null;
      }
      var _this$state2 = this.state,
        xAxisMap = _this$state2.xAxisMap,
        yAxisMap = _this$state2.yAxisMap;
      var tooltipEventType = this.getTooltipEventType();
      if (tooltipEventType !== 'axis' && xAxisMap && yAxisMap) {
        var xScale = (0, _DataUtils.getAnyElementOfObject)(xAxisMap).scale;
        var yScale = (0, _DataUtils.getAnyElementOfObject)(yAxisMap).scale;
        var xValue = xScale && xScale.invert ? xScale.invert(e.chartX) : null;
        var yValue = yScale && yScale.invert ? yScale.invert(e.chartY) : null;
        return (0, _extends4["default"])({}, e, {
          xValue: xValue,
          yValue: yValue
        });
      }
      var toolTipData = (0, _generateCategoricalChartFn.getTooltipData)(this.state, this.props.data, this.props.layout, rangeObj);
      if (toolTipData) {
        return (0, _extends4["default"])({}, e, toolTipData);
      }
      return null;
    };
    _proto.getCursorRectangle = function getCursorRectangle() {
      var layout = this.props.layout,
        _this$state3 = this.state,
        activeCoordinate = _this$state3.activeCoordinate,
        offset = _this$state3.offset,
        tooltipAxisBandSize = _this$state3.tooltipAxisBandSize,
        halfSize = tooltipAxisBandSize / 2,
        _isLayoutHorizontal = (0, _chartFn.isLayoutHorizontal)(layout);
      return {
        stroke: 'none',
        fill: '#ccc',
        x: _isLayoutHorizontal ? activeCoordinate.x - halfSize : offset.left + 0.5,
        y: _isLayoutHorizontal ? offset.top + 0.5 : activeCoordinate.y - halfSize,
        width: _isLayoutHorizontal ? tooltipAxisBandSize : offset.width - 1,
        height: _isLayoutHorizontal ? offset.height - 1 : tooltipAxisBandSize
      };
    };
    _proto.getCursorPoints = function getCursorPoints() {
      var layout = this.props.layout;
      var _this$state4 = this.state,
        activeCoordinate = _this$state4.activeCoordinate,
        offset = _this$state4.offset;
      var x1, y1, x2, y2;
      if ((0, _chartFn.isLayoutHorizontal)(layout)) {
        x1 = activeCoordinate.x;
        x2 = x1;
        y1 = offset.top;
        y2 = offset.top + offset.height;
      } else if ((0, _chartFn.isLayoutVertical)(layout)) {
        y1 = activeCoordinate.y;
        y2 = y1;
        x1 = offset.left;
        x2 = offset.left + offset.width;
      } else if (!(0, _FnUtils._isNil)(activeCoordinate.cx) || !(0, _FnUtils._isNil)(activeCoordinate.cy)) {
        if ((0, _chartFn.isLayoutCentric)(layout)) {
          var cx = activeCoordinate.cx,
            cy = activeCoordinate.cy,
            innerRadius = activeCoordinate.innerRadius,
            outerRadius = activeCoordinate.outerRadius,
            angle = activeCoordinate.angle;
          var innerPoint = (0, _PolarUtils.polarToCartesian)(cx, cy, innerRadius, angle);
          var outerPoint = (0, _PolarUtils.polarToCartesian)(cx, cy, outerRadius, angle);
          x1 = innerPoint.x;
          y1 = innerPoint.y;
          x2 = outerPoint.x;
          y2 = outerPoint.y;
        } else {
          var _cx = activeCoordinate.cx,
            _cy = activeCoordinate.cy,
            radius = activeCoordinate.radius,
            startAngle = activeCoordinate.startAngle,
            endAngle = activeCoordinate.endAngle;
          var startPoint = (0, _PolarUtils.polarToCartesian)(_cx, _cy, radius, startAngle);
          var endPoint = (0, _PolarUtils.polarToCartesian)(_cx, _cy, radius, endAngle);
          return {
            points: [startPoint, endPoint],
            cx: _cx,
            cy: _cy,
            radius: radius,
            startAngle: startAngle,
            endAngle: endAngle
          };
        }
      }
      return [{
        x: x1,
        y: y1
      }, {
        x: x2,
        y: y2
      }];
    };
    _proto.parseEventsOfWrapper = function parseEventsOfWrapper() {
      var children = this.props.children,
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
      return (0, _extends4["default"])({}, outerEvents, tooltipEvents);
    };
    _proto.addListener = function addListener() {
      _Events.eventCenter.on(_Events.SYNC_EVENT, this.handleReceiveSyncEvent);
      if (_Events.eventCenter.setMaxListeners && _Events.eventCenter._maxListeners) {
        _Events.eventCenter.setMaxListeners(_Events.eventCenter._maxListeners + 1);
      }
    };
    _proto.removeListener = function removeListener() {
      _Events.eventCenter.removeListener(_Events.SYNC_EVENT, this.handleReceiveSyncEvent);
      if (_Events.eventCenter.setMaxListeners && _Events.eventCenter._maxListeners) {
        _Events.eventCenter.setMaxListeners(_Events.eventCenter._maxListeners - 1);
      }
    };
    _proto.triggerSyncEvent = function triggerSyncEvent(data) {
      var syncId = this.props.syncId;
      if (!(0, _FnUtils._isNil)(syncId)) {
        _Events.eventCenter.emit(_Events.SYNC_EVENT, syncId, this.uniqueChartId, data);
      }
    };
    _proto.applySyncEvent = function applySyncEvent(data) {
      var _this$props = this.props,
        layout = _this$props.layout,
        syncMethod = _this$props.syncMethod;
      var updateId = this.state.updateId;
      var dataStartIndex = data.dataStartIndex,
        dataEndIndex = data.dataEndIndex;
      if (!(0, _FnUtils._isNil)(data.dataStartIndex) || !(0, _FnUtils._isNil)(data.dataEndIndex)) {
        this.setState((0, _extends4["default"])({
          dataStartIndex: dataStartIndex,
          dataEndIndex: dataEndIndex
        }, updateStateOfAxisMapsOffsetAndStackGroups({
          props: this.props,
          dataStartIndex: dataStartIndex,
          dataEndIndex: dataEndIndex,
          updateId: updateId
        }, this.state)));
      } else if (!(0, _FnUtils._isNil)(data.activeTooltipIndex)) {
        var chartX = data.chartX,
          chartY = data.chartY;
        var activeTooltipIndex = data.activeTooltipIndex;
        var _this$state5 = this.state,
          offset = _this$state5.offset,
          tooltipTicks = _this$state5.tooltipTicks;
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
          for (var i = 0; i < tooltipTicks.length; i++) {
            if (tooltipTicks[i].value === data.activeLabel) {
              activeTooltipIndex = i;
              break;
            }
          }
        }
        var viewBox = (0, _extends4["default"])({}, offset, {
          x: offset.left,
          y: offset.top
        });
        // When a categorical chart is combined with another chart, the value of chartX
        // and chartY may beyond the boundaries.
        var validateChartX = Math.min(chartX, viewBox.x + viewBox.width);
        var validateChartY = Math.min(chartY, viewBox.y + viewBox.height);
        var activeLabel = tooltipTicks[activeTooltipIndex] && tooltipTicks[activeTooltipIndex].value;
        var activePayload = (0, _getTooltipContent.getTooltipContent)(this.state, this.props.data, activeTooltipIndex);
        var activeCoordinate = tooltipTicks[activeTooltipIndex] ? {
          x: (0, _chartFn.isLayoutHorizontal)(layout) ? tooltipTicks[activeTooltipIndex].coordinate : validateChartX,
          y: (0, _chartFn.isLayoutHorizontal)(layout) ? validateChartY : tooltipTicks[activeTooltipIndex].coordinate
        } : _chartFn.originCoordinate;
        this.setState((0, _extends4["default"])({}, data, {
          activeLabel: activeLabel,
          activeCoordinate: activeCoordinate,
          activePayload: activePayload,
          activeTooltipIndex: activeTooltipIndex
        }));
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
     */;
    _proto.renderAxis = function renderAxis(axisOptions, element, displayName, index) {
      var _this$props2 = this.props,
        width = _this$props2.width,
        height = _this$props2.height;
      return /*#__PURE__*/(0, _react.createElement)(_CartesianAxis.CartesianAxis, (0, _extends4["default"])({}, axisOptions, {
        key: element.key || displayName + "-" + index,
        className: "recharts-" + axisOptions.axisType + " " + axisOptions.axisType,
        viewBox: {
          x: 0,
          y: 0,
          width: width,
          height: height
        },
        ticksGenerator: this.axesTicksGenerator
      }));
    };
    _proto.getXScales = function getXScales() {
      var xAxisMap = this.state.xAxisMap;
      return xAxisMap ? Object.entries(xAxisMap).reduce(function (res, _ref5) {
        var _extends2;
        var axisId = _ref5[0],
          axisProps = _ref5[1];
        return (0, _extends4["default"])({}, res, (_extends2 = {}, _extends2[axisId] = axisProps.scale, _extends2));
      }, {}) : null;
    };
    _proto.getYScales = function getYScales() {
      var yAxisMap = this.state.yAxisMap;
      return yAxisMap ? Object.entries(yAxisMap).reduce(function (res, _ref6) {
        var _extends3;
        var axisId = _ref6[0],
          axisProps = _ref6[1];
        return (0, _extends4["default"])({}, res, (_extends3 = {}, _extends3[axisId] = axisProps.scale, _extends3));
      }, {}) : null;
    };
    _proto.getXScaleByAxisId = function getXScaleByAxisId(axisId) {
      var _this$state$xAxisMap, _this$state$xAxisMap$;
      return (_this$state$xAxisMap = this.state.xAxisMap) == null ? void 0 : (_this$state$xAxisMap$ = _this$state$xAxisMap[axisId]) == null ? void 0 : _this$state$xAxisMap$.scale;
    };
    _proto.getYScaleByAxisId = function getYScaleByAxisId(axisId) {
      var _this$state$yAxisMap, _this$state$yAxisMap$;
      return (_this$state$yAxisMap = this.state.yAxisMap) == null ? void 0 : (_this$state$yAxisMap$ = _this$state$yAxisMap[axisId]) == null ? void 0 : _this$state$yAxisMap$.scale;
    };
    _proto.getItemByXY = function getItemByXY(chartXY) {
      var formattedGraphicalItems = this.state.formattedGraphicalItems;
      if (formattedGraphicalItems && formattedGraphicalItems.length) {
        for (var i = 0, len = formattedGraphicalItems.length; i < len; i++) {
          var graphicalItem = formattedGraphicalItems[i],
            props = graphicalItem.props,
            item = graphicalItem.item,
            itemDisplayName = (0, _ReactUtils.getDisplayName)(item.type);
          if (itemDisplayName === 'Bar') {
            var activeBarItem = (props.data || []).find(function (entry) {
              return (0, _Rectangle.isInRectangle)(chartXY, entry);
            });
            if (activeBarItem) {
              return {
                graphicalItem: graphicalItem,
                payload: activeBarItem
              };
            }
          } else if (itemDisplayName === 'RadialBar') {
            var _activeBarItem = (props.data || []).find(function (entry) {
              return (0, _PolarUtils.inRangeOfSector)(chartXY, entry);
            });
            if (_activeBarItem) {
              return {
                graphicalItem: graphicalItem,
                payload: _activeBarItem
              };
            }
          }
        }
      }
      return null;
    };
    _proto.render = function render() {
      var _this2 = this;
      if (!(0, _ReactUtils.validateWidthHeight)(this)) {
        return null;
      }
      var _this$props3 = this.props,
        className = _this$props3.className,
        width = _this$props3.width,
        height = _this$props3.height,
        style = _this$props3.style,
        compact = _this$props3.compact,
        title = _this$props3.title,
        desc = _this$props3.desc,
        others = (0, _objectWithoutPropertiesLoose2["default"])(_this$props3, _excluded),
        attrs = (0, _ReactUtils.filterProps)(others);

      // The "compact" mode is mainly used as the panorama within Brush
      if (compact) {
        return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Surface.Surface, (0, _extends4["default"])({}, attrs, {
          width: width,
          height: height,
          title: title,
          desc: desc,
          children: [(0, _renderClipPath.renderClipPath)(this), (0, _ReactUtils.renderByMap)(this, _renderFn.renderMap)]
        }));
      }
      if (this.props.accessibilityLayer) {
        var _, _img;
        // Set tabIndex to 0 by default (can be overwritten)
        attrs.tabIndex = (_ = 0) != null ? _ : this.props.tabIndex;
        // Set role to img by default (can be overwritten)
        attrs.role = (_img = 'img') != null ? _img : this.props.role;
        attrs.onKeyDown = function (e) {
          _this2.accessibilityManager.keyboardEvent(e);
          // 'onKeyDown' is not currently a supported prop that can be passed through
          // if it's added, this should be added: this.props.onKeyDown(e);
        };

        attrs.onFocus = function () {
          _this2.accessibilityManager.focus();
          // 'onFocus' is not currently a supported prop that can be passed through
          // if it's added, the focus event should be forwarded to the prop
        };
      }

      var events = this.parseEventsOfWrapper();
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", (0, _extends4["default"])({
        className: (0, _classnames["default"])('recharts-wrapper', className),
        style: (0, _extends4["default"])({
          position: 'relative',
          cursor: 'default',
          width: width,
          height: height
        }, style)
      }, events, {
        ref: function ref(node) {
          _this2.container = node;
        },
        role: "region",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_Surface.Surface, (0, _extends4["default"])({}, attrs, {
          width: width,
          height: height,
          title: title,
          desc: desc,
          children: [(0, _renderClipPath.renderClipPath)(this), (0, _ReactUtils.renderByMap)(this, _renderFn.renderMap)]
        })), (0, _renderLegend.renderLegend)(this, legendContent), (0, _renderTooltip.renderTooltip)(this)]
      }));
    };
    return CategoricalChartWrapper;
  }(_uiApi.Component), _class.displayName = chartName, _class.defaultProps = (0, _extends4["default"])({
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
  }, defaultProps), _class.getDerivedStateFromProps = (0, _fGetDerivedStateFromProps.fGetDerivedStateFromProps)(updateStateOfAxisMapsOffsetAndStackGroups), _class;
};
exports.generateCategoricalChart = generateCategoricalChart;
//# sourceMappingURL=generateCategoricalChart.js.map