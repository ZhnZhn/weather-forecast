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
      children
    } = props;
  (0, _uiApi.setRefValue)(_refUnSubscribe, _animateManager.subscribe(changeStyle));
  const _runAnimation = _isFn(easing) || _isFn(children) || easing === 'spring' ? _runJSAnimation : void 0;
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