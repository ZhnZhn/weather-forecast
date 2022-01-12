"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("../_react"));

var useState = _react["default"].useState,
    useCallback = _react["default"].useCallback;

var useBool = function useBool(initialValue) {
  var _useState = useState(function () {
    return !!initialValue;
  }),
      is = _useState[0],
      setIs = _useState[1],
      setTrue = useCallback(function () {
    return setIs(true);
  }, []),
      setFalse = useCallback(function () {
    return setIs(false);
  }, []); //setIs

  /*eslint-enable react-hooks/exhaustive-deps */


  return [is, setTrue, setFalse];
};

var _default = useBool;
exports["default"] = _default;
//# sourceMappingURL=useBool.js.map