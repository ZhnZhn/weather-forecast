"use strict";

exports.__esModule = true;
exports.Curve = void 0;
var _isTypeFn = require("../../../utils/isTypeFn");
var _uiApi = require("../../uiApi");
var _styleFn = require("../../styleFn");
var _d3Shape = require("../d3Shape");
var _ChartUtils = require("../util/ChartUtils");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
const defined = p => p.x === +p.x && p.y === +p.y,
  getX = p => p.x,
  getY = p => p.y;

/**
 * Calculate the path of curve
 * @return {String} path
 */
const getPath = _ref => {
  let {
    type,
    points,
    baseLine,
    layout,
    connectNulls
  } = _ref;
  const _isLayoutVertical = (0, _ChartUtils.isLayoutVertical)(layout),
    curveFactory = type || (_isLayoutVertical ? _d3Shape.curveMonotoneY : _d3Shape.curveMonotoneX),
    formatPoints = connectNulls ? points.filter(entry => defined(entry)) : points;
  let lineFunction;
  if ((0, _isTypeFn.isArr)(baseLine)) {
    const formatBaseLine = connectNulls ? baseLine.filter(base => defined(base)) : baseLine,
      areaPoints = formatPoints.map((entry, index) => Object.assign({}, entry, {
        base: formatBaseLine[index]
      }));
    lineFunction = _isLayoutVertical ? (0, _d3Shape.area)().y(getY).x1(getX).x0(d => d.base.x) : (0, _d3Shape.area)().x(getX).y1(getY).y0(d => d.base.y);
    lineFunction.defined(defined).curve(curveFactory);
    return lineFunction(areaPoints);
  }
  if (_isLayoutVertical && (0, _isTypeFn.isNumber)(baseLine)) {
    lineFunction = (0, _d3Shape.area)().y(getY).x1(getX).x0(baseLine);
  } else if ((0, _isTypeFn.isNumber)(baseLine)) {
    lineFunction = (0, _d3Shape.area)().x(getX).y1(getY).y0(baseLine);
  } else {
    lineFunction = (0, _d3Shape.line)().x(getX).y(getY);
  }
  lineFunction.defined(defined).curve(curveFactory);
  return lineFunction(formatPoints);
};
const DF_PROPS = {
  type: 'linear',
  points: [],
  connectNulls: false
};
const Curve = props => {
  const _props = (0, _uiApi.crProps)(DF_PROPS, props),
    {
      points,
      path
    } = _props,
    _d = (0, _isTypeFn.isNotEmptyArr)(points) ? getPath(props) : path;
  return _d ? /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    ref: _props.pathRef,
    fill: _props.fill,
    stroke: _props.stroke,
    strokeWidth: _props.strokeWidth,
    strokeDasharray: _props.strokeDasharray,
    className: (0, _styleFn.crCn)(_CL.CL_CURVE, _props.className),
    d: _d
  }) : null;
};
exports.Curve = Curve;
//# sourceMappingURL=Curve.js.map