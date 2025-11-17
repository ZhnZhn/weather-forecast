"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.LineCurveStatically = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _Curve = require("../shape/Curve");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["type", "layout", "connectNulls", "ref", "key"];
const LineCurveStatically = _ref => {
  let {
    points,
    clipPath,
    props,
    refPath,
    options
  } = _ref;
  /*eslint-disable no-unused-vars*/
  const {
      type,
      layout,
      connectNulls,
      key
    } = props,
    restProps = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  //ref
  /*eslint-enable no-unused-vars*/
  const curveProps = Object.assign({
    stroke: restProps.stroke,
    strokeWidth: restProps.strokeWidth,
    strokeDasharray: restProps.strokeDasharray,
    radius: restProps.radius,
    width: restProps.width,
    height: restProps.height,
    fill: 'none',
    className: _CL.CL_LINE_CURVE,
    clipPath,
    points
  }, options, {
    type,
    layout,
    connectNulls
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Curve.Curve, Object.assign({}, curveProps, {
    pathRef: refPath
  }), key);
};
exports.LineCurveStatically = LineCurveStatically;
//# sourceMappingURL=LineCurveStatically.js.map