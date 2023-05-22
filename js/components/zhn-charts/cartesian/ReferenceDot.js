"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.ReferenceDot = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _classnames = _interopRequireDefault(require("classnames"));
var _Layer = require("../container/Layer");
var _Dot = require("../shape/Dot");
var _Label = require("../component/Label");
var _DataUtils = require("../util/DataUtils");
var _IfOverflowMatches = require("../util/IfOverflowMatches");
var _CartesianUtils = require("../util/CartesianUtils");
var _ReactUtils = require("../util/ReactUtils");
var _cartesianFn = require("./cartesianFn");
var _jsxRuntime = require("react/jsx-runtime");
var CL_REFERENCE_DOT = 'recharts-reference-dot',
  CL_REFERENCE_DOT_DOT = CL_REFERENCE_DOT + "-dot",
  DISCARD = 'discard';
var getCoordinate = function getCoordinate(props) {
  var x = props.x,
    y = props.y,
    xAxis = props.xAxis,
    yAxis = props.yAxis,
    scales = (0, _CartesianUtils.createLabeledScales)({
      x: xAxis.scale,
      y: yAxis.scale
    }),
    result = scales.apply({
      x: x,
      y: y
    }, {
      bandAware: true
    });
  return (0, _IfOverflowMatches.ifOverflowMatches)(props, DISCARD) && !scales.isInRange(result) ? null : result;
};
var ReferenceDot = function ReferenceDot(props) {
  var x = props.x,
    y = props.y,
    r = props.r,
    isX = (0, _DataUtils.isNumOrStr)(x),
    isY = (0, _DataUtils.isNumOrStr)(y);
  if (!isX || !isY) {
    return null;
  }
  var coordinate = getCoordinate(props);
  if (!coordinate) {
    return null;
  }
  var cx = coordinate.x,
    cy = coordinate.y,
    shape = props.shape,
    className = props.className,
    clipPath = (0, _cartesianFn.crClipPathIdIf)(props),
    dotProps = (0, _extends2["default"])({
      clipPath: clipPath
    }, (0, _ReactUtils.filterProps)(props, true), {
      cx: cx,
      cy: cy
    });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Layer.Layer, {
    className: (0, _classnames["default"])(CL_REFERENCE_DOT, className),
    children: [ReferenceDot.renderDot(shape, dotProps), _Label.Label.renderCallByParent(props, {
      x: cx - r,
      y: cy - r,
      width: 2 * r,
      height: 2 * r
    })]
  });
};
exports.ReferenceDot = ReferenceDot;
ReferenceDot.displayName = 'ReferenceDot';
ReferenceDot.defaultProps = {
  isFront: false,
  ifOverflow: DISCARD,
  xAxisId: 0,
  yAxisId: 0,
  r: 10,
  fill: '#fff',
  stroke: '#ccc',
  fillOpacity: 1,
  strokeWidth: 1
};
var _crDotElement = function _crDotElement(props) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Dot.Dot, (0, _extends2["default"])({}, props, {
    cx: props.cx,
    cy: props.cy,
    className: CL_REFERENCE_DOT_DOT
  }));
};
ReferenceDot.renderDot = (0, _cartesianFn.fCreateElement)(_crDotElement);
//# sourceMappingURL=ReferenceDot.js.map