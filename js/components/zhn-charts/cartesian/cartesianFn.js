"use strict";

exports.__esModule = true;
exports.fCreateElement = void 0;
var _uiApi = require("../../uiApi");
var _FnUtils = require("../util/FnUtils");
var fCreateElement = function fCreateElement(crElement) {
  return function (option, props) {
    return (0, _uiApi.isValidElement)(option) ? (0, _uiApi.cloneElement)(option, props) : (0, _FnUtils._isFn)(option) ? option(props) : crElement(props);
  };
};
exports.fCreateElement = fCreateElement;
//# sourceMappingURL=cartesianFn.js.map