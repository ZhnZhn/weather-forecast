"use strict";

exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../../utils/isTypeFn");
var _uiApi = require("../../uiApi");
var _DataUtils = require("../util/DataUtils");
/*eslint-disable react-hooks/exhaustive-deps */
const useClipPathId = (idPrefix, id) => (0, _uiApi.useMemo)(() => (0, _isTypeFn.isNull)(id) ? (0, _DataUtils.uniqueId)(`${idPrefix}-`) : id, [id]);
// idPrefix
/*eslint-enable react-hooks/exhaustive-deps */
var _default = exports.default = useClipPathId;
//# sourceMappingURL=useClipPathId.js.map