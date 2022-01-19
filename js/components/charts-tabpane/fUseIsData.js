"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _uiApi = require("../uiApi");

var fUseIsData = function fUseIsData(hasProperty) {
  return function (data) {
    return (0, _uiApi.useMemo)(function () {
      return hasProperty(data);
    }, [data]);
  };
};

var _default = fUseIsData;
exports["default"] = _default;
//# sourceMappingURL=fUseIsData.js.map