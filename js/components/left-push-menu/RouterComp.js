"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _CompType = _interopRequireDefault(require("./CompType"));

var _router2;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var _router = (_router2 = {}, _router2[_CompType["default"].CTB] = function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../charts-tabpane/ChartTabPane"));
  }).then(function (module) {
    return module["default"];
  });
}, _router2);

var RouterComp = {
  getComp: function getComp(type) {
    var _load = _router[type];
    return _isFn(_load) ? _load() : Promise.resolve(null);
  }
};
var _default = RouterComp;
exports["default"] = _default;
//# sourceMappingURL=RouterComp.js.map