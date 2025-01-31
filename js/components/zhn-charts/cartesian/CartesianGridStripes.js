"use strict";

exports.__esModule = true;
exports.CartesianGridVerticalStripes = exports.CartesianGridHorizontalStripes = void 0;
var _CartesianGridRenderFn = require("./CartesianGridRenderFn");
var _jsxRuntime = require("react/jsx-runtime");
const _fCartesianGridStripes = (crLineDimension, crLineProps) => props => /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
    className: props.className,
    children: props.points.map((entry, i) => {
      const lineDimension = crLineDimension(props, entry, i);
      return lineDimension > 0 ? /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
        ...crLineProps(props, entry, lineDimension),
        ...(0, _CartesianGridRenderFn.crStripeRectProps)(props.arrFill, i, props.fillOpacity)
      }, `react-${i}`) : null;
    })
  }),
  _crVerticalStripesLineDimension = (props, entry, i) => (0, _CartesianGridRenderFn.getStripeLineDimension)(props.x0, entry, i, props.points),
  _crStripeProps = (x, y, width, height) => ({
    x,
    y,
    width,
    height
  }),
  _crVerticalStripesProps = (props, entry, lineWidth) => _crStripeProps(entry, props.y, lineWidth, props.height),
  _crHorizontalStripesLineDimension = (props, entry, i) => (0, _CartesianGridRenderFn.getStripeLineDimension)(props.y0, entry, i, props.points),
  _crHorizontalStripesProps = (props, entry, lineHeight) => _crStripeProps(props.x, entry, props.width, lineHeight);
const CartesianGridVerticalStripes = exports.CartesianGridVerticalStripes = _fCartesianGridStripes(_crVerticalStripesLineDimension, _crVerticalStripesProps);
const CartesianGridHorizontalStripes = exports.CartesianGridHorizontalStripes = _fCartesianGridStripes(_crHorizontalStripesLineDimension, _crHorizontalStripesProps);
//# sourceMappingURL=CartesianGridStripes.js.map