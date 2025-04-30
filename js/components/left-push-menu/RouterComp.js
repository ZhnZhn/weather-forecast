"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _CompType = _interopRequireDefault(require("./CompType"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const _router = {
  [_CompType.default.CTB]() {
    return Promise.resolve().then(() => _interopRequireWildcard(require(/* webpackChunkName: "chart-tabpane" */
    /* webpackMode: "lazy" */
    "../charts-tabpane/ChartTabPane"))).then(module => module.default);
  }
};
const RouterComp = {
  getComp(type) {
    const _load = _router[type];
    return (0, _isTypeFn.isFn)(_load) ? _load() : Promise.resolve(null);
  }
};
var _default = exports.default = RouterComp;
//# sourceMappingURL=RouterComp.js.map