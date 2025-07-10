"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
const useAriaCombobox = (isShowOptions, isAutocomplete) => {
  const _controlsId = (0, _uiApi.useId)();
  return [_controlsId, {
    role: "combobox",
    "aria-autocomplete": isAutocomplete ? "list" : "none",
    "aria-controls": isShowOptions ? _controlsId : void 0,
    "aria-expanded": isShowOptions
  }];
};
var _default = exports.default = useAriaCombobox;
//# sourceMappingURL=useAriaCombobox.js.map