"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _uiApi = require("../../uiApi");
var _FnUtils = require("../util/FnUtils");
var _DataUtils = require("../util/DataUtils");
/*eslint-disable react-hooks/exhaustive-deps */
var useClipPathId = function useClipPathId(idPrefix, id) {
  return (0, _uiApi.useMemo)(function () {
    return (0, _FnUtils._isNil)(id) ? (0, _DataUtils.uniqueId)(idPrefix + "-") : id;
  }, [id]);
};
// idPrefix
/*eslint-enable react-hooks/exhaustive-deps */
var _default = useClipPathId;
exports["default"] = _default;
//# sourceMappingURL=useClipPathId.js.map