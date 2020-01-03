"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var MSG = {
  HTTP_STATUS: 'HTTP Status',
  NETWORK: 'Loading error. Please, check your network connection.'
};

var request = function request(url) {
  return fetch(url).then(function (res) {
    var status = res.status;
    return Promise.all([res.json(), Promise.resolve(status)]);
  }).then(function (arr) {
    var json = arr[0],
        status = arr[1];

    if (status >= 200 && status < 300) {
      return json;
    } else if (status >= 400 && status < 500) {
      var message = json.message;
      throw new Error(MSG.HTTP_STATUS + ": " + status + ". " + message);
    } else {
      throw new Error(MSG.HTTP_STATUS + ": " + status);
    }
  })["catch"](function (err) {
    var _err$message = err.message,
        message = _err$message === void 0 ? '' : _err$message;

    if (message.indexOf(MSG.HTTP_STATUS) !== -1) {
      throw new Error(message);
    }

    throw new Error(MSG.NETWORK + " " + message);
  });
};

var _default = request;
exports["default"] = _default;
//# sourceMappingURL=request.js.map