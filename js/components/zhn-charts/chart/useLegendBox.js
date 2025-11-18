"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../../uiApi");
const useLegendBox = () => {
  const [legendBBox, setLegendBBox] = (0, _uiApi.useState)(),
    handleLegendBBoxUpdate = (0, _uiApi.useCallback)(legendBBox => {
      if (legendBBox) {
        setLegendBBox(legendBBox);
      }
    }, []);
  return [legendBBox, handleLegendBBoxUpdate];
};
var _default = exports.default = useLegendBox;
//# sourceMappingURL=useLegendBox.js.map