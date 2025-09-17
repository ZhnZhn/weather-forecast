"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.JsAnimation = void 0;
var _uiApi = require("../uiApi");
var _usePrevValue = _interopRequireDefault(require("../hooks/usePrevValue"));
var _JsAnimationManager = _interopRequireDefault(require("./JsAnimationManager"));
var _JsAnimationFn = require("./JsAnimationFn");
const FN_NOOP = () => {};
const DF_PROPS = {
  begin: 0,
  duration: 1000,
  from: 0,
  to: 1,
  easing: 'ease',
  isActive: !0,
  canBegin: !0,
  onAnimationEnd: FN_NOOP,
  onAnimationStart: FN_NOOP
};
const _setNextStateIf = (state, value, setState) => {
  if (state !== value) {
    setState(value);
  }
};
const JsAnimation = exports.JsAnimation = (0, _uiApi.memo)(props => {
  const _props = (0, _uiApi.useMemo)(() => (0, _uiApi.crProps)(DF_PROPS, props), [props]),
    _prevProps = (0, _usePrevValue.default)(_props),
    _refStopJsAnimation = (0, _uiApi.useRef)(),
    _refIsMounted = (0, _uiApi.useRef)(!1),
    _refAnimateManager = (0, _uiApi.useRef)(),
    _refUnSubscribe = (0, _uiApi.useRef)(),
    [state, setState] = (0, _uiApi.useState)(() => _props.isActive ? _props.from : _props.to),
    changeStyle = (0, _uiApi.useMemo)(() => style => {
      if ((0, _uiApi.getRefValue)(_refIsMounted)) {
        setState(style.t);
      }
    }, []),
    getAnimationManager = (0, _uiApi.useMemo)(() => () => {
      if (!(0, _uiApi.getRefValue)(_refAnimateManager)) {
        (0, _uiApi.setRefValue)(_refAnimateManager, (0, _JsAnimationManager.default)());
      }
      return (0, _uiApi.getRefValue)(_refAnimateManager);
    }, [])

    /*eslint-disable no-unused-vars*/,
    {
      children,
      isActive,
      canBegin
    } = _props;
  /*eslint-enable no-unused-vars*/

  /*eslint-disable react-hooks/exhaustive-deps */
  (0, _uiApi.useEffect)(() => {
    (0, _uiApi.setRefValue)(_refIsMounted, !0);
    if (isActive && canBegin) {
      (0, _JsAnimationFn.runAnimation)(_props, changeStyle, getAnimationManager(), _refStopJsAnimation, _refUnSubscribe);
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
      (0, _JsAnimationFn.stopJsAnimation)(_refStopJsAnimation);
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
        _setNextStateIf(state, _props.to, setState);
        return;
      }
      if (_prevProps.to === _props.to && _prevProps.canBegin && _prevProps.isActive) {
        return;
      }
      const _animateManager = (0, _uiApi.getRefValue)(_refAnimateManager);
      if (_animateManager) {
        _animateManager.stop();
      }
      (0, _JsAnimationFn.stopJsAnimation)(_refStopJsAnimation);
      const from = !_prevProps.canBegin || !_prevProps.isActive ? _props.from : _prevProps.to;
      _setNextStateIf(state, from, setState);
      (0, _JsAnimationFn.runAnimation)({
        ..._props,
        from,
        begin: 0
      }, changeStyle, getAnimationManager(), _refStopJsAnimation, _refUnSubscribe);
    }
  }, [_props, state]);
  //changeStyle
  //isActive, canBegin
  //_prevProps.isActivem, _prevProps.canBegin, _prevProps.to
  /*eslint-enable react-hooks/exhaustive-deps */

  return children(state);
});

/*
static propTypes = {
  from: PropTypes.number,
  to: PropTypes.number,
  // animation duration
  duration: PropTypes.number,
  begin: PropTypes.number,
  easing: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  children: PropTypes.func,
  isActive: PropTypes.bool,
  canBegin: PropTypes.bool,
  onAnimationEnd: PropTypes.func,
  // decide if it should reanimate with initial from style when props change
  onAnimationStart: PropTypes.func,
};
*/
//# sourceMappingURL=JsAnimation.js.map