"use strict";

exports.__esModule = true;
exports.CartesianGridVerticalLines = exports.CartesianGridHorizontalLines = void 0;
var _jsxRuntime = require("react/jsx-runtime");
const _fCartesianGridLines = crLineProps => props => /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
    className: props.className,
    children: props.points.map((entry, i) => /*#__PURE__*/(0, _jsxRuntime.jsx)("line", {
      ...props.props,
      ...crLineProps(props, entry)
    }, `line-${i}`))
  }),
  _crLineProps = (x1, y1, x2, y2) => ({
    x1,
    y1,
    x2,
    y2
  }),
  _crHorizontalLineProps = (props, entry) => _crLineProps(props.x1, entry, props.x2, entry),
  _crVerticalLineProps = (props, entry) => _crLineProps(entry, props.y1, entry, props.y2);
const CartesianGridHorizontalLines = exports.CartesianGridHorizontalLines = _fCartesianGridLines(_crHorizontalLineProps);
const CartesianGridVerticalLines = exports.CartesianGridVerticalLines = _fCartesianGridLines(_crVerticalLineProps);
//# sourceMappingURL=CartesianGridLines.js.map