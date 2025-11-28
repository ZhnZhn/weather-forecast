"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../../uiApi");
var _useAnimationId = _interopRequireDefault(require("../util/useAnimationId"));
const usePrevCurData = data => {
  const animationId = (0, _useAnimationId.default)(data);
  const [curData, setCurData] = (0, _uiApi.useState)([]),
    [prevData, setPrevData] = (0, _uiApi.useState)([]);

  /*eslint-disable react-hooks/exhaustive-deps */
  (0, _uiApi.useEffect)(() => {
    setCurData(data);
    setPrevData(curData);
  }, [animationId]);
  //curData, data
  /*eslint-enable react-hooks/exhaustive-deps */

  (0, _uiApi.useEffect)(() => {
    setCurData(data);
  }, [data]);
  return [prevData, curData, animationId];
};
var _default = exports.default = usePrevCurData;
//# sourceMappingURL=usePrevCurData.js.map