"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../../uiApi");
const useFontSizeByClassName = (refLayer, className) => {
  const [state, setState] = (0, _uiApi.useState)({
    fontSize: '',
    letterSpacing: ''
  });
  (0, _uiApi.useEffect)(() => {
    const htmlLayer = (0, _uiApi.getRefValue)(refLayer);
    if (!htmlLayer) {
      return;
    }
    const element = htmlLayer.getElementsByClassName(className)[0];
    if (element) {
      const elementComputedStyle = window.getComputedStyle(element);
      setState({
        fontSize: elementComputedStyle.fontSize,
        letterSpacing: elementComputedStyle.letterSpacing
      });
    }
  }, [refLayer, className]);
  return state;
};
var _default = exports.default = useFontSizeByClassName;
//# sourceMappingURL=useFontSizeByClassName.js.map