"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = createAnimateManager;
var _setRafTimeout = _interopRequireDefault(require("./setRafTimeout"));
var _isArr = Array.isArray;
function createAnimateManager() {
  var currStyle = {},
    handleChange = function handleChange() {
      return null;
    },
    shouldStop = false;
  var setStyle = function setStyle(_style) {
    if (shouldStop) {
      return;
    }
    if (_isArr(_style)) {
      if (!_style.length) {
        return;
      }
      var styles = _style,
        curr = styles[0],
        restStyles = styles.slice(1);
      if (typeof curr === 'number') {
        (0, _setRafTimeout["default"])(setStyle.bind(null, restStyles), curr);
        return;
      }
      setStyle(curr);
      (0, _setRafTimeout["default"])(setStyle.bind(null, restStyles));
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
    stop: function stop() {
      shouldStop = true;
    },
    start: function start(style) {
      shouldStop = false;
      setStyle(style);
    },
    subscribe: function subscribe(_handleChange) {
      handleChange = _handleChange;
      return function () {
        handleChange = function handleChange() {
          return null;
        };
      };
    }
  };
}
//# sourceMappingURL=AnimateManager.js.map