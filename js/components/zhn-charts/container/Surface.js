"use strict";

exports.__esModule = true;
exports.Surface = void 0;
var _styleFn = require("../../styleFn");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
//import { filterProps } from '../util/ReactUtils';

const _crViewBox = _ref => {
  let {
    x,
    y,
    width,
    height
  } = _ref;
  return `${x} ${y} ${width} ${height}`;
};
const Surface = props => {
  const {
      children,
      width,
      height,
      viewBox,
      className,
      style
      //...restProps
    } = props,
    svgView = viewBox || {
      x: 0,
      y: 0,
      width,
      height
    };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("svg", {
    //{...filterProps(restProps, true, 'svg')}
    className: (0, _styleFn.crCn)(_CL.CL_RECHARTS_SURFACE, className),
    width: width,
    height: height,
    style: style,
    viewBox: _crViewBox(svgView),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("title", {
      children: props.title
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("desc", {
      children: props.desc
    }), children]
  });
};
exports.Surface = Surface;
//# sourceMappingURL=Surface.js.map