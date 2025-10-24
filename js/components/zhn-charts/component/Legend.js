"use strict";

exports.__esModule = true;
exports.Legend = void 0;
var _isTypeFn = require("../../../utils/isTypeFn");
var _uiApi = require("../../uiApi");
var _ChartUtils = require("../util/ChartUtils");
var _componentFn = require("./componentFn");
var _DefaultLegendContent = require("./DefaultLegendContent");
var _jsxRuntime = require("react/jsx-runtime");
const CL_LEGEND_WRAPPER = "recharts-legend-wrapper";
const _defaultUniqBy = entry => entry.value;
const _renderContent = (ContentElementOrComp, props) => (0, _uiApi.isValidElement)(ContentElementOrComp) ? (0, _uiApi.cloneUiElement)(ContentElementOrComp, props) : (0, _isTypeFn.isFn)(ContentElementOrComp) ? (0, _uiApi.createElement)(ContentElementOrComp, props) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_DefaultLegendContent.DefaultLegendContent, Object.assign({}, props));
const _getBBoxSnapshot = _ref => {
  let {
    width,
    height
  } = _ref;
  return width >= 0 && height >= 0 ? {
    width,
    height
  } : {
    width: 0,
    height: 0
  };
};
const _getDefaultPosition = (style, props, boundingBox) => {
  const {
    layout,
    align,
    verticalAlign,
    margin,
    chartWidth,
    chartHeight
  } = props;
  let hPos, vPos;
  if (!style || style.left == null && style.right == null) {
    hPos = align === "center" && (0, _ChartUtils.isLayoutVertical)(layout) ? {
      left: (chartWidth - boundingBox.width) / 2
    } : align === "right" ? {
      right: margin.right || 0
    } : {
      left: margin.left || 0
    };
  }
  if (!style || style.top == null && style.bottom == null) {
    vPos = verticalAlign === "middle" ? {
      top: (chartHeight - boundingBox.height) / 2
    } : verticalAlign === "bottom" ? {
      bottom: margin.bottom || 0
    } : {
      top: margin.top || 0
    };
  }
  return Object.assign({}, hPos, vPos);
};
const EPS = 1;
const _mathAbs = Math.abs;
const LEGEND_DF_PROPS = {
  iconSize: 14,
  layout: "horizontal",
  align: "center",
  verticalAlign: "bottom"
};
const Legend = exports.Legend = (0, _uiApi.memo)(props => {
  const _props = (0, _uiApi.crProps)(LEGEND_DF_PROPS, props),
    {
      content,
      width,
      height,
      wrapperStyle,
      payloadUniqBy,
      payload
    } = _props,
    _refBoundingBox = (0, _uiApi.useRef)({
      width: -1,
      height: -1
    }),
    _refWrapperNode = (0, _uiApi.useRef)();
  (0, _uiApi.useLayoutEffect)(() => {
    const {
        width,
        height
      } = (0, _uiApi.getRefValue)(_refBoundingBox),
      {
        onBBoxUpdate
      } = _props,
      _wrapperNode = (0, _uiApi.getRefValue)(_refWrapperNode);
    if (_wrapperNode && _wrapperNode.getBoundingClientRect) {
      const box = _wrapperNode.getBoundingClientRect();
      if (_mathAbs(box.width - width) > EPS || _mathAbs(box.height - height) > EPS) {
        (0, _uiApi.setRefValue)(_refBoundingBox, _getBBoxSnapshot(box));
        if (onBBoxUpdate) {
          onBBoxUpdate(box);
        }
      }
    } /*else if (width !== -1 || height !== -1) {
      setRefValue(_refBoundingBox, {
        width: -1,
        height: -1
      })
      if (onBBoxUpdate) {
        onBBoxUpdate(null);
      }
      }*/
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    ref: _refWrapperNode,
    className: CL_LEGEND_WRAPPER,
    style: Object.assign({
      position: "absolute",
      width: width || "auto",
      height: height || "auto"
    }, _getDefaultPosition(wrapperStyle, _props, (0, _uiApi.getRefValue)(_refBoundingBox)), wrapperStyle),
    children: _renderContent(content, Object.assign({}, _props, {
      payload: (0, _componentFn.getUniqPayload)(payloadUniqBy, payload, _defaultUniqBy)
    }))
  });
});
(0, _uiApi.setDisplayNameTo)(Legend, "Legend", LEGEND_DF_PROPS);
//# sourceMappingURL=Legend.js.map