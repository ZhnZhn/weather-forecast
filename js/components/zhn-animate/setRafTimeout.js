"use strict";

exports.__esModule = true;
exports["default"] = setRafTimeout;
function setRafTimeout(callback, timeout) {
  if (timeout === void 0) {
    timeout = 0;
  }
  var currTime = -1;
  var shouldUpdate = function shouldUpdate(now) {
    if (currTime < 0) {
      currTime = now;
    }
    if (now - currTime > timeout) {
      callback(now);
      currTime = -1;
    } else {
      requestAnimationFrame(shouldUpdate);
    }
  };
  requestAnimationFrame(shouldUpdate);
}
//# sourceMappingURL=setRafTimeout.js.map