"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.Curve = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _d3Shape = require("d3-shape");
var _classnames = _interopRequireDefault(require("classnames"));
var _FnUtils = require("../util/FnUtils");
var _types = require("../util/types");
var _ReactUtils = require("../util/ReactUtils");
var _DataUtils = require("../util/DataUtils");
var _jsxRuntime = require("react/jsx-runtime");
var CL_CURVE = 'recharts-curve';
var CURVE_FACTORIES = {
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
var defined = function defined(p) {
    return p.x === +p.x && p.y === +p.y;
  },
  getX = function getX(p) {
    return p.x;
  },
  getY = function getY(p) {
    return p.y;
  };
var getCurveFactory = function getCurveFactory(type, layout) {
  if ((0, _FnUtils._isFn)(type)) {
    return type;
  }
  var name = "curve" + (0, _FnUtils._upperFirst)(type);
  if (name === 'curveMonotone' && layout) {
    return CURVE_FACTORIES["" + name + (layout === 'vertical' ? 'Y' : 'X')];
  }
  return CURVE_FACTORIES[name] || _d3Shape.curveLinear;
};

/**
 * Calculate the path of curve
 * @return {String} path
 */
var getPath = function getPath(_ref) {
  var type = _ref.type,
    points = _ref.points,
    baseLine = _ref.baseLine,
    layout = _ref.layout,
    connectNulls = _ref.connectNulls;
  var curveFactory = getCurveFactory(type, layout),
    formatPoints = connectNulls ? points.filter(function (entry) {
      return defined(entry);
    }) : points;
  var lineFunction;
  if ((0, _FnUtils._isArr)(baseLine)) {
    var formatBaseLine = connectNulls ? baseLine.filter(function (base) {
        return defined(base);
      }) : baseLine,
      areaPoints = formatPoints.map(function (entry, index) {
        return (0, _extends2["default"])({}, entry, {
          base: formatBaseLine[index]
        });
      });
    lineFunction = layout === 'vertical' ? (0, _d3Shape.area)().y(getY).x1(getX).x0(function (d) {
      return d.base.x;
    }) : (0, _d3Shape.area)().x(getX).y1(getY).y0(function (d) {
      return d.base.y;
    });
    lineFunction.defined(defined).curve(curveFactory);
    return lineFunction(areaPoints);
  }
  if (layout === 'vertical' && (0, _DataUtils.isNumber)(baseLine)) {
    lineFunction = (0, _d3Shape.area)().y(getY).x1(getX).x0(baseLine);
  } else if ((0, _DataUtils.isNumber)(baseLine)) {
    lineFunction = (0, _d3Shape.area)().x(getX).y1(getY).y0(baseLine);
  } else {
    lineFunction = (0, _d3Shape.line)().x(getX).y(getY);
  }
  lineFunction.defined(defined).curve(curveFactory);
  return lineFunction(formatPoints);
};
var Curve = function Curve(props) {
  var className = props.className,
    points = props.points,
    path = props.path,
    pathRef = props.pathRef;
  if ((!points || !points.length) && !path) {
    return null;
  }
  var realPath = points && points.length ? getPath(props) : path;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("path", (0, _extends2["default"])({}, (0, _ReactUtils.filterProps)(props), (0, _types.adaptEventHandlers)(props), {
    className: (0, _classnames["default"])(CL_CURVE, className),
    d: realPath,
    ref: pathRef
  }));
};
exports.Curve = Curve;
Curve.defaultProps = {
  type: 'linear',
  points: [],
  connectNulls: false
};
//# sourceMappingURL=Curve.js.map