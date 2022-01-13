"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _uiApi = require("../uiApi");

var useBool = function useBool(initialValue) {
  var _useState = (0, _uiApi.useState)(function () {
    return !!initialValue;
  }),
      is = _useState[0],
      setIs = _useState[1],
      setTrue = (0, _uiApi.useCallback)(function () {
    return setIs(true);
  }, []),
      setFalse = (0, _uiApi.useCallback)(function () {
    return setIs(false);
  }, []); //setIs

  /*eslint-enable react-hooks/exhaustive-deps */


  return [is, setTrue, setFalse];
};

var _default = useBool;
exports["default"] = _default;
//# sourceMappingURL=useBool.js.map