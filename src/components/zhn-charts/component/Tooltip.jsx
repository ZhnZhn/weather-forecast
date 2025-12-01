import {
  isNumber,
  isFn,
  isNullOrUndef
} from "../../../utils/isTypeFn";

import {
  isValidElement,
  cloneUiElement,
  createElement,
  useCallback,
  useEffect,
  crProps,
  setDisplayNameTo
} from "../../uiApi";

import { crCn } from "../../styleFn";


import { IS_SSR } from "../util/Global";
import { useTooltip } from "../context/TooltipContext";

import { DefaultTooltipContent } from "./DefaultTooltipContent";
import { getUniqPayload } from "./componentFn";

import { CL_TOOLTIP_WRAPPER } from "../CL";

//const CLS_PREFIX = 'recharts-tooltip-wrapper';
const _defaultUniqBy = (
  entry
) => entry.dataKey;

const _renderContent = (
  ContentElementOrComp,
  props
) => isValidElement(ContentElementOrComp)
  ? cloneUiElement(ContentElementOrComp, props)
  : isFn(ContentElementOrComp)
      ? createElement(ContentElementOrComp, props)
      : createElement(DefaultTooltipContent, props);

const DF_PROPS = {
  active: false,
  allowEscapeViewBox: { x: false, y: false },
  reverseDirection: { x: false, y: false },
  offset: 10,
  viewBox: { x: 0, y: 0, height: 0, width: 0 },
  coordinate: { x: 0, y: 0 },
  // this doesn't exist on TooltipProps
  cursorStyle: {},
  separator: ' : ',
  wrapperStyle: {},
  contentStyle: {},
  itemStyle: {},
  labelStyle: {},
  cursor: true,
  trigger: "hover",
  isAnimationActive: !IS_SSR,
  animationEasing: "ease",
  animationDuration: 400,
  filterNull: true,
  useTranslate3d: false
};

const _crClassName = (
  coordinate,
  translateX,
  translateY
) => {
  const _isTranslateCoordinateX = isNumber(translateX)
    && coordinate
    && isNumber(coordinate.x)
  , _isTranslateCoordinateY = isNumber(translateY)
    && coordinate
    && isNumber(coordinate.y)
  , _clX = _isTranslateCoordinateX ? crCn(
    translateX >= coordinate.x && `${CL_TOOLTIP_WRAPPER}-right`,
    translateX < coordinate.x && `${CL_TOOLTIP_WRAPPER}-left`
  ) : ''
  , _clY = _isTranslateCoordinateY ? crCn(
    translateY >= coordinate.y && `${CL_TOOLTIP_WRAPPER}-bottom`,
    translateY < coordinate.y && `${CL_TOOLTIP_WRAPPER}-top`
  ) : ''
  return crCn(CL_TOOLTIP_WRAPPER, crCn(_clX, _clY));
};

export const Tooltip = (props) => {
  const {
    isTooltipActive: active,
    activeLabel: label,
    activePayload,
    activeCoordinate: coordinate = DF_PROPS.coordinate,
  } = useTooltip()
  , payload = active ? activePayload : []
  , _props = crProps(DF_PROPS, props)
  , {
    onClose
  } = _props
  , handleKeyDown = useCallback((evt) => {
      if (evt.key === "Escape") {
        onClose()
      }
  }, [onClose]);

  let position = _props.position;
  position = coordinate

  useEffect(() => {
    if (active) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    active,
    handleKeyDown
  ]);

  const {
    payloadUniqBy,
    filterNull,
    wrapperStyle,
    useTranslate3d,
    isAnimationActive,
    animationDuration,
    animationEasing
  } = _props
  , finalPayload = getUniqPayload(
      payloadUniqBy,
      filterNull && payload && payload.length
         ? payload.filter(entry => !isNullOrUndef(entry.value))
         : payload,
      _defaultUniqBy
  )
  , hasPayload = finalPayload && finalPayload.length
  , { content } = _props;
  let outerStyle = {
    pointerEvents: "none",
    visibility: active && hasPayload ? "visible" : "hidden",
    position: "absolute",
    top: 0,
    left: 0,
    ...wrapperStyle
  }
  , translateX
  , translateY;

  if (position && isNumber(position.x) && isNumber(position.y)) {
    translateX = position.x;
    translateY = position.y;
  } else {
    outerStyle.visibility = "hidden";
  }
  outerStyle = {
    ...{
      transform: useTranslate3d
        ? `translate3d(${translateX}px, ${translateY}px, 0)`
        : `translate(${translateX}px, ${translateY}px)`,
    },
    ...outerStyle
  };
  if (isAnimationActive && active) {
    outerStyle = {
      ...{
        transition: `transform ${animationDuration}ms ${animationEasing}`,
      },
      ...outerStyle
    };
  }

  return (
    <div
      className={_crClassName(
        coordinate,
        translateX,
        translateY
      )}
      style={outerStyle}
      tabIndex={-1}
      role="dialog"
    >
      {_renderContent(content, {
          ..._props,
          active,
          label,
          payload: finalPayload
      })}
    </div>
  );
};

// needs to be set so that renderByOrder can find the correct handler function
setDisplayNameTo(Tooltip, "Tooltip")
