"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.CartesianGrid = void 0;
var _uiApi = require("../../uiApi");
var _DataUtils = require("../util/DataUtils");
var _ReactUtils = require("../util/ReactUtils");
var _CartesianGridRenderFn = require("./CartesianGridRenderFn");
var _CartesianGridBackground = _interopRequireDefault(require("./CartesianGridBackground"));
var _CartesianGridHorizontalLines = _interopRequireDefault(require("./CartesianGridHorizontalLines"));
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
const DF_PROPS = {
  horizontal: true,
  vertical: true,
  // The ordinates of horizontal grid lines
  horizontalPoints: [],
  // The abscissas of vertical grid lines
  verticalPoints: [],
  stroke: '#ccc',
  fill: 'none',
  // The fill of colors of grid lines
  verticalFill: [],
  horizontalFill: []
};
const CartesianGrid = exports.CartesianGrid = (0, _uiApi.memo)(props => {
  const _props = (0, _ReactUtils.crProps)(DF_PROPS, props),
    {
      x,
      y,
      width,
      height,
      horizontal,
      vertical
    } = _props;
  if (!((0, _DataUtils.isPositiveNumber)(width) && (0, _DataUtils.isPositiveNumber)(height) && (0, _DataUtils.isNumber)(x) && (0, _DataUtils.isNumber)(y))) {
    return null;
  }
  const [horizontalPoints, verticalPoints] = (0, _CartesianGridRenderFn.crGridPoints)(_props);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("g", {
    className: _CL.CL_CARTESIAN_GRID,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CartesianGridBackground.default, {
      className: _CL.CL_BG,
      fill: _props.fill,
      fillOpacity: _props.fillOpacity,
      x: _props.x,
      y: _props.y,
      width: _props.width,
      height: _props.height
    }), horizontal && /*#__PURE__*/(0, _jsxRuntime.jsx)(_CartesianGridHorizontalLines.default, {
      className: _CL.CL_GRID_HORIZONTAL,
      x: _props.x,
      width: _props.width,
      points: horizontalPoints,
      props: _props
    }), vertical && (0, _CartesianGridRenderFn.renderVertical)(verticalPoints, _props), horizontal && (0, _CartesianGridRenderFn.renderHorizontalStripes)(horizontalPoints, _props), vertical && (0, _CartesianGridRenderFn.renderVerticalStripes)(verticalPoints, _props)]
  });
});
CartesianGrid.displayName = 'CartesianGrid';
//# sourceMappingURL=CartesianGrid.js.map