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
      _useMemo = (0, _uiApi.useMemo)(function () {
    return [function () {
      return setIs(true);
    }, function () {
      return setIs(false);
    }];
  }, []),
      setTrue = _useMemo[0],
      setFalse = _useMemo[1];

  return [is, setTrue, setFalse];
};

var _default = useBool;
exports["default"] = _default;
//# sourceMappingURL=useBool.js.map