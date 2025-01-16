import {
  isValidElement,
  cloneUiElement,
  createElement,
  memo,
  useRef,
  useLayoutEffect,
  getRefValue,
  setRefValue
} from "../../uiApi";

import { _isFn } from "../util/FnUtils";
import { isNumber } from "../util/DataUtils";
import { crProps } from "../util/ReactUtils";

import { getUniqPayload } from "./componentFn";
import { DefaultLegendContent } from "./DefaultLegendContent";

const CL_LEGEND_WRAPPER = "recharts-legend-wrapper" ;

const _defaultUniqBy = (
  entry
) => entry.value;

const _renderContent = (
  ContentElementOrComp,
  props
) => {
  if (isValidElement(ContentElementOrComp)) {
    return cloneUiElement(ContentElementOrComp, props);
  }
  if (_isFn(ContentElementOrComp)) {
    return createElement(ContentElementOrComp, props);
  }
  /*eslint-disable no-unused-vars*/
  const {
    ref,
    ...restProps
  } = props;
  //ref
  /*eslint-enable no-unused-vars*/
  return (
    <DefaultLegendContent {...restProps} />
  );
};

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
    if (align === "center" && layout === "vertical") {
      const box = _getBBoxSnapshot(boundingBox);
      hPos = { left: ((chartWidth || 0) - box.width) / 2 };
    } else {
      hPos = align === "right"
        ? { right: (margin && margin.right) || 0 }
        : { left: (margin && margin.left) || 0 };
    }
  }
  if (!style || (style.top == null && style.bottom == null)) {
    if (verticalAlign === "middle") {
      const box = _getBBoxSnapshot(boundingBox);
      vPos = {
        top: ((chartHeight || 0) - box.height) / 2
      };
    } else {
       vPos = verticalAlign === "bottom"
         ? { bottom: (margin && margin.bottom) || 0 }
         : { top: (margin && margin.top) || 0 };
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
  item,
  chartWidth
) => {
  const {
    layout,
    height
  } = item.props;
  return layout === "vertical" && isNumber(height)
    ? { height }
    : layout === "horizontal"
      ? { width: item.props.width || chartWidth }
      : null;
};
