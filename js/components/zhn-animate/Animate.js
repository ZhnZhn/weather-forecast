"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.Animate = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _uiApi = require("../uiApi");
var _AnimateManager = _interopRequireDefault(require("./AnimateManager"));
var _easing = require("./easing");
var _configUpdate = _interopRequireDefault(require("./configUpdate"));
var _util = require("./util");
var _jsxRuntime = require("react/jsx-runtime");
var _excluded = ["children", "begin", "duration", "attributeName", "easing", "isActive", "steps", "from", "to", "canBegin", "onAnimationEnd", "shouldReAnimate", "onAnimationReStart"];
var _isFn = function _isFn(v) {
  return typeof v === 'function';
};
var _getObjectKeys = Object.keys;
var _fCloneContainer = function _fCloneContainer(restProps, stateStyle) {
  return function (container) {
    var _container$props = container.props,
      _container$props$styl = _container$props.style,
      style = _container$props$styl === void 0 ? {} : _container$props$styl,
      className = _container$props.className;
    return (0, _uiApi.cloneElement)(container, (0, _extends2["default"])({}, restProps, {
      style: (0, _extends2["default"])({}, style, stateStyle),
      className: className
    }));
  };
};
var FN_NOOP = function FN_NOOP() {};
var Animate = /*#__PURE__*/function (_PureComponent) {
  (0, _inheritsLoose2["default"])(Animate, _PureComponent);
  /*
  static propTypes = {
    from: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    to: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    attributeName: PropTypes.string,
    // animation duration
    duration: PropTypes.number,
    begin: PropTypes.number,
    easing: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    steps: PropTypes.arrayOf(PropTypes.shape({
      duration: PropTypes.number.isRequired,
      style: PropTypes.object.isRequired,
      easing: PropTypes.oneOfType([
        PropTypes.oneOf(['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear']),
        PropTypes.func,
      ]),
      // transition css properties(dash case), optional
      properties: PropTypes.arrayOf('string'),
      onAnimationEnd: PropTypes.func,
    })),
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    isActive: PropTypes.bool,
    canBegin: PropTypes.bool,
    onAnimationEnd: PropTypes.func,
    // decide if it should reanimate with initial from style when props change
    shouldReAnimate: PropTypes.bool,
    onAnimationStart: PropTypes.func,
    onAnimationReStart: PropTypes.func,
  };
  */

  function Animate(props, context) {
    var _this;
    _this = _PureComponent.call(this, props, context) || this;
    var _this$props = _this.props,
      isActive = _this$props.isActive,
      attributeName = _this$props.attributeName,
      from = _this$props.from,
      to = _this$props.to,
      steps = _this$props.steps,
      children = _this$props.children;
    _this.handleStyleChange = _this.handleStyleChange.bind((0, _assertThisInitialized2["default"])(_this));
    _this.changeStyle = _this.changeStyle.bind((0, _assertThisInitialized2["default"])(_this));
    if (!isActive) {
      // if children is a function and animation is not active, set style to 'to'
      _this.state = _isFn(children) ? {
        style: to
      } : {
        style: {}
      };
      return (0, _assertThisInitialized2["default"])(_this);
    }
    if (steps && steps.length) {
      _this.state = {
        style: steps[0].style
      };
    } else if (from) {
      var _ref;
      if (_isFn(children)) {
        _this.state = {
          style: from
        };
        return (0, _assertThisInitialized2["default"])(_this);
      }
      _this.state = {
        style: attributeName ? (_ref = {}, _ref[attributeName] = from, _ref) : from
      };
    } else {
      _this.state = {
        style: {}
      };
    }
    return _this;
  }
  var _proto = Animate.prototype;
  _proto.componentDidMount = function componentDidMount() {
    var _this$props2 = this.props,
      isActive = _this$props2.isActive,
      canBegin = _this$props2.canBegin;
    this.mounted = true;
    if (!isActive || !canBegin) {
      return;
    }
    this.runAnimation(this.props);
  };
  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this$props3 = this.props,
      isActive = _this$props3.isActive,
      canBegin = _this$props3.canBegin,
      attributeName = _this$props3.attributeName,
      shouldReAnimate = _this$props3.shouldReAnimate;
    if (!canBegin) {
      return;
    }
    if (!isActive) {
      var _ref2;
      var newState = {
        style: attributeName ? (_ref2 = {}, _ref2[attributeName] = this.props.to, _ref2) : this.props.to
      };
      if (this.state && this.state.style) {
        if (attributeName && this.state.style[attributeName] !== this.props.to || !attributeName && this.state.style !== this.props.to) {
          // eslint-disable-next-line react/no-did-update-set-state
          this.setState(newState);
        }
      }
      return;
    }
    if ((0, _util.shallowEqual)(prevProps.to, this.props.to) && prevProps.canBegin && prevProps.isActive) {
      return;
    }
    var isTriggered = !prevProps.canBegin || !prevProps.isActive;
    if (this.manager) {
      this.manager.stop();
    }
    if (this.stopJSAnimation) {
      this.stopJSAnimation();
    }
    var from = isTriggered || shouldReAnimate ? this.props.from : prevProps.to;
    if (this.state && this.state.style) {
      var _ref3;
      var _newState = {
        style: attributeName ? (_ref3 = {}, _ref3[attributeName] = from, _ref3) : from
      };
      if (attributeName && this.state.style[attributeName] !== from || !attributeName && this.state.style !== from) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState(_newState);
      }
    }
    this.runAnimation((0, _extends2["default"])({}, this.props, {
      from: from,
      begin: 0
    }));
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    this.mounted = false;
    if (this.unSubscribe) {
      this.unSubscribe();
    }
    if (this.manager) {
      this.manager.stop();
      this.manager = null;
    }
    if (this.stopJSAnimation) {
      this.stopJSAnimation();
    }
  };
  _proto.runJSAnimation = function runJSAnimation(props) {
    var _this2 = this;
    var from = props.from,
      to = props.to,
      duration = props.duration,
      easing = props.easing,
      begin = props.begin,
      onAnimationEnd = props.onAnimationEnd,
      onAnimationStart = props.onAnimationStart,
      startAnimation = (0, _configUpdate["default"])(from, to, (0, _easing.configEasing)(easing), duration, this.changeStyle),
      finalStartAnimation = function finalStartAnimation() {
        _this2.stopJSAnimation = startAnimation();
      };
    this.manager.start([onAnimationStart, begin, finalStartAnimation, duration, onAnimationEnd]);
  };
  _proto.runStepAnimation = function runStepAnimation(props) {
    var _this3 = this;
    var steps = props.steps,
      begin = props.begin,
      onAnimationStart = props.onAnimationStart,
      _steps$ = steps[0],
      initialStyle = _steps$.style,
      _steps$$duration = _steps$.duration,
      initialTime = _steps$$duration === void 0 ? 0 : _steps$$duration;
    var addStyle = function addStyle(sequence, nextItem, index) {
      if (index === 0) {
        return sequence;
      }
      var duration = nextItem.duration,
        _nextItem$easing = nextItem.easing,
        easing = _nextItem$easing === void 0 ? 'ease' : _nextItem$easing,
        style = nextItem.style,
        nextProperties = nextItem.properties,
        onAnimationEnd = nextItem.onAnimationEnd;
      var preItem = index > 0 ? steps[index - 1] : nextItem,
        properties = nextProperties || _getObjectKeys(style);
      if (_isFn(easing) || easing === 'spring') {
        return [].concat(sequence, [_this3.runJSAnimation.bind(_this3, {
          from: preItem.style,
          to: style,
          duration: duration,
          easing: easing
        }), duration]);
      }
      var transition = (0, _util.getTransitionVal)(properties, duration, easing),
        newStyle = (0, _extends2["default"])({}, preItem.style, style, {
          transition: transition
        });
      return [].concat(sequence, [newStyle, duration, onAnimationEnd]).filter(_util.identity);
    };
    return this.manager.start([onAnimationStart].concat(steps.reduce(addStyle, [initialStyle, Math.max(initialTime, begin)]), [props.onAnimationEnd]));
  };
  _proto.runAnimation = function runAnimation(props) {
    var _ref4;
    if (!this.manager) {
      this.manager = (0, _AnimateManager["default"])();
    }
    var manager = this.manager,
      begin = props.begin,
      duration = props.duration,
      attributeName = props.attributeName,
      propsTo = props.to,
      easing = props.easing,
      onAnimationStart = props.onAnimationStart,
      onAnimationEnd = props.onAnimationEnd,
      steps = props.steps,
      children = props.children;
    this.unSubscribe = manager.subscribe(this.handleStyleChange);
    if (_isFn(easing) || _isFn(children) || easing === 'spring') {
      this.runJSAnimation(props);
      return;
    }
    if (steps.length > 1) {
      this.runStepAnimation(props);
      return;
    }
    var to = attributeName ? (_ref4 = {}, _ref4[attributeName] = propsTo, _ref4) : propsTo,
      transition = (0, _util.getTransitionVal)(_getObjectKeys(to), duration, easing);
    manager.start([onAnimationStart, begin, (0, _extends2["default"])({}, to, {
      transition: transition
    }), duration, onAnimationEnd]);
  };
  _proto.handleStyleChange = function handleStyleChange(style) {
    this.changeStyle(style);
  };
  _proto.changeStyle = function changeStyle(style) {
    if (this.mounted) {
      this.setState({
        style: style
      });
    }
  };
  _proto.render = function render() {
    /*eslint-disable no-unused-vars*/
    var _this$props4 = this.props,
      children = _this$props4.children,
      begin = _this$props4.begin,
      duration = _this$props4.duration,
      attributeName = _this$props4.attributeName,
      easing = _this$props4.easing,
      isActive = _this$props4.isActive,
      steps = _this$props4.steps,
      from = _this$props4.from,
      to = _this$props4.to,
      canBegin = _this$props4.canBegin,
      onAnimationEnd = _this$props4.onAnimationEnd,
      shouldReAnimate = _this$props4.shouldReAnimate,
      onAnimationReStart = _this$props4.onAnimationReStart,
      restProps = (0, _objectWithoutPropertiesLoose2["default"])(_this$props4, _excluded),
      count = _uiApi.Children.count(children),
      stateStyle = (0, _util.translateStyle)(this.state.style);
    if (_isFn(children)) {
      return children(stateStyle);
    }
    if (!isActive || count === 0) {
      return children;
    }
    var cloneContainer = _fCloneContainer(restProps, stateStyle);
    return count === 1 ? cloneContainer(_uiApi.Children.only(children)) : /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      children: _uiApi.Children.map(children, function (child) {
        return cloneContainer(child);
      })
    });
  };
  return Animate;
}(_uiApi.PureComponent);
exports.Animate = Animate;
Animate.displayName = 'Animate';
Animate.defaultProps = {
  begin: 0,
  duration: 1000,
  from: '',
  to: '',
  attributeName: '',
  easing: 'ease',
  isActive: true,
  canBegin: true,
  steps: [],
  onAnimationEnd: FN_NOOP,
  onAnimationStart: FN_NOOP
};
//# sourceMappingURL=Animate.js.map