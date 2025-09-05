"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.Animate = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _uiApi = require("../uiApi");
var _usePrevValue = _interopRequireDefault(require("../hooks/usePrevValue"));
var _util = require("./util");
var _AnimateFn = require("./AnimateFn");
var _jsxRuntime = require("react/jsx-runtime");
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
const _crStyleState = (value, attributeName) => ({
  style: attributeName ? {
    [attributeName]: value
  } : value
});
const _crInitialState = _ref => {
  let {
    isActive,
    attributeName,
    from,
    to,
    steps,
    children
  } = _ref;
  return !isActive
  // if children is a function and animation is not active, set style to 'to'
  ? _crStyleState((0, _isTypeFn.isFn)(children) ? to : {}) : (0, _isTypeFn.isNotEmptyArr)(steps) ? _crStyleState(steps[0].style) : from ? _crStyleState(from, (0, _isTypeFn.isFn)(children) ? void 0 : attributeName) : _crStyleState({});
};
const DF_PROPS = {
  begin: 0,
  duration: 1000,
  from: '',
  to: '',
  attributeName: '',
  easing: 'ease',
  isActive: !0,
  canBegin: !0,
  //steps: [],
  onAnimationEnd: FN_NOOP,
  onAnimationStart: FN_NOOP
};
const _isStyleChanged = (style, value, attributeName) => attributeName ? style[attributeName] !== value : style !== value;
const _setNextStateIf = (state, attributeName, value, setState) => {
  const {
    style
  } = state || {};
  if (style && _isStyleChanged(style, value, attributeName)) {
    setState(_crStyleState(value, attributeName));
  }
};
const Animate = exports.Animate = (0, _uiApi.memo)(props => {
  const _props = (0, _uiApi.useMemo)(() => (0, _uiApi.crProps)({
      ...DF_PROPS,
      steps: []
    }, props), [props]),
    _prevProps = (0, _usePrevValue.default)(_props),
    _refStopJsAnimation = (0, _uiApi.useRef)(),
    _refIsMounted = (0, _uiApi.useRef)(!1),
    _refAnimateManager = (0, _uiApi.useRef)(),
    _refUnSubscribe = (0, _uiApi.useRef)(),
    [state, setState] = (0, _uiApi.useState)(() => _crInitialState(_props)),
    changeStyle = (0, _uiApi.useMemo)(() => style => {
      if ((0, _uiApi.getRefValue)(_refIsMounted)) {
        setState({
          style
        });
      }
    }, [])

    /*eslint-disable no-unused-vars*/,
    {
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
    } = _props;
  /*eslint-enable no-unused-vars*/

  /*eslint-disable react-hooks/exhaustive-deps */
  (0, _uiApi.useEffect)(() => {
    (0, _uiApi.setRefValue)(_refIsMounted, !0);
    if (isActive && canBegin) {
      (0, _AnimateFn.runAnimation)(_props, changeStyle, _refStopJsAnimation, _refAnimateManager, _refUnSubscribe);
    }
    return () => {
      (0, _uiApi.setRefValue)(_refIsMounted, !1);
      const _unSubscribe = (0, _uiApi.getRefValue)(_refUnSubscribe);
      if (_unSubscribe) {
        _unSubscribe();
      }
      const _animateManager = (0, _uiApi.getRefValue)(_refAnimateManager);
      if (_animateManager) {
        _animateManager.stop();
        (0, _uiApi.setRefValue)(_refAnimateManager, null);
      }
      (0, _AnimateFn.stopJsAnimation)(_refStopJsAnimation);
    };
  }, []);
  //changeStyle, _props, isActive, canBegin
  /*eslint-enable react-hooks/exhaustive-deps */

  /*eslint-disable react-hooks/exhaustive-deps */
  (0, _uiApi.useEffect)(() => {
    if (_prevProps) {
      if (!canBegin) {
        return;
      }
      if (!isActive) {
        _setNextStateIf(state, attributeName, _props.to, setState);
        return;
      }
      if ((0, _util.shallowEqual)(_prevProps.to, _props.to) && _prevProps.canBegin && _prevProps.isActive) {
        return;
      }
      const _animateManager = (0, _uiApi.getRefValue)(_refAnimateManager);
      if (_animateManager) {
        _animateManager.stop();
      }
      (0, _AnimateFn.stopJsAnimation)(_refStopJsAnimation);
      const isTriggered = !_prevProps.canBegin || !_prevProps.isActive,
        from = isTriggered || shouldReAnimate ? _props.from : _prevProps.to;
      _setNextStateIf(state, attributeName, from, setState);
      (0, _AnimateFn.runAnimation)({
        ..._props,
        from,
        begin: 0
      }, changeStyle, _refStopJsAnimation, _refAnimateManager, _refUnSubscribe);
    }
  }, [_props, state]);
  //changeStyle
  //attributeName, isActive, canBegin, shouldReAnimate
  //_prevProps.isActivem, _prevProps.canBegin, _prevProps.to
  /*eslint-enable react-hooks/exhaustive-deps */

  const count = _uiApi.Children.count(children),
    stateStyle = (0, _util.translateStyle)(state.style);
  if ((0, _isTypeFn.isFn)(children)) {
    return children(stateStyle);
  }
  if (!isActive || count === 0) {
    return children;
  }
  const cloneContainer = _fCloneContainer(restProps, stateStyle);
  return count === 1 ? cloneContainer(_uiApi.Children.only(children)) : /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    children: _uiApi.Children.map(children, child => cloneContainer(child))
  });
});

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
//# sourceMappingURL=Animate.js.map