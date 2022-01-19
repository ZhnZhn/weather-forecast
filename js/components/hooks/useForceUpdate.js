"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _uiApi = require("../uiApi");

var _reducer = function _reducer() {
  return {};
};

var useForceUpdate = function useForceUpdate() {
  return (0, _uiApi.useReducer)(_reducer)[1];
};

var _default = useForceUpdate;
exports["default"] = _default;
//# sourceMappingURL=useForceUpdate.js.map