"use strict";

exports.__esModule = true;
exports.Legend = void 0;
var _uiApi = require("../../uiApi");
var _FnUtils = require("../util/FnUtils");
var _DataUtils = require("../util/DataUtils");
var _ReactUtils = require("../util/ReactUtils");
var _componentFn = require("./componentFn");
var _DefaultLegendContent = require("./DefaultLegendContent");
var _jsxRuntime = require("react/jsx-runtime");
const CL_LEGEND_WRAPPER = "recharts-legend-wrapper";
const _defaultUniqBy = entry => entry.value;
const _renderContent = (ContentElementOrComp, props) => {
  if ((0, _uiApi.isValidElement)(ContentElementOrComp)) {
    return (0, _uiApi.cloneUiElement)(ContentElementOrComp, props);
  }
  if ((0, _FnUtils._isFn)(ContentElementOrComp)) {
    return (0, _uiApi.createElement)(ContentElementOrComp, props);
  }
  /*eslint-disable no-unused-vars*/
  const {
    ref,
    ...restProps
  } = props;
  //ref
  /*eslint-enable no-unused-vars*/
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_DefaultLegendContent.DefaultLegendContent, {
    ...restProps
  });
};
const _getBBoxSnapshot = boundingBox => {
  const {
    width,
    height
  } = boundingBox;
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
    if (align === "center" && layout === "vertical") {
      const box = _getBBoxSnapshot(boundingBox);
      hPos = {
        left: ((chartWidth || 0) - box.width) / 2
      };
    } else {
      hPos = align === "right" ? {
        right: margin && margin.right || 0
      } : {
        left: margin && margin.left || 0
      };
    }
  }
  if (!style || style.top == null && style.bottom == null) {
    if (verticalAlign === "middle") {
      const box = _getBBoxSnapshot(boundingBox);
      vPos = {
        top: ((chartHeight || 0) - box.height) / 2
      };
    } else {
      vPos = verticalAlign === "bottom" ? {
        bottom: margin && margin.bottom || 0
      } : {
        top: margin && margin.top || 0
      };
    }
  }
  return {
    ...hPos,
    ...vPos
  };
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
  const _props = (0, _ReactUtils.crProps)(LEGEND_DF_PROPS, props),
    _refBoundingBox = (0, _uiApi.useRef)({
      width: -1,
      height: -1
    }),
    _refWrapperNode = (0, _uiApi.useRef)();
  (0, _uiApi.useEffect)(() => {
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
        (0, _uiApi.setRefValue)(_refBoundingBox, {
          width: box.width,
          height: box.height
        });
        if (onBBoxUpdate) {
          onBBoxUpdate(box);
        }
      }
    } else if (width !== -1 || height !== -1) {
      (0, _uiApi.setRefValue)(_refBoundingBox, {
        width: -1,
        height: -1
      });
      if (onBBoxUpdate) {
        onBBoxUpdate(null);
      }
    }
  });
  const {
      content,
      width,
      height,
      wrapperStyle,
      payloadUniqBy,
      payload
    } = _props,
    outerStyle = {
      position: "absolute",
      width: width || "auto",
      height: height || "auto",
      ..._getDefaultPosition(wrapperStyle, _props, (0, _uiApi.getRefValue)(_refBoundingBox)),
      ...wrapperStyle
    };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: CL_LEGEND_WRAPPER,
    style: outerStyle,
    ref: _refWrapperNode,
    children: _renderContent(content, {
      ..._props,
      payload: (0, _componentFn.getUniqPayload)(payloadUniqBy, payload, _defaultUniqBy)
    })
  });
});
Legend.displayName = "Legend";
Legend.defaultProps = LEGEND_DF_PROPS;
Legend.getWithHeight = (item, chartWidth) => {
  const {
    layout,
    height
  } = item.props;
  return layout === "vertical" && (0, _DataUtils.isNumber)(height) ? {
    height
  } : layout === "horizontal" ? {
    width: item.props.width || chartWidth
  } : null;
};
//# sourceMappingURL=Legend.js.map