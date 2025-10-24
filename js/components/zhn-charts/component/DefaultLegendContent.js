"use strict";

exports.__esModule = true;
exports.DefaultLegendContent = void 0;
var _uiApi = require("../../uiApi");
var _ChartUtils = require("../util/ChartUtils");
var _DefaultLegendContentFn = require("./DefaultLegendContentFn");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
const DF_PROPS = {
  iconSize: 14,
  layout: 'horizontal',
  align: 'center',
  verticalAlign: 'middle',
  inactiveColor: '#ccc'
};
const DefaultLegendContent = exports.DefaultLegendContent = (0, _uiApi.memo)(props => {
  const _props = (0, _uiApi.crProps)(DF_PROPS, props);
  return _props.payload && _props.payload.length ? /*#__PURE__*/(0, _jsxRuntime.jsx)("ul", {
    className: _CL.CL_DF_LEGEND,
    style: {
      padding: 0,
      margin: 0,
      textAlign: (0, _ChartUtils.isLayoutHorizontal)(_props.layout) ? _props.align : 'left'
    },
    children: (0, _DefaultLegendContentFn.renderItems)(_props)
  }) : null;
});
(0, _uiApi.setDisplayNameTo)(DefaultLegendContent, "Legend");
//# sourceMappingURL=DefaultLegendContent.js.map