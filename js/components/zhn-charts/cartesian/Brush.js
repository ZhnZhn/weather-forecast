"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.Brush = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var _uiApi = require("../../uiApi");
var _classnames = _interopRequireDefault(require("classnames"));
var _d3Scale = require("d3-scale");
var _FnUtils = require("../util/FnUtils");
var _Layer = require("../container/Layer");
var _Text = require("../component/Text");
var _ChartUtils = require("../util/ChartUtils");
var _DataUtils = require("../util/DataUtils");
var _ReactUtils = require("../util/ReactUtils");
var _jsxRuntime = require("react/jsx-runtime");
var CL_BRUSH = "recharts-brush",
  CL_BRUSH_TRAVELLER = CL_BRUSH + "-traveller",
  CL_BRUSH_SLIDE = CL_BRUSH + "-slide",
  CL_BRUSH_TEXTS = CL_BRUSH + "-texts",
  S_CURSOR_COL_RESIZE = {
    cursor: 'col-resize'
  },
  S_CURSOR_MOVE = {
    cursor: 'move'
  };
var _createScale = function _createScale(_ref) {
  var data = _ref.data,
    startIndex = _ref.startIndex,
    endIndex = _ref.endIndex,
    x = _ref.x,
    width = _ref.width,
    travellerWidth = _ref.travellerWidth;
  if (!data || !data.length) {
    return {};
  }
  var len = data.length,
    scale = (0, _d3Scale.scalePoint)().domain((0, _FnUtils._range)(0, len)).range([x, x + width - travellerWidth]),
    scaleValues = scale.domain().map(function (entry) {
      return scale(entry);
    });
  return {
    isTextActive: false,
    isSlideMoving: false,
    isTravellerMoving: false,
    startX: scale(startIndex),
    endX: scale(endIndex),
    scale: scale,
    scaleValues: scaleValues
  };
};
var _isTouchEvent = function _isTouchEvent(e) {
  return e.changedTouches && !!e.changedTouches.length;
};
var _getEvent = function _getEvent(e) {
  return _isTouchEvent(e) ? e.changedTouches[0] : e;
};
var _renderDefaultTraveller = function _renderDefaultTraveller(props) {
  var x = props.x,
    y = props.y,
    width = props.width,
    height = props.height,
    stroke = props.stroke,
    lineY = Math.floor(y + height / 2) - 1;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
      x: x,
      y: y,
      width: width,
      height: height,
      fill: stroke,
      stroke: "none"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("line", {
      x1: x + 1,
      y1: lineY,
      x2: x + width - 1,
      y2: lineY,
      fill: "none",
      stroke: "#fff"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("line", {
      x1: x + 1,
      y1: lineY + 2,
      x2: x + width - 1,
      y2: lineY + 2,
      fill: "none",
      stroke: "#fff"
    })]
  });
};
var _renderTraveller = function _renderTraveller(option, props) {
  return (0, _uiApi.isValidElement)(option) ? (0, _uiApi.cloneElement)(option, props) : (0, _FnUtils._isFn)(option) ? option(props) : _renderDefaultTraveller(props);
};
var _getIndexInRange = function _getIndexInRange(range, x) {
  var len = range.length;
  var start = 0,
    end = len - 1;
  while (end - start > 1) {
    var middle = Math.floor((start + end) / 2);
    if (range[middle] > x) {
      end = middle;
    } else {
      start = middle;
    }
  }
  return x >= range[end] ? end : start;
};
var Brush = /*#__PURE__*/function (_PureComponent) {
  (0, _inheritsLoose2["default"])(Brush, _PureComponent);
  function Brush(props) {
    var _this;
    _this = _PureComponent.call(this, props) || this;
    _this.handleDrag = function (e) {
      if (_this.leaveTimer) {
        clearTimeout(_this.leaveTimer);
        _this.leaveTimer = null;
      }
      if (_this.state.isTravellerMoving) {
        _this.handleTravellerMove(e);
      } else if (_this.state.isSlideMoving) {
        _this.handleSlideDrag(e);
      }
    };
    _this.handleTouchMove = function (e) {
      if (e.changedTouches != null && e.changedTouches.length > 0) {
        _this.handleDrag(e.changedTouches[0]);
      }
    };
    _this.handleDragEnd = function () {
      _this.setState({
        isTravellerMoving: false,
        isSlideMoving: false
      });
      _this.detachDragEndListener();
    };
    _this.handleLeaveWrapper = function () {
      if (_this.state.isTravellerMoving || _this.state.isSlideMoving) {
        _this.leaveTimer = window.setTimeout(_this.handleDragEnd, _this.props.leaveTimeOut);
      }
    };
    _this.handleEnterSlideOrTraveller = function () {
      _this.setState({
        isTextActive: true
      });
    };
    _this.handleLeaveSlideOrTraveller = function () {
      _this.setState({
        isTextActive: false
      });
    };
    _this.handleSlideDragStart = function (e) {
      var event = _getEvent(e);
      _this.setState({
        isTravellerMoving: false,
        isSlideMoving: true,
        slideMoveStartX: event.pageX
      });
      _this.attachDragEndListener();
    };
    _this.travellerDragStartHandlers = {
      startX: _this.handleTravellerDragStart.bind((0, _assertThisInitialized2["default"])(_this), 'startX'),
      endX: _this.handleTravellerDragStart.bind((0, _assertThisInitialized2["default"])(_this), 'endX')
    };
    _this.state = {};
    return _this;
  }
  Brush.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var data = nextProps.data,
      width = nextProps.width,
      x = nextProps.x,
      travellerWidth = nextProps.travellerWidth,
      updateId = nextProps.updateId,
      startIndex = nextProps.startIndex,
      endIndex = nextProps.endIndex;
    if (data !== prevState.prevData || updateId !== prevState.prevUpdateId) {
      return (0, _extends2["default"])({
        prevData: data,
        prevTravellerWidth: travellerWidth,
        prevUpdateId: updateId,
        prevX: x,
        prevWidth: width
      }, data && data.length ? _createScale({
        data: data,
        width: width,
        x: x,
        travellerWidth: travellerWidth,
        startIndex: startIndex,
        endIndex: endIndex
      }) : {
        scale: null,
        scaleValues: null
      });
    }
    if (prevState.scale && (width !== prevState.prevWidth || x !== prevState.prevX || travellerWidth !== prevState.prevTravellerWidth)) {
      prevState.scale.range([x, x + width - travellerWidth]);
      var scaleValues = prevState.scale.domain().map(function (entry) {
        return prevState.scale(entry);
      });
      return {
        prevData: data,
        prevTravellerWidth: travellerWidth,
        prevUpdateId: updateId,
        prevX: x,
        prevWidth: width,
        startX: prevState.scale(nextProps.startIndex),
        endX: prevState.scale(nextProps.endIndex),
        scaleValues: scaleValues
      };
    }
    return null;
  };
  var _proto = Brush.prototype;
  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.leaveTimer) {
      clearTimeout(this.leaveTimer);
      this.leaveTimer = null;
    }
    this.detachDragEndListener();
  };
  _proto.getIndex = function getIndex(_ref2) {
    var startX = _ref2.startX,
      endX = _ref2.endX;
    var scaleValues = this.state.scaleValues,
      _this$props = this.props,
      gap = _this$props.gap,
      data = _this$props.data,
      lastIndex = data.length - 1,
      min = Math.min(startX, endX),
      max = Math.max(startX, endX),
      minIndex = _getIndexInRange(scaleValues, min),
      maxIndex = _getIndexInRange(scaleValues, max);
    return {
      startIndex: minIndex - minIndex % gap,
      endIndex: maxIndex === lastIndex ? lastIndex : maxIndex - maxIndex % gap
    };
  };
  _proto.getTextOfTick = function getTextOfTick(index) {
    var _this$props2 = this.props,
      data = _this$props2.data,
      tickFormatter = _this$props2.tickFormatter,
      dataKey = _this$props2.dataKey,
      text = (0, _ChartUtils.getValueByDataKey)(data[index], dataKey, index);
    return (0, _FnUtils._isFn)(tickFormatter) ? tickFormatter(text, index) : text;
  };
  _proto.attachDragEndListener = function attachDragEndListener() {
    window.addEventListener('mouseup', this.handleDragEnd, true);
    window.addEventListener('touchend', this.handleDragEnd, true);
    window.addEventListener('mousemove', this.handleDrag, true);
  };
  _proto.detachDragEndListener = function detachDragEndListener() {
    window.removeEventListener('mouseup', this.handleDragEnd, true);
    window.removeEventListener('touchend', this.handleDragEnd, true);
    window.removeEventListener('mousemove', this.handleDrag, true);
  };
  _proto.handleSlideDrag = function handleSlideDrag(e) {
    var _this$state = this.state,
      slideMoveStartX = _this$state.slideMoveStartX,
      startX = _this$state.startX,
      endX = _this$state.endX,
      _this$props3 = this.props,
      x = _this$props3.x,
      width = _this$props3.width,
      travellerWidth = _this$props3.travellerWidth,
      startIndex = _this$props3.startIndex,
      endIndex = _this$props3.endIndex,
      onChange = _this$props3.onChange;
    var delta = e.pageX - slideMoveStartX;
    if (delta > 0) {
      delta = Math.min(delta, x + width - travellerWidth - endX, x + width - travellerWidth - startX);
    } else if (delta < 0) {
      delta = Math.max(delta, x - startX, x - endX);
    }
    var newIndex = this.getIndex({
      startX: startX + delta,
      endX: endX + delta
    });
    if ((newIndex.startIndex !== startIndex || newIndex.endIndex !== endIndex) && onChange) {
      onChange(newIndex);
    }
    this.setState({
      startX: startX + delta,
      endX: endX + delta,
      slideMoveStartX: e.pageX
    });
  };
  _proto.handleTravellerDragStart = function handleTravellerDragStart(id, e) {
    var event = _getEvent(e);
    this.setState({
      isSlideMoving: false,
      isTravellerMoving: true,
      movingTravellerId: id,
      brushMoveStartX: event.pageX
    });
    this.attachDragEndListener();
  };
  _proto.handleTravellerMove = function handleTravellerMove(e) {
    var _this$setState;
    var _this$state2 = this.state,
      brushMoveStartX = _this$state2.brushMoveStartX,
      movingTravellerId = _this$state2.movingTravellerId,
      endX = _this$state2.endX,
      startX = _this$state2.startX,
      prevValue = this.state[movingTravellerId],
      _this$props4 = this.props,
      x = _this$props4.x,
      width = _this$props4.width,
      travellerWidth = _this$props4.travellerWidth,
      onChange = _this$props4.onChange,
      gap = _this$props4.gap,
      data = _this$props4.data,
      params = {
        startX: this.state.startX,
        endX: this.state.endX
      };
    var delta = e.pageX - brushMoveStartX;
    if (delta > 0) {
      delta = Math.min(delta, x + width - travellerWidth - prevValue);
    } else if (delta < 0) {
      delta = Math.max(delta, x - prevValue);
    }
    params[movingTravellerId] = prevValue + delta;
    var newIndex = this.getIndex(params),
      startIndex = newIndex.startIndex,
      endIndex = newIndex.endIndex,
      isFullGap = function isFullGap() {
        var lastIndex = data.length - 1;
        return movingTravellerId === 'startX' && (endX > startX ? startIndex % gap === 0 : endIndex % gap === 0) || endX < startX && endIndex === lastIndex || movingTravellerId === 'endX' && (endX > startX ? endIndex % gap === 0 : startIndex % gap === 0) || endX > startX && endIndex === lastIndex;
      };
    this.setState((_this$setState = {}, _this$setState[movingTravellerId] = prevValue + delta, _this$setState.brushMoveStartX = e.pageX, _this$setState), function () {
      if (onChange && isFullGap()) {
        onChange(newIndex);
      }
    });
  };
  _proto.renderBackground = function renderBackground() {
    var _this$props5 = this.props,
      x = _this$props5.x,
      y = _this$props5.y,
      width = _this$props5.width,
      height = _this$props5.height,
      fill = _this$props5.fill,
      stroke = _this$props5.stroke;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
      stroke: stroke,
      fill: fill,
      x: x,
      y: y,
      width: width,
      height: height
    });
  };
  _proto.renderPanorama = function renderPanorama() {
    var _this$props6 = this.props,
      x = _this$props6.x,
      y = _this$props6.y,
      width = _this$props6.width,
      height = _this$props6.height,
      data = _this$props6.data,
      children = _this$props6.children,
      padding = _this$props6.padding,
      chartElement = _uiApi.Children.only(children);
    if (!chartElement) {
      return null;
    }
    return (0, _uiApi.cloneElement)(chartElement, {
      x: x,
      y: y,
      width: width,
      height: height,
      margin: padding,
      compact: true,
      data: data
    });
  };
  _proto.renderTravellerLayer = function renderTravellerLayer(travellerX, id) {
    var _this$props7 = this.props,
      y = _this$props7.y,
      travellerWidth = _this$props7.travellerWidth,
      height = _this$props7.height,
      traveller = _this$props7.traveller,
      x = Math.max(travellerX, this.props.x),
      travellerProps = (0, _extends2["default"])({}, (0, _ReactUtils.filterProps)(this.props), {
        x: x,
        y: y,
        width: travellerWidth,
        height: height
      });
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Layer.Layer, {
      className: CL_BRUSH_TRAVELLER,
      style: S_CURSOR_COL_RESIZE,
      onMouseEnter: this.handleEnterSlideOrTraveller,
      onMouseLeave: this.handleLeaveSlideOrTraveller,
      onMouseDown: this.travellerDragStartHandlers[id],
      onTouchStart: this.travellerDragStartHandlers[id],
      children: _renderTraveller(traveller, travellerProps)
    });
  };
  _proto.renderSlide = function renderSlide(startX, endX) {
    var _this$props8 = this.props,
      y = _this$props8.y,
      height = _this$props8.height,
      stroke = _this$props8.stroke,
      travellerWidth = _this$props8.travellerWidth,
      x = Math.min(startX, endX) + travellerWidth,
      width = Math.max(Math.abs(endX - startX) - travellerWidth, 0);
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
      className: CL_BRUSH_SLIDE,
      style: S_CURSOR_MOVE,
      stroke: "none",
      fill: stroke,
      fillOpacity: 0.2,
      x: x,
      y: y,
      width: width,
      height: height,
      onMouseEnter: this.handleEnterSlideOrTraveller,
      onMouseLeave: this.handleLeaveSlideOrTraveller,
      onMouseDown: this.handleSlideDragStart,
      onTouchStart: this.handleSlideDragStart
    });
  };
  _proto.renderText = function renderText() {
    var _this$props9 = this.props,
      startIndex = _this$props9.startIndex,
      endIndex = _this$props9.endIndex,
      y = _this$props9.y,
      height = _this$props9.height,
      travellerWidth = _this$props9.travellerWidth,
      stroke = _this$props9.stroke,
      _this$state3 = this.state,
      startX = _this$state3.startX,
      endX = _this$state3.endX,
      offset = 5,
      attrs = {
        pointerEvents: 'none',
        fill: stroke
      };
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Layer.Layer, {
      className: CL_BRUSH_TEXTS,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Text.Text, (0, _extends2["default"])({
        textAnchor: "end",
        verticalAnchor: "middle",
        x: Math.min(startX, endX) - offset,
        y: y + height / 2
      }, attrs, {
        children: this.getTextOfTick(startIndex)
      })), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Text.Text, (0, _extends2["default"])({
        textAnchor: "start",
        verticalAnchor: "middle",
        x: Math.max(startX, endX) + travellerWidth + offset,
        y: y + height / 2
      }, attrs, {
        children: this.getTextOfTick(endIndex)
      }))]
    });
  };
  _proto.render = function render() {
    var _this$props10 = this.props,
      data = _this$props10.data,
      className = _this$props10.className,
      children = _this$props10.children,
      x = _this$props10.x,
      y = _this$props10.y,
      width = _this$props10.width,
      height = _this$props10.height,
      alwaysShowText = _this$props10.alwaysShowText,
      _this$state4 = this.state,
      startX = _this$state4.startX,
      endX = _this$state4.endX,
      isTextActive = _this$state4.isTextActive,
      isSlideMoving = _this$state4.isSlideMoving,
      isTravellerMoving = _this$state4.isTravellerMoving;
    if (!data || !data.length || !(0, _DataUtils.isNumber)(x) || !(0, _DataUtils.isNumber)(y) || !(0, _DataUtils.isNumber)(width) || !(0, _DataUtils.isNumber)(height) || width <= 0 || height <= 0) {
      return null;
    }
    var layerClass = (0, _classnames["default"])(CL_BRUSH, className),
      isPanoramic = _uiApi.Children.count(children) === 1,
      style = {
        userSelect: 'none'
      };
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Layer.Layer, {
      className: layerClass,
      onMouseLeave: this.handleLeaveWrapper,
      onTouchMove: this.handleTouchMove,
      style: style,
      children: [this.renderBackground(), isPanoramic && this.renderPanorama(), this.renderSlide(startX, endX), this.renderTravellerLayer(startX, 'startX'), this.renderTravellerLayer(endX, 'endX'), (isTextActive || isSlideMoving || isTravellerMoving || alwaysShowText) && this.renderText()]
    });
  };
  return Brush;
}(_uiApi.PureComponent);
exports.Brush = Brush;
Brush.displayName = 'Brush';
Brush.defaultProps = {
  height: 40,
  travellerWidth: 5,
  gap: 1,
  fill: '#fff',
  stroke: '#666',
  padding: {
    top: 1,
    right: 1,
    bottom: 1,
    left: 1
  },
  leaveTimeOut: 1000,
  alwaysShowText: false
};
//# sourceMappingURL=Brush.js.map