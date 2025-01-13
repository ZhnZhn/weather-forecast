"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.ResponsiveContainer = void 0;
var _uiApi = require("../../uiApi");
var _crCn = _interopRequireDefault(require("../../zhn-utils/crCn"));
var _ResizeDetector = _interopRequireDefault(require("../../zhn-resize-detector/ResizeDetector"));
var _DataUtils = require("../util/DataUtils");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
const ResponsiveContainer = _ref => {
  let {
    aspect,
    width = '100%',
    height = '100%',
    /*
     * default min-width to 0 if not specified - 'auto' causes issues with flexbox
     * https://github.com/recharts/recharts/issues/172
     */
    minWidth = 0,
    minHeight,
    maxHeight,
    children,
    debounce = 0,
    id,
    className,
    onResize
  } = _ref;
  const [sizes, setSizes] = (0, _uiApi.useState)({
      containerWidth: -1,
      containerHeight: -1
    }),
    containerRef = (0, _uiApi.useRef)(null);
  const getContainerSize = (0, _uiApi.useCallback)(() => {
    const _containerEl = (0, _uiApi.getRefValue)(containerRef);
    return _containerEl ? {
      containerWidth: _containerEl.clientWidth,
      containerHeight: _containerEl.clientHeight
    } : null;
  }, []);
  const updateDimensionsImmediate = (0, _uiApi.useCallback)(() => {
    const newSize = getContainerSize();
    if (newSize) {
      const {
        containerWidth,
        containerHeight
      } = newSize;
      if (onResize) {
        onResize(containerWidth, containerHeight);
      }
      setSizes(currentSizes => {
        const {
          containerWidth: oldWidth,
          containerHeight: oldHeight
        } = currentSizes;
        return containerWidth !== oldWidth || containerHeight !== oldHeight ? {
          containerWidth,
          containerHeight
        } : currentSizes;
      });
    }
  }, [getContainerSize, onResize]);
  const chartContent = (0, _uiApi.useMemo)(() => {
    const {
      containerWidth,
      containerHeight
    } = sizes;
    if (containerWidth < 0 || containerHeight < 0) {
      return null;
    }
    let calculatedWidth = (0, _DataUtils.isPercent)(width) ? containerWidth : width;
    let calculatedHeight = (0, _DataUtils.isPercent)(height) ? containerHeight : height;
    if (aspect && aspect > 0) {
      // Preserve the desired aspect ratio
      if (calculatedWidth) {
        // Will default to using width for aspect ratio
        calculatedHeight = calculatedWidth / aspect;
      } else if (calculatedHeight) {
        // But we should also take height into consideration
        calculatedWidth = calculatedHeight * aspect;
      }
      // if maxHeight is set, overwrite if calculatedHeight is greater than maxHeight
      if (maxHeight && calculatedHeight > maxHeight) {
        calculatedHeight = maxHeight;
      }
    }
    return (0, _uiApi.cloneUiElement)(children, {
      width: calculatedWidth,
      height: calculatedHeight
    });
  }, [aspect, children, height, maxHeight, sizes, width]);
  (0, _uiApi.useEffect)(() => {
    const size = getContainerSize();
    if (size) {
      setSizes(size);
    }
  }, [getContainerSize]);
  const style = {
    width,
    height,
    minWidth,
    minHeight,
    maxHeight
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ResizeDetector.default, {
    onResize: updateDimensionsImmediate,
    targetRef: containerRef,
    refreshMode: debounce > 0 ? 'debounce' : void 0,
    refreshRate: debounce,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      ...(id != null ? {
        id: `${id}`
      } : {}),
      className: (0, _crCn.default)(_CL.CL_RESPONSIVE_CONTAINER, className),
      style: style,
      ref: containerRef,
      children: chartContent
    })
  });
};
exports.ResponsiveContainer = ResponsiveContainer;
//# sourceMappingURL=ResponsiveContainer.js.map