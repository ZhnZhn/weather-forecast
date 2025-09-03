"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.Animate = void 0;
var _uiApi = require("../uiApi");
var _AnimateManager = _interopRequireDefault(require("./AnimateManager"));
var _easing = require("./easing");
var _configUpdate = _interopRequireDefault(require("./configUpdate"));
var _util = require("./util");
var _jsxRuntime = require("react/jsx-runtime");
const _isFn = v => typeof v === 'function';
const _getObjectKeys = Object.keys;
const _fCloneContainer = (restProps, stateStyle) => container => {
  const {
    style = {},
    className
  } = container.props;
  return (0, _uiApi.cloneUiElement)(container, {
    ...restProps,
    style: {
      ...style,
      ...stateStyle
    },
    className
  });
};
const FN_NOOP = () => {};
const _crInitialState = props => {
  const {
    isActive,
    attributeName,
    from,
    to,
    steps,
    children
  } = props;
  if (!isActive) {
    // if children is a function and animation is not active, set style to 'to'
    return _isFn(children) ? {
      style: to
    } : {
      style: {}
    };
  } else if (steps && steps.length) {
    return {
      style: steps[0].style
    };
  } else if (from) {
    return _isFn(children) ? {
      style: from
    } : {
      style: attributeName ? {
        [attributeName]: from
      } : from
    };
  } else {
    return {
      style: {}
    };
  }
};
const _stopJsAnimation = refStopJsAnimation => {
  const _stopAnimation = (0, _uiApi.getRefValue)(refStopJsAnimation);
  if (_stopAnimation) {
    _stopAnimation();
  }
};
const _runJSAnimation = (props, _changeStyle, _refStopJsAnimation, _refAnimateManager) => {
  const {
      from,
      to,
      duration,
      easing,
      begin,
      onAnimationEnd,
      onAnimationStart
    } = props,
    startAnimation = (0, _configUpdate.default)(from, to, (0, _easing.configEasing)(easing), duration, _changeStyle),
    finalStartAnimation = () => {
      (0, _uiApi.setRefValue)(_refStopJsAnimation, startAnimation());
    };
  (0, _uiApi.getRefValue)(_refAnimateManager).start([onAnimationStart, begin, finalStartAnimation, duration, onAnimationEnd]);
};
const _runStepAnimation = (props, changeStyle, _refStopJsAnimation, _refAnimateManager) => {
  const {
      steps,
      begin,
      onAnimationStart
    } = props,
    {
      style: initialStyle,
      duration: initialTime = 0
    } = steps[0];
  const addStyle = (sequence, nextItem, index) => {
    if (index === 0) {
      return sequence;
    }
    const {
      duration,
      easing = 'ease',
      style,
      properties: nextProperties,
      onAnimationEnd
    } = nextItem;
    const preItem = index > 0 ? steps[index - 1] : nextItem,
      properties = nextProperties || _getObjectKeys(style);
    if (_isFn(easing) || easing === 'spring') {
      return [...sequence, _runJSAnimation({
        from: preItem.style,
        to: style,
        duration,
        easing
      }, changeStyle, _refStopJsAnimation, _refAnimateManager), duration];
    }
    const transition = (0, _util.getTransitionVal)(properties, duration, easing),
      newStyle = {
        ...preItem.style,
        ...style,
        transition
      };
    return [...sequence, newStyle, duration, onAnimationEnd].filter(_util.identity);
  };
  return (0, _uiApi.getRefValue)(_refAnimateManager).start([onAnimationStart, ...steps.reduce(addStyle, [initialStyle, Math.max(initialTime, begin)]), props.onAnimationEnd]);
};
class Animate extends _uiApi.PureComponent {
  static displayName = 'Animate';

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

  static defaultProps = (() => ({
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
  }))();
  constructor(props, context) {
    super(props, context);
    this._refStopJsAnimation = (0, _uiApi.createRef)();
    this._refIsMounted = (0, _uiApi.createRef)(!1);
    this._refAnimateManager = (0, _uiApi.createRef)();
    this._refUnSubscribe = (0, _uiApi.createRef)();
    this.state = _crInitialState(props);
  }
  componentDidMount() {
    const {
      isActive,
      canBegin
    } = this.props;
    (0, _uiApi.setRefValue)(this._refIsMounted, !0);
    if (!isActive || !canBegin) {
      return;
    }
    this.runAnimation(this.props);
  }
  componentDidUpdate(prevProps) {
    const {
      isActive,
      canBegin,
      attributeName,
      shouldReAnimate
    } = this.props;
    if (!canBegin) {
      return;
    }
    if (!isActive) {
      const newState = {
        style: attributeName ? {
          [attributeName]: this.props.to
        } : this.props.to
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
    const _animateManager = (0, _uiApi.getRefValue)(this._refAnimateManager);
    if (_animateManager) {
      _animateManager.stop();
    }
    _stopJsAnimation(this._refStopJsAnimation);
    const isTriggered = !prevProps.canBegin || !prevProps.isActive,
      from = isTriggered || shouldReAnimate ? this.props.from : prevProps.to;
    if (this.state && this.state.style) {
      const newState = {
        style: attributeName ? {
          [attributeName]: from
        } : from
      };
      if (attributeName && this.state.style[attributeName] !== from || !attributeName && this.state.style !== from) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState(newState);
      }
    }
    this.runAnimation({
      ...this.props,
      from,
      begin: 0
    });
  }
  componentWillUnmount() {
    (0, _uiApi.setRefValue)(this._refIsMounted, !1);
    const _unSubscribe = (0, _uiApi.getRefValue)(this._refUnSubscribe);
    if (_unSubscribe) {
      _unSubscribe();
    }
    const _animateManager = (0, _uiApi.getRefValue)(this._refAnimateManager);
    if (_animateManager) {
      _animateManager.stop();
      (0, _uiApi.setRefValue)(this._refAnimateManager, null);
    }
    _stopJsAnimation(this._refStopJsAnimation);
  }
  runAnimation(props) {
    if (!(0, _uiApi.getRefValue)(this._refAnimateManager)) {
      (0, _uiApi.setRefValue)(this._refAnimateManager, (0, _AnimateManager.default)());
    }
    const _animateManager = (0, _uiApi.getRefValue)(this._refAnimateManager),
      {
        begin,
        duration,
        attributeName,
        to: propsTo,
        easing,
        onAnimationStart,
        onAnimationEnd,
        steps,
        children
      } = props;
    (0, _uiApi.setRefValue)(this._refUnSubscribe, _animateManager.subscribe(this.changeStyle));
    if (_isFn(easing) || _isFn(children) || easing === 'spring') {
      _runJSAnimation(props, this.changeStyle, this._refStopJsAnimation, this._refAnimateManager);
      return;
    }
    if (steps.length > 1) {
      _runStepAnimation(props, this.changeStyle, this._refStopJsAnimation, this._refAnimateManager);
      return;
    }
    const to = attributeName ? {
        [attributeName]: propsTo
      } : propsTo,
      transition = (0, _util.getTransitionVal)(_getObjectKeys(to), duration, easing);
    _animateManager.start([onAnimationStart, begin, {
      ...to,
      transition
    }, duration, onAnimationEnd]);
  }
  changeStyle = style => {
    if ((0, _uiApi.getRefValue)(this._refIsMounted)) {
      this.setState({
        style
      });
    }
  };
  render() {
    /*eslint-disable no-unused-vars*/
    const {
        children,
        begin,
        duration,
        attributeName,
        easing,
        isActive,
        steps,
        from,
        to,
        canBegin,
        onAnimationEnd,
        shouldReAnimate,
        onAnimationReStart,
        ...restProps
      } = this.props
      /*eslint-enable no-unused-vars*/,
      count = _uiApi.Children.count(children),
      stateStyle = (0, _util.translateStyle)(this.state.style);
    if (_isFn(children)) {
      return children(stateStyle);
    }
    if (!isActive || count === 0) {
      return children;
    }
    const cloneContainer = _fCloneContainer(restProps, stateStyle);
    return count === 1 ? cloneContainer(_uiApi.Children.only(children)) : /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      children: _uiApi.Children.map(children, child => cloneContainer(child))
    });
  }
}
exports.Animate = Animate;
//# sourceMappingURL=Animate.js.map