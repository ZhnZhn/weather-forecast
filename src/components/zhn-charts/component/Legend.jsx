import { isFn } from "../../../utils/isTypeFn";

import {
  isValidElement,
  cloneUiElement,
  createElement,
  memo,
  useRef,
  useLayoutEffect,
  crProps,
  getRefValue,
  setRefValue,
  setDisplayNameTo
} from "../../uiApi";

import { isLayoutVertical } from "../util/ChartUtils";

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

const _getBBoxSnapshot = ({
  width,
  height
}) => width >= 0 && height >= 0
  ? { width, height }
  : { width: 0, height: 0 };

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
      ? { left: (chartWidth - boundingBox.width) / 2 }
      : align === "right"
      ? { right: margin.right || 0 }
      : { left: margin.left || 0 };
  }
  if (!style || (style.top == null && style.bottom == null)) {
    vPos = verticalAlign === "middle"
      ? { top: (chartHeight - boundingBox.height) / 2}
      : verticalAlign === "bottom"
      ? { bottom: margin.bottom || 0 }
      : { top: margin.top || 0 };
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
  , {
    content,
    width,
    height,
    wrapperStyle,
    payloadUniqBy,
    payload
  } = _props
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
        setRefValue(_refBoundingBox, _getBBoxSnapshot(box))
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
  })

  return (
    <div
      ref={_refWrapperNode}
      className={CL_LEGEND_WRAPPER}
      style={{
         position: "absolute",
         width: width || "auto",
         height: height || "auto",
         ..._getDefaultPosition(wrapperStyle, _props, getRefValue(_refBoundingBox)),
         ...wrapperStyle
      }}
    >
      {_renderContent(
         content, {
         ..._props,
         payload: getUniqPayload(payloadUniqBy, payload, _defaultUniqBy)
      })}
    </div>
  );
})

setDisplayNameTo(Legend, "Legend", LEGEND_DF_PROPS)
