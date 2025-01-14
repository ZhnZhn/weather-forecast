"use strict";

exports.__esModule = true;
exports.useContainerSizes = void 0;
var _uiApi = require("../../uiApi");
const _round = Math.round;
const useContainerSizes = initialDimension => {
  const [sizes, setSizes] = (0, _uiApi.useState)(() => ({
      containerWidth: initialDimension.width,
      containerHeight: initialDimension.height
    })),
    setContainerSize = (0, _uiApi.useCallback)((newWidth, newHeight) => {
      setSizes(prevState => {
        const roundedWidth = _round(newWidth),
          roundedHeight = _round(newHeight);
        return prevState.containerWidth === roundedWidth && prevState.containerHeight === roundedHeight ? prevState : {
          containerWidth: roundedWidth,
          containerHeight: roundedHeight
        };
      });
    }, []);
  return [sizes, setContainerSize];
};
exports.useContainerSizes = useContainerSizes;
//# sourceMappingURL=useContainerSizes.js.map