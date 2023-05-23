"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.Rectangle = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _uiApi = require("../../uiApi");
var _classnames = _interopRequireDefault(require("classnames"));
var _zhnAnimate = require("../../zhn-animate");
var _ReactUtils = require("../util/ReactUtils");
var _FnUtils = require("../util/FnUtils");
var _RectangleFn = require("./RectangleFn");
var _jsxRuntime = require("react/jsx-runtime");
var CL_RESTANGLE = 'recharts-rectangle';
var Rectangle = (0, _uiApi.memo)(function (props) {
  var _refNode = (0, _uiApi.useRef)(),
    _useState = (0, _uiApi.useState)(-1),
    totalLength = _useState[0],
    setTotalLength = _useState[1];
  (0, _uiApi.useEffect)(function () {
    var _el = (0, _uiApi.getRefValue)(_refNode);
    if (_el && (0, _FnUtils._isFn)(_el.getTotalLength)) {
      try {
        var _totalLength = _el.getTotalLength();
        if (_totalLength) {
          setTotalLength(_totalLength);
        }
      } catch (err) {
        // calculate total length error
      }
    }
  }, []);
  var x = props.x,
    y = props.y,
    width = props.width,
    height = props.height,
    radius = props.radius,
    className = props.className,
    animationEasing = props.animationEasing,
    animationDuration = props.animationDuration,
    animationBegin = props.animationBegin,
    isAnimationActive = props.isAnimationActive,
    isUpdateAnimationActive = props.isUpdateAnimationActive;
  if (x !== +x || y !== +y || width !== +width || height !== +height || width === 0 || height === 0) {
    return null;
  }
  var layerClass = (0, _classnames["default"])(CL_RESTANGLE, className);
  if (!isUpdateAnimationActive) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("path", (0, _extends2["default"])({}, (0, _ReactUtils.filterProps)(props, true), {
      className: layerClass,
      d: (0, _RectangleFn.getRectanglePath)(x, y, width, height, radius)
    }));
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_zhnAnimate.Animate, {
    isActive: isUpdateAnimationActive,
    canBegin: totalLength > 0,
    from: {
      width: width,
      height: height,
      x: x,
      y: y
    },
    to: {
      width: width,
      height: height,
      x: x,
      y: y
    },
    duration: animationDuration,
    animationEasing: animationEasing,
    children: function children(_ref) {
      var currWidth = _ref.width,
        currHeight = _ref.height,
        currX = _ref.x,
        currY = _ref.y;
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_zhnAnimate.Animate, {
        isActive: isAnimationActive,
        canBegin: totalLength > 0,
        from: "0px " + (totalLength === -1 ? 1 : totalLength) + "px",
        to: totalLength + "px 0px",
        attributeName: "strokeDasharray",
        begin: animationBegin,
        duration: animationDuration,
        easing: animationEasing,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("path", (0, _extends2["default"])({}, (0, _ReactUtils.filterProps)(props, true), {
          className: layerClass,
          d: (0, _RectangleFn.getRectanglePath)(currX, currY, currWidth, currHeight, radius),
          ref: _refNode
        }))
      });
    }
  });
});
exports.Rectangle = Rectangle;
Rectangle.defaultProps = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  // The radius of border
  // The radius of four corners when radius is a number
  // The radius of left-top, right-top, right-bottom, left-bottom when radius is an array
  radius: 0,
  isAnimationActive: false,
  isUpdateAnimationActive: false,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: 'ease'
};
//# sourceMappingURL=Rectangle.js.map