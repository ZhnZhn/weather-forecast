"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _uiApi = require("../uiApi");
var useLayoutButton = function useLayoutButton(storeKey, onClick) {
  var _layoutSelector = (0, _uiApi.useCallback)(function (state) {
    return state.layout[storeKey];
  }, [storeKey]);
  return [(0, _uiApi.useSelector)(_layoutSelector), (0, _uiApi.useCallback)(function () {
    onClick(storeKey);
  }, [storeKey, onClick])];
};
var _default = useLayoutButton;
exports["default"] = _default;
//# sourceMappingURL=useLayoutButton.js.map