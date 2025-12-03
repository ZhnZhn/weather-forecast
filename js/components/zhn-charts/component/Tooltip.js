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
  const {
      isTooltipActive: active,
      activeLabel: label,
      activePayload,
      activeCoordinate: coordinate = DF_PROPS.coordinate
    } = (0, _TooltipContext.useTooltip)(),
    payload = active ? activePayload : [],
    _props = (0, _uiApi.crProps)(DF_PROPS, props),
    {
      payloadUniqBy,
      filterNull,
      wrapperStyle,
      useTranslate3d,
      isAnimationActive,
      animationDuration,
      animationEasing,
      content,
      onClose
    } = _props,
    handleKeyDown = (0, _uiApi.useCallback)(evt => {
      if (evt.key === "Escape") {
        onClose();
      }
    }, [onClose]),
    finalPayload = (0, _componentFn.getUniqPayload)(payloadUniqBy, filterNull && (0, _isTypeFn.isNotEmptyArr)(payload) ? payload.filter(entry => entry.value != null) : payload, _defaultUniqBy),
    _isTranslate = coordinate && (0, _isTypeFn.isNumber)(coordinate.x) && (0, _isTypeFn.isNumber)(coordinate.y),
    [_translateX, _translateY] = _isTranslate ? [coordinate.x, coordinate.y] : [],
    outerStyle = Object.assign({
      position: "absolute",
      top: 0,
      left: 0,
      pointerEvents: "none",
      visibility: active && (0, _isTypeFn.isNotEmptyArr)(finalPayload) ? "visible" : "hidden"
    }, wrapperStyle, _isTranslate ? {
      transform: useTranslate3d ? "translate3d(" + _translateX + "px, " + _translateY + "px, 0)" : "translate(" + _translateX + "px, " + _translateY + "px)"
    } : {
      visibility: "hidden"
    }, _isTranslate && isAnimationActive && active ? {
      transition: "transform " + animationDuration + "ms " + animationEasing
    } : void 0);
  (0, _uiApi.useEffect)(() => {
    if (active) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [active, handleKeyDown]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: _crClassName(coordinate, _translateX, _translateY),
    style: outerStyle,
    tabIndex: -1,
    role: "dialog",
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
//# sourceMappingURL=Tooltip.js.map