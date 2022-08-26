"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _uiApi = require("../uiApi");

var _isArr = Array.isArray,
    INITIAL_DATA = [];

var useSelectorData = function useSelectorData(selector, transform) {
  var data = (0, _uiApi.useSelector)(selector);
  /*eslint-disable react-hooks/exhaustive-deps */

  return (0, _uiApi.useMemo)(function () {
    return _isArr(data) ? transform(data) : INITIAL_DATA;
  }, [data]); // transform

  /*eslint-enable react-hooks/exhaustive-deps */
};

var _default = useSelectorData;
exports["default"] = _default;
//# sourceMappingURL=useSelectorData.js.map