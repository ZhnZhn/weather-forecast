"use strict";

exports.__esModule = true;
exports.useKeyEscape = void 0;
var _uiApi = require("../uiApi");
/*eslint-disable react-hooks/exhaustive-deps */
const _fUseKey = isKey => (fn, deps) => (0, _uiApi.useCallback)(evt => {
  if (isKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
    fn(evt);
  }
}, deps || []);
/*eslint-enable react-hooks/exhaustive-deps */

const _isKeyEscape = evt => evt.keyCode === 27 || evt.key === 'Escape';
const useKeyEscape = exports.useKeyEscape = _fUseKey(_isKeyEscape);
//# sourceMappingURL=fUseKey.js.map