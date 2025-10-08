"use strict";

exports.__esModule = true;
exports.Dot = void 0;
var _uiApi = require("../../uiApi");
var _styleFn = require("../../styleFn");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
//import { adaptEventHandlers } from '../util/types';

const Dot = exports.Dot = (0, _uiApi.memo)(props => {
  const {
    cx,
    cy,
    r
  } = props;
  return cx === +cx && cy === +cy && r === +r ? /*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
    fill: props.fill,
    stroke: props.stroke,
    strokeWidth: props.strokeWidth,
    strokeDasharray: props.strokeDasharray
    //{...adaptEventHandlers(props)}
    ,
    className: (0, _styleFn.crCn)(_CL.CL_DOT, props.className),
    cx: cx,
    cy: cy,
    r: r
  }) : null;
});
//# sourceMappingURL=Dot.js.map