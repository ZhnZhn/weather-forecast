"use strict";

exports.__esModule = true;
exports.default = setRafTimeout;
function setRafTimeout(callback, timeout) {
  if (timeout === void 0) {
    timeout = 0;
  }
  let currTime = -1;
  const shouldUpdate = now => {
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