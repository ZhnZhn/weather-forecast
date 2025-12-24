"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.ResponsiveContainer = void 0;
var _uiApi = require("../../uiApi");
var _styleFn = require("../../styleFn");
var _throttleFn = _interopRequireDefault(require("../../../utils/throttleFn"));
var _DataUtils = require("../util/DataUtils");
var _useContainerSizes = require("./useContainerSizes");
var _jsxRuntime = require("react/jsx-runtime");
const FN_NOOP = () => {},
  _getContainerDimension = (value, containerValue) => (0, _DataUtils.isPercent)(value) ? containerValue : value;
const ResponsiveContainer = _ref => {
  let {
    id,
    className,
    style,
    aspect,
    initialDimension = {
      width: -1,
      height: -1
    },
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
    onResize = FN_NOOP
  } = _ref;
  const _refContainer = (0, _uiApi.useRef)(null),
    _refOnResize = (0, _uiApi.useRef)(onResize),
    [sizes, setContainerSize] = (0, _useContainerSizes.useContainerSizes)(initialDimension);
  (0, _uiApi.useEffect)(() => {
    let _onResizeContainer = entries => {
      const {
        width: containerWidth,
        height: containerHeight
      } = entries[0].contentRect;
      setContainerSize(containerWidth, containerHeight);
      (0, _uiApi.getRefValue)(_refOnResize)(containerWidth, containerHeight);
    };
    if (debounce > 0) {
      _onResizeContainer = (0, _throttleFn.default)(_onResizeContainer, debounce);
    }
    const observer = new ResizeObserver(_onResizeContainer),
      containerNode = (0, _uiApi.getRefValue)(_refContainer),
      {
        width: containerWidth,
        height: containerHeight
      } = containerNode.getBoundingClientRect();
    setContainerSize(containerWidth, containerHeight);
    observer.observe(containerNode);
    return () => {
      observer.disconnect();
    };
  }, [setContainerSize, debounce]);
  const chartContent = (0, _uiApi.useMemo)(() => {
    const {
      containerWidth,
      containerHeight
    } = sizes;
    if (containerWidth < 0 || containerHeight < 0) {
      return null;
    }
    let calculatedWidth = _getContainerDimension(width, containerWidth),
      calculatedHeight = _getContainerDimension(height, containerHeight);
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
    return _uiApi.Children.map(children, child => {
      return (0, _uiApi.cloneUiElement)(child, {
        width: calculatedWidth,
        height: calculatedHeight,
        // calculate the actual size and override it.
        style: {
          width: calculatedWidth,
          height: calculatedHeight,
          ...child.props.style
        }
      });
    });
  }, [aspect, children, height, maxHeight, sizes, width]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    ref: _refContainer,
    id: id ? id : void 0,
    className: (0, _styleFn.crCn)("recharts-responsive-container", className),
    style: {
      ...style,
      width,
      height,
      minWidth,
      minHeight,
      maxHeight
    },
    children: chartContent
  });
};
exports.ResponsiveContainer = ResponsiveContainer;
//# sourceMappingURL=ResponsiveContainer.js.map