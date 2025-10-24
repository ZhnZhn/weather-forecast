import {
  isNumber,
  isFn,
  isNullOrUndef
} from "../../../utils/isTypeFn";

import {
  isValidElement,
  cloneUiElement,
  createElement,
  useRef,
  useState,
  useCallback,
  useEffect,
  crProps,
  setDisplayNameTo
} from "../../uiApi";

import { crCn } from "../../styleFn";


import { IS_SSR } from "../util/Global";

import { DefaultTooltipContent } from "./DefaultTooltipContent";
import { getUniqPayload } from "./componentFn";

import { CL_TOOLTIP_WRAPPER } from "../CL";

//const CLS_PREFIX = 'recharts-tooltip-wrapper';
const EPS = 1;
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
}

export const Tooltip = (props) => {
  const [
    boxWidth,
    setBoxWidth
  ] = useState(-1)
  , [
    boxHeight,
    setBoxHeight
  ] = useState(-1)
  , [
    dismissed,
    setDismissed
  ] = useState(false)
  , [
    dismissedAtCoordinate,
    setDismissedAtCoordinate
  ] = useState({ x: 0, y: 0 })
  , wrapperNode = useRef()
  , _props = crProps(DF_PROPS, props)
  , {
    allowEscapeViewBox,
    reverseDirection,
    coordinate = DF_PROPS.coordinate,
    offset,
    position,
    viewBox
  } = _props
  , handleKeyDown = useCallback((event) => {
      if (event.key === "Escape") {
        setDismissed(true);
        setDismissedAtCoordinate(prev => ({
          ...prev,
          x: coordinate.x,
          y: coordinate.y
        }));
      }
  }, [coordinate.x, coordinate.y]);

  useEffect(() => {
    const updateBBox = () => {
      if (dismissed) {
        document.removeEventListener("keydown", handleKeyDown);
        if (coordinate.x !== dismissedAtCoordinate.x || coordinate.y !== dismissedAtCoordinate.y) {
          setDismissed(false);
        }
      } else {
        document.addEventListener("keydown", handleKeyDown);
      }

      if (wrapperNode.current && wrapperNode.current.getBoundingClientRect) {
        const box = wrapperNode.current.getBoundingClientRect();
        if (Math.abs(box.width - boxWidth) > EPS || Math.abs(box.height - boxHeight) > EPS) {
          setBoxWidth(box.width);
          setBoxHeight(box.height);
        }
      } else if (boxWidth !== -1 || boxHeight !== -1) {
        setBoxWidth(-1);
        setBoxHeight(-1);
      }
    };

    updateBBox();
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    boxHeight,
    boxWidth,
    coordinate.x,
    coordinate.y,
    dismissed,
    dismissedAtCoordinate.x,
    dismissedAtCoordinate.y,
    handleKeyDown
  ]);

  const getTranslate = ({
    key,
    tooltipDimension,
    viewBoxDimension
  }) => {
    if (position && isNumber(position[key])) {
      return position[key];
    }
    const negative = coordinate[key] - tooltipDimension - offset
    , positive = coordinate[key] + offset;
    if (allowEscapeViewBox?.[key]) {
      return reverseDirection[key]
        ? negative
        : positive;
    }
    if (reverseDirection?.[key]) {
      const tooltipBoundary = negative
      , viewBoxBoundary = viewBox[key];
      return tooltipBoundary < viewBoxBoundary
        ? Math.max(positive, viewBox[key])
        : Math.max(negative, viewBox[key]);
    }
    const tooltipBoundary = positive + tooltipDimension
    , viewBoxBoundary = viewBox[key] + viewBoxDimension;
    return tooltipBoundary > viewBoxBoundary
      ? Math.max(negative, viewBox[key])
      : Math.max(positive, viewBox[key]);
  };

  const {
    payload,
    payloadUniqBy,
    filterNull,
    active,
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
    visibility: !dismissed && active && hasPayload ? "visible" : "hidden",
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
  } else if (boxWidth > 0 && boxHeight > 0 && coordinate) {
    translateX = getTranslate({
      key: "x",
      tooltipDimension: boxWidth,
      viewBoxDimension: viewBox.width,
    });
    translateY = getTranslate({
      key: "y",
      tooltipDimension: boxHeight,
      viewBoxDimension: viewBox.height,
    });
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
  const _className = _crClassName(
    coordinate,
    translateX,
    translateY
  );

  return (
    <div
      tabIndex={-1}
      role="dialog"
      className={_className}
      style={outerStyle}
      ref={wrapperNode}
    >
      {_renderContent(content, {
          ..._props,
          payload: finalPayload
      })}
    </div>
  );
};

// needs to be set so that renderByOrder can find the correct handler function
setDisplayNameTo(Tooltip, "Tooltip")
/**
 * needs to be set so that renderByOrder can access an have default values for
 * children.props when there are no props set by the consumer
 * doesn't work if using default parameters
 */
//Tooltip.defaultProps = DF_PROPS;
