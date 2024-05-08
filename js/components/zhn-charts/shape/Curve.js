"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.Curve = void 0;
var _crCn = _interopRequireDefault(require("../../zhn-utils/crCn"));
var _d3Shape = require("../d3Shape");
var _FnUtils = require("../util/FnUtils");
var _types = require("../util/types");
var _ReactUtils = require("../util/ReactUtils");
var _DataUtils = require("../util/DataUtils");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
const CURVE_FACTORIES = {
  curveBasisClosed: _d3Shape.curveBasisClosed,
  curveBasisOpen: _d3Shape.curveBasisOpen,
  curveBasis: _d3Shape.curveBasis,
  curveLinearClosed: _d3Shape.curveLinearClosed,
  curveLinear: _d3Shape.curveLinear,
  curveMonotoneX: _d3Shape.curveMonotoneX,
  curveMonotoneY: _d3Shape.curveMonotoneY,
  curveNatural: _d3Shape.curveNatural,
  curveStep: _d3Shape.curveStep,
  curveStepAfter: _d3Shape.curveStepAfter,
  curveStepBefore: _d3Shape.curveStepBefore
};
const _isLayoutVertical = layout => layout === 'vertical';
const defined = p => p.x === +p.x && p.y === +p.y,
  getX = p => p.x,
  getY = p => p.y;
const getCurveFactory = (type, layout) => {
  if ((0, _FnUtils._isFn)(type)) {
    return type;
  }
  const name = "curve" + (0, _FnUtils._upperFirst)(type);
  return name === 'curveMonotone' && layout ? CURVE_FACTORIES["" + name + (_isLayoutVertical(layout) ? 'Y' : 'X')] : CURVE_FACTORIES[name] || _d3Shape.curveLinear;
};

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
  const curveFactory = getCurveFactory(type, layout),
    formatPoints = connectNulls ? points.filter(entry => defined(entry)) : points;
  let lineFunction;
  if ((0, _FnUtils._isArr)(baseLine)) {
    const formatBaseLine = connectNulls ? baseLine.filter(base => defined(base)) : baseLine,
      areaPoints = formatPoints.map((entry, index) => ({
        ...entry,
        base: formatBaseLine[index]
      }));
    lineFunction = _isLayoutVertical(layout) ? (0, _d3Shape.area)().y(getY).x1(getX).x0(d => d.base.x) : (0, _d3Shape.area)().x(getX).y1(getY).y0(d => d.base.y);
    lineFunction.defined(defined).curve(curveFactory);
    return lineFunction(areaPoints);
  }
  if (_isLayoutVertical(layout) && (0, _DataUtils.isNumber)(baseLine)) {
    lineFunction = (0, _d3Shape.area)().y(getY).x1(getX).x0(baseLine);
  } else if ((0, _DataUtils.isNumber)(baseLine)) {
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
  const _props = (0, _ReactUtils.crProps)(DF_PROPS, props),
    {
      className,
      points,
      path,
      pathRef
    } = _props;
  return (!points || !points.length) && !path ? null : /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    ...(0, _ReactUtils.filterProps)(_props),
    ...(0, _types.adaptEventHandlers)(_props),
    className: (0, _crCn.default)(_CL.CL_CURVE, className),
    d: points && points.length ? getPath(props) : path,
    ref: pathRef
  });
};
exports.Curve = Curve;
//# sourceMappingURL=Curve.js.map