"use strict";

exports.__esModule = true;
exports.default = void 0;
var _arrFn = require("../../utils/arrFn");
var _jsxRuntime = require("react/jsx-runtime");
const CL_SELECT_NONE = 'select-none',
  S_DIV = {
    display: 'inline',
    color: '#795548',
    width: '100%',
    paddingLeft: 8,
    marginBottom: 8,
    borderBottom: '3px solid #795548',
    fontSize: '24px',
    fontWeight: 'bold'
  };
const Caption = props => {
  const {
      city
    } = props.forecast || {},
    {
      name = 'Forecast',
      country
    } = city || {};
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: CL_SELECT_NONE,
    style: {
      ...S_DIV,
      ...props.style
    },
    children: (0, _arrFn.joinByCollon2)(name, country)
  });
};
var _default = exports.default = Caption;
//# sourceMappingURL=Caption.js.map