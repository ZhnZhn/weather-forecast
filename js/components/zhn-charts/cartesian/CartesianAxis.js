"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.CartesianAxis = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var _uiApi = require("../../uiApi");
var _classnames = _interopRequireDefault(require("classnames"));
var _get2 = _interopRequireDefault(require("lodash/get"));
var _FnUtils = require("../util/FnUtils");
var _ShallowEqual = require("../util/ShallowEqual");
var _Layer = require("../container/Layer");
var _Text = require("../component/Text");
var _Label = require("../component/Label");
var _DataUtils = require("../util/DataUtils");
var _types = require("../util/types");
var _ReactUtils = require("../util/ReactUtils");
var _getTicks = require("./getTicks");
var _jsxRuntime = require("react/jsx-runtime");
var _excluded = ["viewBox"],
  _excluded2 = ["viewBox"],
  _excluded3 = ["ticks"];
var CartesianAxis = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(CartesianAxis, _Component);
  function CartesianAxis(props) {
    var _this;
    _this = _Component.call(this, props) || this;
    _this.state = {
      fontSize: '',
      letterSpacing: ''
    };
    return _this;
  }
  var _proto = CartesianAxis.prototype;
  _proto.shouldComponentUpdate = function shouldComponentUpdate(_ref, nextState) {
    var viewBox = _ref.viewBox,
      restProps = (0, _objectWithoutPropertiesLoose2["default"])(_ref, _excluded);
    // props.viewBox is sometimes generated every time -
    // check that specially as object equality is likely to fail
    var _this$props = this.props,
      viewBoxOld = _this$props.viewBox,
      restPropsOld = (0, _objectWithoutPropertiesLoose2["default"])(_this$props, _excluded2);
    return !(0, _ShallowEqual.shallowEqual)(viewBox, viewBoxOld) || !(0, _ShallowEqual.shallowEqual)(restProps, restPropsOld) || !(0, _ShallowEqual.shallowEqual)(nextState, this.state);
  };
  _proto.componentDidMount = function componentDidMount() {
    var htmlLayer = this.layerReference;
    if (!htmlLayer) return;
    var tick = htmlLayer.getElementsByClassName('recharts-cartesian-axis-tick-value')[0];
    if (tick) {
      this.setState({
        fontSize: window.getComputedStyle(tick).fontSize,
        letterSpacing: window.getComputedStyle(tick).letterSpacing
      });
    }
  }
  /**
   * Calculate the coordinates of endpoints in ticks
   * @param  {Object} data The data of a simple tick
   * @return {Object} (x1, y1): The coordinate of endpoint close to tick text
   *  (x2, y2): The coordinate of endpoint close to axis
   */;
  _proto.getTickLineCoord = function getTickLineCoord(data) {
    var _this$props2 = this.props,
      x = _this$props2.x,
      y = _this$props2.y,
      width = _this$props2.width,
      height = _this$props2.height,
      orientation = _this$props2.orientation,
      tickSize = _this$props2.tickSize,
      mirror = _this$props2.mirror,
      tickMargin = _this$props2.tickMargin;
    var x1, x2, y1, y2, tx, ty;
    var sign = mirror ? -1 : 1;
    var finalTickSize = data.tickSize || tickSize;
    var tickCoord = (0, _DataUtils.isNumber)(data.tickCoord) ? data.tickCoord : data.coordinate;
    switch (orientation) {
      case 'top':
        x1 = x2 = data.coordinate;
        y2 = y + +!mirror * height;
        y1 = y2 - sign * finalTickSize;
        ty = y1 - sign * tickMargin;
        tx = tickCoord;
        break;
      case 'left':
        y1 = y2 = data.coordinate;
        x2 = x + +!mirror * width;
        x1 = x2 - sign * finalTickSize;
        tx = x1 - sign * tickMargin;
        ty = tickCoord;
        break;
      case 'right':
        y1 = y2 = data.coordinate;
        x2 = x + +mirror * width;
        x1 = x2 + sign * finalTickSize;
        tx = x1 + sign * tickMargin;
        ty = tickCoord;
        break;
      default:
        x1 = x2 = data.coordinate;
        y2 = y + +mirror * height;
        y1 = y2 + sign * finalTickSize;
        ty = y1 + sign * tickMargin;
        tx = tickCoord;
        break;
    }
    return {
      line: {
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2
      },
      tick: {
        x: tx,
        y: ty
      }
    };
  };
  _proto.getTickTextAnchor = function getTickTextAnchor() {
    var _this$props3 = this.props,
      orientation = _this$props3.orientation,
      mirror = _this$props3.mirror;
    var textAnchor;
    switch (orientation) {
      case 'left':
        textAnchor = mirror ? 'start' : 'end';
        break;
      case 'right':
        textAnchor = mirror ? 'end' : 'start';
        break;
      default:
        textAnchor = 'middle';
        break;
    }
    return textAnchor;
  };
  _proto.getTickVerticalAnchor = function getTickVerticalAnchor() {
    var _this$props4 = this.props,
      orientation = _this$props4.orientation,
      mirror = _this$props4.mirror;
    var verticalAnchor = 'end';
    switch (orientation) {
      case 'left':
      case 'right':
        verticalAnchor = 'middle';
        break;
      case 'top':
        verticalAnchor = mirror ? 'start' : 'end';
        break;
      default:
        verticalAnchor = mirror ? 'end' : 'start';
        break;
    }
    return verticalAnchor;
  };
  _proto.renderAxisLine = function renderAxisLine() {
    var _this$props5 = this.props,
      x = _this$props5.x,
      y = _this$props5.y,
      width = _this$props5.width,
      height = _this$props5.height,
      orientation = _this$props5.orientation,
      mirror = _this$props5.mirror,
      axisLine = _this$props5.axisLine;
    var props = (0, _extends2["default"])({}, (0, _ReactUtils.filterProps)(this.props), (0, _ReactUtils.filterProps)(axisLine), {
      fill: 'none'
    });
    if (orientation === 'top' || orientation === 'bottom') {
      var needHeight = +(orientation === 'top' && !mirror || orientation === 'bottom' && mirror);
      props = (0, _extends2["default"])({}, props, {
        x1: x,
        y1: y + needHeight * height,
        x2: x + width,
        y2: y + needHeight * height
      });
    } else {
      var needWidth = +(orientation === 'left' && !mirror || orientation === 'right' && mirror);
      props = (0, _extends2["default"])({}, props, {
        x1: x + needWidth * width,
        y1: y,
        x2: x + needWidth * width,
        y2: y + height
      });
    }
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("line", (0, _extends2["default"])({}, props, {
      className: (0, _classnames["default"])('recharts-cartesian-axis-line', (0, _get2["default"])(axisLine, 'className'))
    }));
  };
  CartesianAxis.renderTickItem = function renderTickItem(option, props, value) {
    var tickItem;
    if ((0, _uiApi.isValidElement)(option)) {
      tickItem = (0, _uiApi.cloneElement)(option, props);
    } else if ((0, _FnUtils._isFn)(option)) {
      tickItem = option(props);
    } else {
      tickItem = /*#__PURE__*/(0, _jsxRuntime.jsx)(_Text.Text, (0, _extends2["default"])({}, props, {
        className: "recharts-cartesian-axis-tick-value",
        children: value
      }));
    }
    return tickItem;
  }
  /**
   * render the ticks
   * @param {Array} ticks The ticks to actually render (overrides what was passed in props)
   * @param {string} fontSize Fontsize to consider for tick spacing
   * @param {string} letterSpacing Letterspacing to consider for tick spacing
   * @return {ReactComponent} renderedTicks
   */;
  _proto.renderTicks = function renderTicks(ticks, fontSize, letterSpacing) {
    var _this2 = this;
    var _this$props6 = this.props,
      tickLine = _this$props6.tickLine,
      stroke = _this$props6.stroke,
      tick = _this$props6.tick,
      tickFormatter = _this$props6.tickFormatter,
      unit = _this$props6.unit;
    var finalTicks = (0, _getTicks.getTicks)((0, _extends2["default"])({}, this.props, {
      ticks: ticks
    }), fontSize, letterSpacing);
    var textAnchor = this.getTickTextAnchor();
    var verticalAnchor = this.getTickVerticalAnchor();
    var axisProps = (0, _ReactUtils.filterProps)(this.props);
    var customTickProps = (0, _ReactUtils.filterProps)(tick);
    var tickLineProps = (0, _extends2["default"])({}, axisProps, {
      fill: 'none'
    }, (0, _ReactUtils.filterProps)(tickLine));
    var items = finalTicks.map(function (entry, i) {
      var _this2$getTickLineCoo = _this2.getTickLineCoord(entry),
        lineCoord = _this2$getTickLineCoo.line,
        tickCoord = _this2$getTickLineCoo.tick;
      var tickProps = (0, _extends2["default"])({
        textAnchor: textAnchor,
        verticalAnchor: verticalAnchor
      }, axisProps, {
        stroke: 'none',
        fill: stroke
      }, customTickProps, tickCoord, {
        index: i,
        payload: entry,
        visibleTicksCount: finalTicks.length,
        tickFormatter: tickFormatter
      });
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Layer.Layer, (0, _extends2["default"])({
        className: "recharts-cartesian-axis-tick"
      }, (0, _types.adaptEventsOfChild)(_this2.props, entry, i), {
        children: [tickLine && /*#__PURE__*/(0, _jsxRuntime.jsx)("line", (0, _extends2["default"])({}, tickLineProps, lineCoord, {
          className: (0, _classnames["default"])('recharts-cartesian-axis-tick-line', (0, _get2["default"])(tickLine, 'className'))
        })), tick && CartesianAxis.renderTickItem(tick, tickProps, "" + ((0, _FnUtils._isFn)(tickFormatter) ? tickFormatter(entry.value, i) : entry.value) + (unit || ''))]
      }), "tick-" + i);
    });
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
      className: "recharts-cartesian-axis-ticks",
      children: items
    });
  };
  _proto.render = function render() {
    var _this3 = this;
    var _this$props7 = this.props,
      axisLine = _this$props7.axisLine,
      width = _this$props7.width,
      height = _this$props7.height,
      ticksGenerator = _this$props7.ticksGenerator,
      className = _this$props7.className,
      hide = _this$props7.hide;
    if (hide) {
      return null;
    }
    var _this$props8 = this.props,
      ticks = _this$props8.ticks,
      noTicksProps = (0, _objectWithoutPropertiesLoose2["default"])(_this$props8, _excluded3);
    var finalTicks = ticks;
    if ((0, _FnUtils._isFn)(ticksGenerator)) {
      finalTicks = ticks && ticks.length > 0 ? ticksGenerator(this.props) : ticksGenerator(noTicksProps);
    }
    if (width <= 0 || height <= 0 || !finalTicks || !finalTicks.length) {
      return null;
    }
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Layer.Layer, {
      className: (0, _classnames["default"])('recharts-cartesian-axis', className),
      ref: function ref(_ref2) {
        _this3.layerReference = _ref2;
      },
      children: [axisLine && this.renderAxisLine(), this.renderTicks(finalTicks, this.state.fontSize, this.state.letterSpacing), _Label.Label.renderCallByParent(this.props)]
    });
  };
  return CartesianAxis;
}(_uiApi.Component);
exports.CartesianAxis = CartesianAxis;
CartesianAxis.displayName = 'CartesianAxis';
CartesianAxis.defaultProps = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  viewBox: {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  // The orientation of axis
  orientation: 'bottom',
  // The ticks
  ticks: [],
  stroke: '#666',
  tickLine: true,
  axisLine: true,
  tick: true,
  mirror: false,
  minTickGap: 5,
  // The width or height of tick
  tickSize: 6,
  tickMargin: 2,
  interval: 'preserveEnd'
};
//# sourceMappingURL=CartesianAxis.js.map