"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.Rectangle = void 0;
var _uiApi = require("../../uiApi");
var _crCn = _interopRequireDefault(require("../../zhn-utils/crCn"));
var _zhnAnimate = require("../../zhn-animate");
var _ReactUtils = require("../util/ReactUtils");
var _FnUtils = require("../util/FnUtils");
var _CL = require("../CL");
var _RectangleFn = require("./RectangleFn");
var _jsxRuntime = require("react/jsx-runtime");
const DF_PROPS = {
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
const Rectangle = exports.Rectangle = (0, _uiApi.memo)(props => {
  const _refNode = (0, _uiApi.useRef)(),
    [totalLength, setTotalLength] = (0, _uiApi.useState)(-1);
  (0, _uiApi.useEffect)(() => {
    const _el = (0, _uiApi.getRefValue)(_refNode);
    if (_el && (0, _FnUtils._isFn)(_el.getTotalLength)) {
      try {
        const totalLength = _el.getTotalLength();
        if (totalLength) {
          setTotalLength(totalLength);
        }
      } catch (err) {
        // calculate total length error
      }
    }
  }, []);
  const _props = (0, _ReactUtils.crProps)(DF_PROPS, props),
    {
      x,
      y,
      width,
      height,
      radius,
      className,
      animationEasing,
      animationDuration,
      animationBegin,
      isAnimationActive,
      isUpdateAnimationActive
    } = _props;
  if (x !== +x || y !== +y || width !== +width || height !== +height || width === 0 || height === 0) {
    return null;
  }
  const layerClass = (0, _crCn.default)(_CL.CL_RESTANGLE, className);
  return isUpdateAnimationActive ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_zhnAnimate.Animate, {
    isActive: isUpdateAnimationActive,
    canBegin: totalLength > 0,
    from: {
      width,
      height,
      x,
      y
    },
    to: {
      width,
      height,
      x,
      y
    },
    duration: animationDuration,
    animationEasing: animationEasing,
    children: _ref => {
      let {
        width: currWidth,
        height: currHeight,
        x: currX,
        y: currY
      } = _ref;
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_zhnAnimate.Animate, {
        isActive: isAnimationActive,
        canBegin: totalLength > 0,
        from: "0px " + (totalLength === -1 ? 1 : totalLength) + "px",
        to: totalLength + "px 0px",
        attributeName: "strokeDasharray",
        begin: animationBegin,
        duration: animationDuration,
        easing: animationEasing,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
          ...(0, _ReactUtils.filterProps)(_props, true),
          className: layerClass,
          d: (0, _RectangleFn.getRectanglePath)(currX, currY, currWidth, currHeight, radius),
          ref: _refNode
        })
      });
    }
  }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    ...(0, _ReactUtils.filterProps)(_props, true),
    className: layerClass,
    d: (0, _RectangleFn.getRectanglePath)(x, y, width, height, radius)
  });
});
//# sourceMappingURL=Rectangle.js.map