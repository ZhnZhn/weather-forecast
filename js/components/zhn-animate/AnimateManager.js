"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = createAnimateManager;
var _setRafTimeout = _interopRequireDefault(require("./setRafTimeout"));
const _isArr = Array.isArray;
const _bindTo = (fn, value) => fn.bind(null, value);
function createAnimateManager() {
  let currStyle = {},
    handleChange = () => null,
    shouldStop = !1;
  const setStyle = _style => {
    if (shouldStop) {
      return;
    }
    if (_isArr(_style)) {
      if (!_style.length) {
        return;
      }
      const styles = _style,
        [curr, ...restStyles] = styles;
      if (typeof curr === 'number') {
        (0, _setRafTimeout.default)(_bindTo(setStyle, restStyles), curr);
        return;
      }
      setStyle(curr);
      (0, _setRafTimeout.default)(_bindTo(setStyle, restStyles));
      return;
    }
    if (typeof _style === 'object') {
      currStyle = _style;
      handleChange(currStyle);
    }
    if (typeof _style === 'function') {
      _style();
    }
  };
  return {
    stop: () => {
      shouldStop = !0;
    },
    start: style => {
      shouldStop = !1;
      setStyle(style);
    },
    subscribe: _handleChange => {
      handleChange = _handleChange;
      return () => {
        handleChange = () => null;
      };
    }
  };
}
//# sourceMappingURL=AnimateManager.js.map