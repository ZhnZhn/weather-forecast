"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.ResponsiveContainer = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _uiApi = require("../../uiApi");
var _classnames = _interopRequireDefault(require("classnames"));
var _ResizeDetector = _interopRequireDefault(require("../../zhn-resize-detector/ResizeDetector"));
var _DataUtils = require("../util/DataUtils");
var _jsxRuntime = require("react/jsx-runtime");
var CL_RESPONSIVE_CONTAINER = "recharts-responsive-container";
var ResponsiveContainer = (0, _uiApi.forwardRef)(function (_ref, ref) {
  var aspect = _ref.aspect,
    _ref$width = _ref.width,
    width = _ref$width === void 0 ? '100%' : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? '100%' : _ref$height,
    _ref$minWidth = _ref.minWidth,
    minWidth = _ref$minWidth === void 0 ? 0 : _ref$minWidth,
    minHeight = _ref.minHeight,
    maxHeight = _ref.maxHeight,
    children = _ref.children,
    _ref$debounce = _ref.debounce,
    debounce = _ref$debounce === void 0 ? 0 : _ref$debounce,
    id = _ref.id,
    className = _ref.className,
    onResize = _ref.onResize;
  var _useState = (0, _uiApi.useState)({
      containerWidth: -1,
      containerHeight: -1
    }),
    sizes = _useState[0],
    setSizes = _useState[1],
    containerRef = (0, _uiApi.useRef)(null);
  (0, _uiApi.useImperativeHandle)(ref, function () {
    return containerRef;
  }, [containerRef]);
  var getContainerSize = (0, _uiApi.useCallback)(function () {
    return containerRef.current ? {
      containerWidth: containerRef.current.clientWidth,
      containerHeight: containerRef.current.clientHeight
    } : null;
  }, []);
  var updateDimensionsImmediate = (0, _uiApi.useCallback)(function () {
    var newSize = getContainerSize();
    if (newSize) {
      var containerWidth = newSize.containerWidth,
        containerHeight = newSize.containerHeight;
      if (onResize) {
        onResize(containerWidth, containerHeight);
      }
      setSizes(function (currentSizes) {
        var oldWidth = currentSizes.containerWidth,
          oldHeight = currentSizes.containerHeight;
        return containerWidth !== oldWidth || containerHeight !== oldHeight ? {
          containerWidth: containerWidth,
          containerHeight: containerHeight
        } : currentSizes;
      });
    }
  }, [getContainerSize, onResize]);
  var chartContent = (0, _uiApi.useMemo)(function () {
    var containerWidth = sizes.containerWidth,
      containerHeight = sizes.containerHeight;
    if (containerWidth < 0 || containerHeight < 0) {
      return null;
    }
    var calculatedWidth = (0, _DataUtils.isPercent)(width) ? containerWidth : width;
    var calculatedHeight = (0, _DataUtils.isPercent)(height) ? containerHeight : height;
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
    return (0, _uiApi.cloneElement)(children, {
      width: calculatedWidth,
      height: calculatedHeight
    });
  }, [aspect, children, height, maxHeight, sizes, width]);
  (0, _uiApi.useEffect)(function () {
    var size = getContainerSize();
    if (size) {
      setSizes(size);
    }
  }, [getContainerSize]);
  var style = {
    width: width,
    height: height,
    minWidth: minWidth,
    minHeight: minHeight,
    maxHeight: maxHeight
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ResizeDetector["default"], {
    onResize: updateDimensionsImmediate,
    targetRef: containerRef,
    refreshMode: debounce > 0 ? 'debounce' : void 0,
    refreshRate: debounce,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", (0, _extends2["default"])({}, id != null ? {
      id: "" + id
    } : {}, {
      className: (0, _classnames["default"])(CL_RESPONSIVE_CONTAINER, className),
      style: style,
      ref: containerRef,
      children: chartContent
    }))
  });
});
exports.ResponsiveContainer = ResponsiveContainer;
//# sourceMappingURL=ResponsiveContainer.js.map