"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("../_react"));

var useRef = _react["default"].useRef;

var useRefInit = function useRefInit(crValue) {
  var ref = useRef(null);

  if (ref.current === null) {
    ref.current = crValue();
  }

  return ref.current;
};

var _default = useRefInit;
exports["default"] = _default;
//# sourceMappingURL=useRefInit.js.map