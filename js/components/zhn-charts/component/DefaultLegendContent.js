"use strict";

exports.__esModule = true;
exports.DefaultLegendContent = void 0;
var _uiApi = require("../../uiApi");
var _DefaultLegendContentFn = require("./DefaultLegendContentFn");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
const DefaultLegendContent = (0, _uiApi.memo)(props => {
  const {
    payload,
    layout,
    align
  } = props;
  if (!payload || !payload.length) {
    return null;
  }
  const finalStyle = {
    padding: 0,
    margin: 0,
    textAlign: layout === 'horizontal' ? align : 'left'
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("ul", {
    className: _CL.CL_DF_LEGEND,
    style: finalStyle,
    children: (0, _DefaultLegendContentFn.renderItems)(props)
  });
});
exports.DefaultLegendContent = DefaultLegendContent;
DefaultLegendContent.displayName = 'Legend';
DefaultLegendContent.defaultProps = {
  iconSize: 14,
  layout: 'horizontal',
  align: 'center',
  verticalAlign: 'middle',
  inactiveColor: '#ccc'
};
//# sourceMappingURL=DefaultLegendContent.js.map