"use strict";

exports.__esModule = true;
exports.LineCurveStatically = void 0;
var _ReactUtils = require("../util/ReactUtils");
var _Curve = require("../shape/Curve");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
const LineCurveStatically = _ref => {
  let {
    points,
    clipPathProps,
    props,
    refPath,
    options
  } = _ref;
  /*eslint-disable no-unused-vars*/
  const {
    type,
    layout,
    connectNulls,
    ref,
    key,
    ...restProps
  } = props;
  //ref
  /*eslint-enable no-unused-vars*/
  const curveProps = {
    ...(0, _ReactUtils.filterProps)(restProps, true),
    fill: 'none',
    className: _CL.CL_LINE_CURVE,
    ...clipPathProps,
    points,
    ...options,
    type,
    layout,
    connectNulls
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Curve.Curve, {
    ...curveProps,
    pathRef: refPath
  }, key);
};
exports.LineCurveStatically = LineCurveStatically;
//# sourceMappingURL=LineCurveStatically.js.map