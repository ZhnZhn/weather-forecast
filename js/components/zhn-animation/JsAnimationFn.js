"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.stopJsAnimation = exports.runAnimation = void 0;
var _uiApi = require("../uiApi");
var _easing = require("./easing");
var _configUpdate = _interopRequireDefault(require("./configUpdate"));
const stopJsAnimation = refStopJsAnimation => {
  const _stopAnimation = (0, _uiApi.getRefValue)(refStopJsAnimation);
  if (_stopAnimation) {
    _stopAnimation();
  }
};
exports.stopJsAnimation = stopJsAnimation;
const _runJSAnimation = (props, changeStyle, animateManager, _refStopJsAnimation) => {
  const {
      from,
      to,
      duration,
      easing,
      begin,
      onAnimationEnd,
      onAnimationStart
    } = props,
    startAnimation = (0, _configUpdate.default)(from, to, (0, _easing.configEasing)(easing), duration, changeStyle),
    finalStartAnimation = () => {
      (0, _uiApi.setRefValue)(_refStopJsAnimation, startAnimation());
    };
  animateManager.start([onAnimationStart, begin, finalStartAnimation, duration, onAnimationEnd]);
};
const runAnimation = (props, changeStyle, animateManager, _refStopJsAnimation, _refUnSubscribe) => {
  (0, _uiApi.setRefValue)(_refUnSubscribe, animateManager.subscribe(changeStyle));
  _runJSAnimation(props, changeStyle, animateManager, _refStopJsAnimation);
};
exports.runAnimation = runAnimation;
//# sourceMappingURL=JsAnimationFn.js.map