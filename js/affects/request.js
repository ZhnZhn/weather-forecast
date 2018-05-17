"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var request = function request(url) {
  return fetch(url).then(function (res) {
    var status = res.status;

    if (status >= 200 && status < 300) {
      return res.json();
    } else {
      throw new Error("HTTP Status: " + status);
    }
  });
};

exports.default = request;
//# sourceMappingURL=request.js.map