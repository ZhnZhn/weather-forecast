"use strict";

exports.__esModule = true;
exports.Rectangle = void 0;
var _isTypeFn = require("../../../utils/isTypeFn");
var _uiApi = require("../../uiApi");
var _styleFn = require("../../styleFn");
var _zhnAnimate = require("../../zhn-animate");
var _util = require("../../zhn-animate/util");
var _DataUtils = require("../util/DataUtils");
var _ReactUtils = require("../util/ReactUtils");
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
const _crAnimationStyle = (isAnimationActive, to, t, transition, from) => !isAnimationActive ? {
  strokeDasharray: to
} : t > 0 ? {
  strokeDasharray: to,
  transition
} : {
  strokeDasharray: from
};
const Rectangle = exports.Rectangle = (0, _uiApi.memo)(props => {
  const _refNode = (0, _uiApi.useRef)(),
    [totalLength, setTotalLength] = (0, _uiApi.useState)(-1);
  (0, _uiApi.useEffect)(() => {
    const _el = (0, _uiApi.getRefValue)(_refNode);
    if (_el && (0, _isTypeFn.isFn)(_el.getTotalLength)) {
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
  const _props = (0, _uiApi.crProps)(DF_PROPS, props),
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
  const prevWidthRef = (0, _uiApi.useRef)(width),
    prevHeightRef = (0, _uiApi.useRef)(height),
    prevXRef = (0, _uiApi.useRef)(x),
    prevYRef = (0, _uiApi.useRef)(y);
  if (x !== +x || y !== +y || width !== +width || height !== +height || width === 0 || height === 0) {
    return null;
  }
  const layerClass = (0, _styleFn.crCn)(_CL.CL_RESTANGLE, className),
    _canBegin = totalLength > 0;
  const prevWidth = (0, _uiApi.getRefValue)(prevWidthRef),
    prevHeight = (0, _uiApi.getRefValue)(prevHeightRef),
    prevX = (0, _uiApi.getRefValue)(prevXRef),
    prevY = (0, _uiApi.getRefValue)(prevYRef);
  const from = `0px ${totalLength === -1 ? 1 : totalLength}px`,
    to = `${totalLength}px 0px`,
    transition = (0, _util.getTransitionVal)(['strokeDasharray'], animationDuration, (0, _isTypeFn.isStr)(animationEasing) ? animationEasing : void 0);
  return isUpdateAnimationActive ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_zhnAnimate.Animate, {
    isActive: isUpdateAnimationActive,
    canBegin: _canBegin,
    duration: animationDuration,
    easing: animationEasing,
    begin: animationBegin,
    children: _ref => {
      let {
        t
      } = _ref;
      const currWidth = (0, _DataUtils.getInterpolatedNumber)(prevWidth, width, t),
        currHeight = (0, _DataUtils.getInterpolatedNumber)(prevHeight, height, t),
        currX = (0, _DataUtils.getInterpolatedNumber)(prevX, x, t),
        currY = (0, _DataUtils.getInterpolatedNumber)(prevY, y, t);
      if ((0, _uiApi.getRefValue)(_refNode)) {
        (0, _uiApi.setRefValue)(prevWidthRef, currWidth);
        (0, _uiApi.setRefValue)(prevHeightRef, currHeight);
        (0, _uiApi.setRefValue)(prevXRef, currX);
        (0, _uiApi.setRefValue)(prevYRef, currY);
      }
      const animationStyle = _crAnimationStyle(isAnimationActive, to, t, transition, from);
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
        ...(0, _ReactUtils.filterProps)(_props, true),
        className: layerClass,
        d: (0, _RectangleFn.getRectanglePath)(currX, currY, currWidth, currHeight, radius),
        ref: _refNode,
        style: {
          ...animationStyle,
          ...props.style
        }
      });
    }
  }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    ...(0, _ReactUtils.filterProps)(_props, true),
    className: layerClass,
    d: (0, _RectangleFn.getRectanglePath)(x, y, width, height, radius)
  });
});
//# sourceMappingURL=Rectangle.js.map