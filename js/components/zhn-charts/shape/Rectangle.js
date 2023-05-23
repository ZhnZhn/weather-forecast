"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.isInRectangle = exports.Rectangle = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _uiApi = require("../../uiApi");
var _classnames = _interopRequireDefault(require("classnames"));
var _zhnAnimate = require("../../zhn-animate");
var _ReactUtils = require("../util/ReactUtils");
var _FnUtils = require("../util/FnUtils");
var _jsxRuntime = require("react/jsx-runtime");
var CL_RESTANGLE = 'recharts-rectangle';
var getRectanglePath = function getRectanglePath(x, y, width, height, radius) {
  var maxRadius = Math.min(Math.abs(width) / 2, Math.abs(height) / 2),
    ySign = height >= 0 ? 1 : -1,
    xSign = width >= 0 ? 1 : -1,
    clockWise = height >= 0 && width >= 0 || height < 0 && width < 0 ? 1 : 0;
  var path;
  if (maxRadius > 0 && radius instanceof Array) {
    var newRadius = [0, 0, 0, 0];
    for (var i = 0, len = 4; i < len; i++) {
      newRadius[i] = radius[i] > maxRadius ? maxRadius : radius[i];
    }
    path = "M" + x + "," + (y + ySign * newRadius[0]);
    if (newRadius[0] > 0) {
      path += "A " + newRadius[0] + "," + newRadius[0] + ",0,0," + clockWise + "," + (x + xSign * newRadius[0]) + "," + y;
    }
    path += "L " + (x + width - xSign * newRadius[1]) + "," + y;
    if (newRadius[1] > 0) {
      path += "A " + newRadius[1] + "," + newRadius[1] + ",0,0," + clockWise + ",\n    " + (x + width) + "," + (y + ySign * newRadius[1]);
    }
    path += "L " + (x + width) + "," + (y + height - ySign * newRadius[2]);
    if (newRadius[2] > 0) {
      path += "A " + newRadius[2] + "," + newRadius[2] + ",0,0," + clockWise + ",\n    " + (x + width - xSign * newRadius[2]) + "," + (y + height);
    }
    path += "L " + (x + xSign * newRadius[3]) + "," + (y + height);
    if (newRadius[3] > 0) {
      path += "A " + newRadius[3] + "," + newRadius[3] + ",0,0," + clockWise + ",\n    " + x + "," + (y + height - ySign * newRadius[3]);
    }
    path += 'Z';
  } else if (maxRadius > 0 && radius === +radius && radius > 0) {
    var _newRadius = Math.min(maxRadius, radius);
    path = "M " + x + "," + (y + ySign * _newRadius) + "\n        A " + _newRadius + "," + _newRadius + ",0,0," + clockWise + "," + (x + xSign * _newRadius) + "," + y + "\n        L " + (x + width - xSign * _newRadius) + "," + y + "\n        A " + _newRadius + "," + _newRadius + ",0,0," + clockWise + "," + (x + width) + "," + (y + ySign * _newRadius) + "\n        L " + (x + width) + "," + (y + height - ySign * _newRadius) + "\n        A " + _newRadius + "," + _newRadius + ",0,0," + clockWise + "," + (x + width - xSign * _newRadius) + "," + (y + height) + "\n        L " + (x + xSign * _newRadius) + "," + (y + height) + "\n        A " + _newRadius + "," + _newRadius + ",0,0," + clockWise + "," + x + "," + (y + height - ySign * _newRadius) + " Z";
  } else {
    path = "M " + x + "," + y + " h " + width + " v " + height + " h " + -width + " Z";
  }
  return path;
};
var isInRectangle = function isInRectangle(point, rect) {
  if (!point || !rect) {
    return false;
  }
  var px = point.x,
    py = point.y,
    x = rect.x,
    y = rect.y,
    width = rect.width,
    height = rect.height;
  if (Math.abs(width) > 0 && Math.abs(height) > 0) {
    var minX = Math.min(x, x + width),
      maxX = Math.max(x, x + width),
      minY = Math.min(y, y + height),
      maxY = Math.max(y, y + height);
    return px >= minX && px <= maxX && py >= minY && py <= maxY;
  }
  return false;
};
exports.isInRectangle = isInRectangle;
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
      d: getRectanglePath(x, y, width, height, radius)
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
          d: getRectanglePath(currX, currY, currWidth, currHeight, radius),
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