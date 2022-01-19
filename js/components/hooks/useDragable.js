"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _uiApi = require("../uiApi");

var _Interact = _interopRequireDefault(require("../../utils/Interact"));

var useDragable = function useDragable() {
  var ref = (0, _uiApi.useRef)();
  (0, _uiApi.useEffect)(function () {
    _Interact["default"].makeDragable(ref.current);
  }, []);
  return ref;
};

var _default = useDragable;
exports["default"] = _default;
//# sourceMappingURL=useDragable.js.map