"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _uiApi = require("../../uiApi");
var usePrevCurData = function usePrevCurData(data, animationId) {
  var _useState = (0, _uiApi.useState)([]),
    curData = _useState[0],
    setCurData = _useState[1],
    _useState2 = (0, _uiApi.useState)([]),
    prevData = _useState2[0],
    setPrevData = _useState2[1];

  /*eslint-disable react-hooks/exhaustive-deps */
  (0, _uiApi.useEffect)(function () {
    setCurData(data);
    setPrevData(curData);
  }, [animationId]);
  //curData, data
  /*eslint-enable react-hooks/exhaustive-deps */

  (0, _uiApi.useEffect)(function () {
    setCurData(data);
  }, [data]);
  return [prevData, curData];
};
var _default = usePrevCurData;
exports["default"] = _default;
//# sourceMappingURL=usePrevCurData.js.map