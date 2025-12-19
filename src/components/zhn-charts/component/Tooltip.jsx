import {
  isNumber,
  isFn,
  isNotEmptyArr
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
import { CL_TOOLTIP_WRAPPER } from "../CL";

//const CLS_PREFIX = 'recharts-tooltip-wrapper';

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
    activeCoordinate: coordinate = DF_PROPS.coordinate
  } = useTooltip()
  , payload = active
     ? activePayload
     : []
  , _props = crProps(DF_PROPS, props)
  , {
    filterNull,

    wrapperStyle,
    useTranslate3d,
    isAnimationActive,
    animationDuration,
    animationEasing,

    content,
    onClose
  } = _props
  , handleKeyDown = useCallback(evt => {
      if (evt.key === "Escape") {
        onClose()
      }
  }, [onClose])
  , finalPayload = filterNull && isNotEmptyArr(payload)
    ? payload.filter(entry => entry.value != null)
    : payload
  , _isTranslate = coordinate
    && isNumber(coordinate.x)
    && isNumber(coordinate.y)
  , [
    _translateX,
    _translateY
  ] = _isTranslate
    ? [
      coordinate.x,
      coordinate.y
    ]
    : []

  , outerStyle = {
     position: "absolute",
     top: 0,
     left: 0,
     pointerEvents: "none",
     visibility: active && isNotEmptyArr(finalPayload)
       ? "visible"
       : "hidden",
     ...wrapperStyle,
     ...(_isTranslate ? {
       transform: useTranslate3d
         ? `translate3d(${_translateX}px, ${_translateY}px, 0)`
         : `translate(${_translateX}px, ${_translateY}px)`,
     } : {
       visibility: "hidden"
     }),
     ...(_isTranslate && isAnimationActive && active ? {
       transition: `transform ${animationDuration}ms ${animationEasing}`
     } : void 0)
  };

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

  return (
    <div
      className={_crClassName(
        coordinate,
        _translateX,
        _translateY
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
