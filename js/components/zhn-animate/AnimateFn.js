"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.stopJsAnimation = exports.runAnimation = void 0;
var _uiApi = require("../uiApi");
var _AnimateManager = _interopRequireDefault(require("./AnimateManager"));
var _easing = require("./easing");
var _configUpdate = _interopRequireDefault(require("./configUpdate"));
var _util = require("./util");
const _isFn = v => typeof v === 'function';
const _getObjectKeys = Object.keys;
const stopJsAnimation = refStopJsAnimation => {
  const _stopAnimation = (0, _uiApi.getRefValue)(refStopJsAnimation);
  if (_stopAnimation) {
    _stopAnimation();
  }
};
exports.stopJsAnimation = stopJsAnimation;
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
const runAnimation = (props, changeStyle, _refStopJsAnimation, _refAnimateManager, _refUnSubscribe) => {
  if (!(0, _uiApi.getRefValue)(_refAnimateManager)) {
    (0, _uiApi.setRefValue)(_refAnimateManager, (0, _AnimateManager.default)());
  }
  const _animateManager = (0, _uiApi.getRefValue)(_refAnimateManager),
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
  (0, _uiApi.setRefValue)(_refUnSubscribe, _animateManager.subscribe(changeStyle));
  const _runAnimation = _isFn(easing) || _isFn(children) || easing === 'spring' ? _runJSAnimation : steps.length > 1 ? _runStepAnimation : void 0;
  if (_runAnimation) {
    _runAnimation(props, changeStyle, _refStopJsAnimation, _refAnimateManager);
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
};
exports.runAnimation = runAnimation;
//# sourceMappingURL=AnimateFn.js.map