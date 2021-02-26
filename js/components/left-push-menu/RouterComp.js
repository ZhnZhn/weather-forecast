"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _interopRequireWildcard2 = _interopRequireDefault(require("@babel/runtime/helpers/interopRequireWildcard"));

var _CompType = _interopRequireDefault(require("./CompType"));

var _router2;

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var _router = (_router2 = {}, _router2[_CompType["default"].CTB] = function () {
  return Promise.resolve().then(function () {
    return (0, _interopRequireWildcard2["default"])(require("../charts-tabpane/ChartTabPane"));
  }).then(function (module) {
    return module["default"];
  });
}, _router2);

var RouterComp = {
  getComp: function getComp(type) {
    var _load = _router[type];
    return _isFn(_router[type]) ? _load() : Promise.resolve(null);
  }
};
var _default = RouterComp;
exports["default"] = _default;
//# sourceMappingURL=RouterComp.js.map