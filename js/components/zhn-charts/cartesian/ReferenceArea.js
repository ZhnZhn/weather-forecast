"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.ReferenceArea = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _classnames = _interopRequireDefault(require("classnames"));
var _Layer = require("../container/Layer");
var _Label = require("../component/Label");
var _CartesianUtils = require("../util/CartesianUtils");
var _IfOverflowMatches = require("../util/IfOverflowMatches");
var _DataUtils = require("../util/DataUtils");
var _Rectangle = require("../shape/Rectangle");
var _ReactUtils = require("../util/ReactUtils");
var _cartesianFn = require("./cartesianFn");
var _jsxRuntime = require("react/jsx-runtime");
var CL_REFERENCE_AREA = 'recharts-reference-area',
  CL_REFERENCE_AREA_RECT = CL_REFERENCE_AREA + "-rect",
  DISCARD = 'discard';
var getRect = function getRect(hasX1, hasX2, hasY1, hasY2, props) {
  var xValue1 = props.x1,
    xValue2 = props.x2,
    yValue1 = props.y1,
    yValue2 = props.y2,
    xAxis = props.xAxis,
    yAxis = props.yAxis;
  if (!xAxis || !yAxis) {
    return null;
  }
  var scales = (0, _CartesianUtils.createLabeledScales)({
      x: xAxis.scale,
      y: yAxis.scale
    }),
    p1 = {
      x: hasX1 ? scales.x.apply(xValue1, {
        position: 'start'
      }) : scales.x.rangeMin,
      y: hasY1 ? scales.y.apply(yValue1, {
        position: 'start'
      }) : scales.y.rangeMin
    },
    p2 = {
      x: hasX2 ? scales.x.apply(xValue2, {
        position: 'end'
      }) : scales.x.rangeMax,
      y: hasY2 ? scales.y.apply(yValue2, {
        position: 'end'
      }) : scales.y.rangeMax
    };
  return (0, _IfOverflowMatches.ifOverflowMatches)(props, DISCARD) && (!scales.isInRange(p1) || !scales.isInRange(p2)) ? null : (0, _CartesianUtils.rectWithPoints)(p1, p2);
};
var ReferenceArea = function ReferenceArea(props) {
  var x1 = props.x1,
    x2 = props.x2,
    y1 = props.y1,
    y2 = props.y2,
    className = props.className,
    shape = props.shape,
    hasX1 = (0, _DataUtils.isNumOrStr)(x1),
    hasX2 = (0, _DataUtils.isNumOrStr)(x2),
    hasY1 = (0, _DataUtils.isNumOrStr)(y1),
    hasY2 = (0, _DataUtils.isNumOrStr)(y2);
  if (!hasX1 && !hasX2 && !hasY1 && !hasY2 && !shape) {
    return null;
  }
  var rect = getRect(hasX1, hasX2, hasY1, hasY2, props);
  if (!rect && !shape) {
    return null;
  }
  var clipPath = (0, _cartesianFn.crClipPathIdIf)(props);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Layer.Layer, {
    className: (0, _classnames["default"])(CL_REFERENCE_AREA, className),
    children: [ReferenceArea.renderRect(shape, (0, _extends2["default"])({
      clipPath: clipPath
    }, (0, _ReactUtils.filterProps)(props, true), rect)), _Label.Label.renderCallByParent(props, rect)]
  });
};
exports.ReferenceArea = ReferenceArea;
ReferenceArea.displayName = 'ReferenceArea';
ReferenceArea.defaultProps = {
  isFront: false,
  ifOverflow: DISCARD,
  xAxisId: 0,
  yAxisId: 0,
  r: 10,
  fill: '#ccc',
  fillOpacity: 0.5,
  stroke: 'none',
  strokeWidth: 1
};
var _crRectangleElement = function _crRectangleElement(props) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Rectangle.Rectangle, (0, _extends2["default"])({}, props, {
    className: CL_REFERENCE_AREA_RECT
  }));
};
ReferenceArea.renderRect = (0, _cartesianFn.fCreateElement)(_crRectangleElement);
//# sourceMappingURL=ReferenceArea.js.map