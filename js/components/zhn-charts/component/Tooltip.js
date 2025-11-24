"use strict";

exports.__esModule = true;
exports.Tooltip = void 0;
var _isTypeFn = require("../../../utils/isTypeFn");
var _uiApi = require("../../uiApi");
var _styleFn = require("../../styleFn");
var _Global = require("../util/Global");
var _TooltipContext = require("../context/TooltipContext");
var _DefaultTooltipContent = require("./DefaultTooltipContent");
var _componentFn = require("./componentFn");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
//const CLS_PREFIX = 'recharts-tooltip-wrapper';
const EPS = 1;
const _defaultUniqBy = entry => entry.dataKey;
const _renderContent = (ContentElementOrComp, props) => (0, _uiApi.isValidElement)(ContentElementOrComp) ? (0, _uiApi.cloneUiElement)(ContentElementOrComp, props) : (0, _isTypeFn.isFn)(ContentElementOrComp) ? (0, _uiApi.createElement)(ContentElementOrComp, props) : (0, _uiApi.createElement)(_DefaultTooltipContent.DefaultTooltipContent, props);
const DF_PROPS = {
  active: false,
  allowEscapeViewBox: {
    x: false,
    y: false
  },
  reverseDirection: {
    x: false,
    y: false
  },
  offset: 10,
  viewBox: {
    x: 0,
    y: 0,
    height: 0,
    width: 0
  },
  coordinate: {
    x: 0,
    y: 0
  },
  // this doesn't exist on TooltipProps
  cursorStyle: {},
  separator: ' : ',
  wrapperStyle: {},
  contentStyle: {},
  itemStyle: {},
  labelStyle: {},
  cursor: true,
  trigger: "hover",
  isAnimationActive: !_Global.IS_SSR,
  animationEasing: "ease",
  animationDuration: 400,
  filterNull: true,
  useTranslate3d: false
};
const _crClassName = (coordinate, translateX, translateY) => {
  const _isTranslateCoordinateX = (0, _isTypeFn.isNumber)(translateX) && coordinate && (0, _isTypeFn.isNumber)(coordinate.x),
    _isTranslateCoordinateY = (0, _isTypeFn.isNumber)(translateY) && coordinate && (0, _isTypeFn.isNumber)(coordinate.y),
    _clX = _isTranslateCoordinateX ? (0, _styleFn.crCn)(translateX >= coordinate.x && _CL.CL_TOOLTIP_WRAPPER + "-right", translateX < coordinate.x && _CL.CL_TOOLTIP_WRAPPER + "-left") : '',
    _clY = _isTranslateCoordinateY ? (0, _styleFn.crCn)(translateY >= coordinate.y && _CL.CL_TOOLTIP_WRAPPER + "-bottom", translateY < coordinate.y && _CL.CL_TOOLTIP_WRAPPER + "-top") : '';
  return (0, _styleFn.crCn)(_CL.CL_TOOLTIP_WRAPPER, (0, _styleFn.crCn)(_clX, _clY));
};
const Tooltip = props => {
  const [boxWidth, setBoxWidth] = (0, _uiApi.useState)(-1),
    [boxHeight, setBoxHeight] = (0, _uiApi.useState)(-1),
    [dismissed, setDismissed] = (0, _uiApi.useState)(false),
    [dismissedAtCoordinate, setDismissedAtCoordinate] = (0, _uiApi.useState)({
      x: 0,
      y: 0
    }),
    wrapperNode = (0, _uiApi.useRef)(),
    {
      isTooltipActive: active,
      activeLabel: label,
      activePayload,
      activeCoordinate: coordinate = DF_PROPS.coordinate
    } = (0, _TooltipContext.useTooltip)(),
    payload = active ? activePayload : [],
    _props = (0, _uiApi.crProps)(DF_PROPS, props),
    {
      allowEscapeViewBox,
      reverseDirection,
      offset,
      viewBox
    } = _props,
    handleKeyDown = (0, _uiApi.useCallback)(event => {
      if (event.key === "Escape") {
        setDismissed(true);
        setDismissedAtCoordinate(prev => Object.assign({}, prev, {
          x: coordinate.x,
          y: coordinate.y
        }));
      }
    }, [coordinate.x, coordinate.y]);
  let position = _props.position;
  position = coordinate;
  (0, _uiApi.useEffect)(() => {
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
  }, [boxHeight, boxWidth, coordinate.x, coordinate.y, dismissed, dismissedAtCoordinate.x, dismissedAtCoordinate.y, handleKeyDown]);
  const getTranslate = _ref => {
    let {
      key,
      tooltipDimension,
      viewBoxDimension
    } = _ref;
    if (position && (0, _isTypeFn.isNumber)(position[key])) {
      return position[key];
    }
    const negative = coordinate[key] - tooltipDimension - offset,
      positive = coordinate[key] + offset;
    if (allowEscapeViewBox != null && allowEscapeViewBox[key]) {
      return reverseDirection[key] ? negative : positive;
    }
    if (reverseDirection != null && reverseDirection[key]) {
      const tooltipBoundary = negative,
        viewBoxBoundary = viewBox[key];
      return tooltipBoundary < viewBoxBoundary ? Math.max(positive, viewBox[key]) : Math.max(negative, viewBox[key]);
    }
    const tooltipBoundary = positive + tooltipDimension,
      viewBoxBoundary = viewBox[key] + viewBoxDimension;
    return tooltipBoundary > viewBoxBoundary ? Math.max(negative, viewBox[key]) : Math.max(positive, viewBox[key]);
  };
  const {
      payloadUniqBy,
      filterNull,
      wrapperStyle,
      useTranslate3d,
      isAnimationActive,
      animationDuration,
      animationEasing
    } = _props,
    finalPayload = (0, _componentFn.getUniqPayload)(payloadUniqBy, filterNull && payload && payload.length ? payload.filter(entry => !(0, _isTypeFn.isNullOrUndef)(entry.value)) : payload, _defaultUniqBy),
    hasPayload = finalPayload && finalPayload.length,
    {
      content
    } = _props;
  let outerStyle = Object.assign({
      pointerEvents: "none",
      visibility: !dismissed && active && hasPayload ? "visible" : "hidden",
      position: "absolute",
      top: 0,
      left: 0
    }, wrapperStyle),
    translateX,
    translateY;
  if (position && (0, _isTypeFn.isNumber)(position.x) && (0, _isTypeFn.isNumber)(position.y)) {
    translateX = position.x;
    translateY = position.y;
  } else if (boxWidth > 0 && boxHeight > 0 && coordinate) {
    translateX = getTranslate({
      key: "x",
      tooltipDimension: boxWidth,
      viewBoxDimension: viewBox.width
    });
    translateY = getTranslate({
      key: "y",
      tooltipDimension: boxHeight,
      viewBoxDimension: viewBox.height
    });
  } else {
    outerStyle.visibility = "hidden";
  }
  outerStyle = Object.assign({}, {
    transform: useTranslate3d ? "translate3d(" + translateX + "px, " + translateY + "px, 0)" : "translate(" + translateX + "px, " + translateY + "px)"
  }, outerStyle);
  if (isAnimationActive && active) {
    outerStyle = Object.assign({}, {
      transition: "transform " + animationDuration + "ms " + animationEasing
    }, outerStyle);
  }
  const _className = _crClassName(coordinate, translateX, translateY);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    tabIndex: -1,
    role: "dialog",
    className: _className,
    style: outerStyle,
    ref: wrapperNode,
    children: _renderContent(content, Object.assign({}, _props, {
      active,
      label,
      payload: finalPayload
    }))
  });
};

// needs to be set so that renderByOrder can find the correct handler function
exports.Tooltip = Tooltip;
(0, _uiApi.setDisplayNameTo)(Tooltip, "Tooltip");
/**
 * needs to be set so that renderByOrder can access an have default values for
 * children.props when there are no props set by the consumer
 * doesn't work if using default parameters
 */
//Tooltip.defaultProps = DF_PROPS;
//# sourceMappingURL=Tooltip.js.map