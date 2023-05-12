"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.isInRectangle = exports.Rectangle = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var _uiApi = require("../../uiApi");
var _classnames = _interopRequireDefault(require("classnames"));
var _zhnAnimate = require("../../zhn-animate");
var _ReactUtils = require("../util/ReactUtils");
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
var Rectangle = /*#__PURE__*/function (_PureComponent) {
  (0, _inheritsLoose2["default"])(Rectangle, _PureComponent);
  function Rectangle() {
    var _this;
    _this = _PureComponent.apply(this, arguments) || this;
    _this._refNode = function (node) {
      _this.node = node;
    };
    _this.state = {
      totalLength: -1
    };
    return _this;
  }

  /* eslint-disable  react/no-did-mount-set-state */
  var _proto = Rectangle.prototype;
  _proto.componentDidMount = function componentDidMount() {
    if (this.node && this.node.getTotalLength) {
      try {
        var totalLength = this.node.getTotalLength();
        if (totalLength) {
          this.setState({
            totalLength: totalLength
          });
        }
      } catch (err) {
        // calculate total length error
      }
    }
  };
  _proto.render = function render() {
    var _this2 = this;
    var _this$props = this.props,
      x = _this$props.x,
      y = _this$props.y,
      width = _this$props.width,
      height = _this$props.height,
      radius = _this$props.radius,
      className = _this$props.className,
      totalLength = this.state.totalLength,
      _this$props2 = this.props,
      animationEasing = _this$props2.animationEasing,
      animationDuration = _this$props2.animationDuration,
      animationBegin = _this$props2.animationBegin,
      isAnimationActive = _this$props2.isAnimationActive,
      isUpdateAnimationActive = _this$props2.isUpdateAnimationActive;
    if (x !== +x || y !== +y || width !== +width || height !== +height || width === 0 || height === 0) {
      return null;
    }
    var layerClass = (0, _classnames["default"])(CL_RESTANGLE, className);
    if (!isUpdateAnimationActive) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("path", (0, _extends2["default"])({}, (0, _ReactUtils.filterProps)(this.props, true), {
        className: layerClass,
        d: getRectanglePath(x, y, width, height, radius)
      }));
    }
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_zhnAnimate.Animate, {
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
      isActive: isUpdateAnimationActive,
      children: function children(_ref) {
        var currWidth = _ref.width,
          currHeight = _ref.height,
          currX = _ref.x,
          currY = _ref.y;
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_zhnAnimate.Animate, {
          canBegin: totalLength > 0,
          from: "0px " + (totalLength === -1 ? 1 : totalLength) + "px",
          to: totalLength + "px 0px",
          attributeName: "strokeDasharray",
          begin: animationBegin,
          duration: animationDuration,
          isActive: isAnimationActive,
          easing: animationEasing,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("path", (0, _extends2["default"])({}, (0, _ReactUtils.filterProps)(_this2.props, true), {
            className: layerClass,
            d: getRectanglePath(currX, currY, currWidth, currHeight, radius),
            ref: _this2._refNode
          }))
        });
      }
    });
  };
  return Rectangle;
}(_uiApi.PureComponent);
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