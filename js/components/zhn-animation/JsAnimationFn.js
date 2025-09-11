"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.stopJsAnimation = exports.runAnimation = void 0;
var _uiApi = require("../uiApi");
var _JsAnimationManager = _interopRequireDefault(require("./JsAnimationManager"));
var _easing = require("./easing");
var _configUpdate = _interopRequireDefault(require("./configUpdate"));
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
    (0, _uiApi.setRefValue)(_refAnimateManager, (0, _JsAnimationManager.default)());
  }
  (0, _uiApi.setRefValue)(_refUnSubscribe, (0, _uiApi.getRefValue)(_refAnimateManager).subscribe(changeStyle));
  _runJSAnimation(props, changeStyle, _refStopJsAnimation, _refAnimateManager);
};
exports.runAnimation = runAnimation;
//# sourceMappingURL=JsAnimationFn.js.map