"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.Tooltip = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _uiApi = require("../../uiApi");
var _classnames = _interopRequireDefault(require("classnames"));
var _zhnAnimate = require("../../zhn-animate");
var _FnUtils = require("../util/FnUtils");
var _DefaultTooltipContent = require("./DefaultTooltipContent");
var _Global = require("../util/Global");
var _DataUtils = require("../util/DataUtils");
var _componentFn = require("./componentFn");
var _jsxRuntime = require("react/jsx-runtime");
var CLS_PREFIX = 'recharts-tooltip-wrapper';
var EPS = 1;
var _defaultUniqBy = function _defaultUniqBy(entry) {
  return entry.dataKey;
};
var _renderContent = function _renderContent(content, props) {
  if ((0, _uiApi.isValidElement)(content)) {
    return (0, _uiApi.cloneElement)(content, props);
  }
  if ((0, _FnUtils._isFn)(content)) {
    return (0, _uiApi.createElement)(content, props);
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_DefaultTooltipContent.DefaultTooltipContent, (0, _extends2["default"])({}, props));
};
var tooltipDefaultProps = {
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
  trigger: 'hover',
  isAnimationActive: !_Global.Global.isSsr,
  animationEasing: 'ease',
  animationDuration: 400,
  filterNull: true,
  useTranslate3d: false
};
var Tooltip = function Tooltip(props) {
  var _classNames;
  var _useState = (0, _uiApi.useState)(-1),
    boxWidth = _useState[0],
    setBoxWidth = _useState[1],
    _useState2 = (0, _uiApi.useState)(-1),
    boxHeight = _useState2[0],
    setBoxHeight = _useState2[1],
    _useState3 = (0, _uiApi.useState)(false),
    dismissed = _useState3[0],
    setDismissed = _useState3[1],
    _useState4 = (0, _uiApi.useState)({
      x: 0,
      y: 0
    }),
    dismissedAtCoordinate = _useState4[0],
    setDismissedAtCoordinate = _useState4[1],
    wrapperNode = (0, _uiApi.useRef)(),
    allowEscapeViewBox = props.allowEscapeViewBox,
    reverseDirection = props.reverseDirection,
    coordinate = props.coordinate,
    offset = props.offset,
    position = props.position,
    viewBox = props.viewBox,
    handleKeyDown = (0, _uiApi.useCallback)(function (event) {
      if (event.key === 'Escape') {
        setDismissed(true);
        setDismissedAtCoordinate(function (prev) {
          return (0, _extends2["default"])({}, prev, {
            x: coordinate.x,
            y: coordinate.y
          });
        });
      }
    }, [coordinate.x, coordinate.y]);
  (0, _uiApi.useEffect)(function () {
    var updateBBox = function updateBBox() {
      if (dismissed) {
        document.removeEventListener('keydown', handleKeyDown);
        if (coordinate.x !== dismissedAtCoordinate.x || coordinate.y !== dismissedAtCoordinate.y) {
          setDismissed(false);
        }
      } else {
        document.addEventListener('keydown', handleKeyDown);
      }
      if (wrapperNode.current && wrapperNode.current.getBoundingClientRect) {
        var box = wrapperNode.current.getBoundingClientRect();
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
    return function () {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [boxHeight, boxWidth, coordinate.x, coordinate.y, dismissed, dismissedAtCoordinate.x, dismissedAtCoordinate.y, handleKeyDown]);
  var getTranslate = function getTranslate(_ref) {
    var key = _ref.key,
      tooltipDimension = _ref.tooltipDimension,
      viewBoxDimension = _ref.viewBoxDimension;
    if (position && (0, _DataUtils.isNumber)(position[key])) {
      return position[key];
    }
    var negative = coordinate[key] - tooltipDimension - offset,
      positive = coordinate[key] + offset;
    if (allowEscapeViewBox != null && allowEscapeViewBox[key]) {
      return reverseDirection[key] ? negative : positive;
    }
    if (reverseDirection != null && reverseDirection[key]) {
      var _tooltipBoundary = negative,
        _viewBoxBoundary = viewBox[key];
      return _tooltipBoundary < _viewBoxBoundary ? Math.max(positive, viewBox[key]) : Math.max(negative, viewBox[key]);
    }
    var tooltipBoundary = positive + tooltipDimension,
      viewBoxBoundary = viewBox[key] + viewBoxDimension;
    return tooltipBoundary > viewBoxBoundary ? Math.max(negative, viewBox[key]) : Math.max(positive, viewBox[key]);
  };
  var payload = props.payload,
    payloadUniqBy = props.payloadUniqBy,
    filterNull = props.filterNull,
    active = props.active,
    wrapperStyle = props.wrapperStyle,
    useTranslate3d = props.useTranslate3d,
    isAnimationActive = props.isAnimationActive,
    animationDuration = props.animationDuration,
    animationEasing = props.animationEasing,
    finalPayload = (0, _componentFn.getUniqPayload)(payloadUniqBy, filterNull && payload && payload.length ? payload.filter(function (entry) {
      return !(0, _FnUtils._isNil)(entry.value);
    }) : payload, _defaultUniqBy),
    hasPayload = finalPayload && finalPayload.length,
    content = props.content;
  var outerStyle = (0, _extends2["default"])({
      pointerEvents: 'none',
      visibility: !dismissed && active && hasPayload ? 'visible' : 'hidden',
      position: 'absolute',
      top: 0,
      left: 0
    }, wrapperStyle),
    translateX,
    translateY;
  if (position && (0, _DataUtils.isNumber)(position.x) && (0, _DataUtils.isNumber)(position.y)) {
    translateX = position.x;
    translateY = position.y;
  } else if (boxWidth > 0 && boxHeight > 0 && coordinate) {
    translateX = getTranslate({
      key: 'x',
      tooltipDimension: boxWidth,
      viewBoxDimension: viewBox.width
    });
    translateY = getTranslate({
      key: 'y',
      tooltipDimension: boxHeight,
      viewBoxDimension: viewBox.height
    });
  } else {
    outerStyle.visibility = 'hidden';
  }
  outerStyle = (0, _extends2["default"])({}, (0, _zhnAnimate.translateStyle)({
    transform: useTranslate3d ? "translate3d(" + translateX + "px, " + translateY + "px, 0)" : "translate(" + translateX + "px, " + translateY + "px)"
  }), outerStyle);
  if (isAnimationActive && active) {
    outerStyle = (0, _extends2["default"])({}, (0, _zhnAnimate.translateStyle)({
      transition: "transform " + animationDuration + "ms " + animationEasing
    }), outerStyle);
  }
  var cls = (0, _classnames["default"])(CLS_PREFIX, (_classNames = {}, _classNames[CLS_PREFIX + "-right"] = (0, _DataUtils.isNumber)(translateX) && coordinate && (0, _DataUtils.isNumber)(coordinate.x) && translateX >= coordinate.x, _classNames[CLS_PREFIX + "-left"] = (0, _DataUtils.isNumber)(translateX) && coordinate && (0, _DataUtils.isNumber)(coordinate.x) && translateX < coordinate.x, _classNames[CLS_PREFIX + "-bottom"] = (0, _DataUtils.isNumber)(translateY) && coordinate && (0, _DataUtils.isNumber)(coordinate.y) && translateY >= coordinate.y, _classNames[CLS_PREFIX + "-top"] = (0, _DataUtils.isNumber)(translateY) && coordinate && (0, _DataUtils.isNumber)(coordinate.y) && translateY < coordinate.y, _classNames));
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    tabIndex: -1,
    role: "dialog",
    className: cls,
    style: outerStyle,
    ref: wrapperNode,
    children: _renderContent(content, (0, _extends2["default"])({}, props, {
      payload: finalPayload
    }))
  });
};

// needs to be set so that renderByOrder can find the correct handler function
exports.Tooltip = Tooltip;
Tooltip.displayName = 'Tooltip';
/**
 * needs to be set so that renderByOrder can access an have default values for
 * children.props when there are no props set by the consumer
 * doesn't work if using default parameters
 */
Tooltip.defaultProps = tooltipDefaultProps;
//# sourceMappingURL=Tooltip.js.map