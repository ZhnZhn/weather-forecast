import {
  isFn,
  isNumber
} from "../../../utils/isTypeFn";

import {
  isValidElement,
  cloneUiElement,
  createElement,
  memo,
  useRef,
  useLayoutEffect,
  crProps,
  getRefValue,
  setRefValue
} from "../../uiApi";

import {
  isLayoutHorizontal,
  isLayoutVertical
} from "../util/ChartUtils";

import { getUniqPayload } from "./componentFn";
import { DefaultLegendContent } from "./DefaultLegendContent";

const CL_LEGEND_WRAPPER = "recharts-legend-wrapper" ;

const _defaultUniqBy = (
  entry
) => entry.value;

const _renderContent = (
  ContentElementOrComp,
  props
) => isValidElement(ContentElementOrComp)
  ? cloneUiElement(ContentElementOrComp, props)
  : isFn(ContentElementOrComp)
  ? createElement(ContentElementOrComp, props)
  : (<DefaultLegendContent {...props} />)


const _getBBoxSnapshot = (boundingBox) => {
  const {
    width,
    height
  } = boundingBox;
  return width >= 0 && height >= 0
    ? { width, height }
    : { width: 0, height: 0};
};

const _getDefaultPosition = (
  style,
  props,
  boundingBox
) => {
  const {
    layout,
    align,
    verticalAlign,
    margin,
    chartWidth,
    chartHeight
  } = props;

  let hPos, vPos;

  if (!style || (style.left == null && style.right == null)) {
    hPos = align === "center" && isLayoutVertical(layout)
      ? { left: ((chartWidth || 0) - _getBBoxSnapshot(boundingBox).width) / 2 }
      : align === "right"
      ? { right: (margin && margin.right) || 0 }
      : { left: (margin && margin.left) || 0 };
  }
  if (!style || (style.top == null && style.bottom == null)) {
    vPos = verticalAlign === "middle"
      ? { top: ((chartHeight || 0) - _getBBoxSnapshot(boundingBox).height) / 2}
      : verticalAlign === "bottom"
      ? { bottom: (margin && margin.bottom) || 0 }
      : { top: (margin && margin.top) || 0 };
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

export const Legend = memo((props) => {
  const _props = crProps(LEGEND_DF_PROPS, props)
  , _refBoundingBox = useRef({
    width: -1,
    height: -1
  })
  , _refWrapperNode = useRef();

  useLayoutEffect(() => {
    const {
      width,
      height
    } = getRefValue(_refBoundingBox)
    , {
      onBBoxUpdate
    } = _props
    , _wrapperNode = getRefValue(_refWrapperNode);

    if (_wrapperNode && _wrapperNode.getBoundingClientRect) {
      const box = _wrapperNode.getBoundingClientRect();
      if (_mathAbs(box.width - width) > EPS || _mathAbs(box.height - height) > EPS) {
        setRefValue(_refBoundingBox, {
          width: box.width,
          height: box.height
        })
        if (onBBoxUpdate) {
          onBBoxUpdate(box);
        }
      }
    } else if (width !== -1 || height !== -1) {
      setRefValue(_refBoundingBox, {
        width: -1,
        height: -1
      })
      if (onBBoxUpdate) {
        onBBoxUpdate(null);
      }
    }
  })

  const {
    content,
    width,
    height,
    wrapperStyle,
    payloadUniqBy,
    payload
  } = _props
  , outerStyle = {
     position: "absolute",
     width: width || "auto",
     height: height || "auto",
     ..._getDefaultPosition(wrapperStyle, _props, getRefValue(_refBoundingBox)),
     ...wrapperStyle
  };

  return (
    <div
      className={CL_LEGEND_WRAPPER}
      style={outerStyle}
      ref={_refWrapperNode}
    >
      {_renderContent(
         content, {
         ..._props,
         payload: getUniqPayload(payloadUniqBy, payload, _defaultUniqBy)
      })}
    </div>
  );
})

Legend.displayName = "Legend";
Legend.defaultProps = LEGEND_DF_PROPS
Legend.getWithHeight = (
  { props },
  chartWidth
) => {
  const {
    layout,
    height
  } = props;
  return isLayoutVertical(layout) && isNumber(height)
    ? { height }
    : isLayoutHorizontal(layout)
    ? { width: props.width || chartWidth }
    : null;
};
