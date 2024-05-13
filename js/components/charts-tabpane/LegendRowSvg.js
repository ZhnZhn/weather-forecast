"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _LegendCellSvg = _interopRequireDefault(require("./LegendCellSvg"));
var _Label = require("./Label.Style");
var _jsxRuntime = require("react/jsx-runtime");
const _crLabelStyle = function (is, style) {
  if (style === void 0) {
    style = _Label.S_SERIA;
  }
  return is ? {
    ...style,
    ..._Label.S_FILTERED
  } : style;
};
const _crTitle = id => id.length < 4 ? id.toUpperCase() : id[0].toUpperCase() + id.slice(1);
const DF_NOT_IS = Object.create(null);
const LegendRowSvg = _ref => {
  let {
    style,
    configs,
    notIs = DF_NOT_IS,
    filtered,
    onFilter
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: style,
    children: configs.map(_ref2 => {
      let {
        id,
        title,
        titleStyle,
        svgType,
        svgStyle
      } = _ref2;
      return notIs[id] ? null : /*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendCellSvg.default, {
        title: title || _crTitle(id),
        titleStyle: _crLabelStyle(filtered[id], titleStyle),
        svgType: svgType,
        svgStyle: svgStyle,
        onClick: () => onFilter(id)
      }, id);
    })
  });
};
var _default = exports.default = LegendRowSvg;
//# sourceMappingURL=LegendRowSvg.js.map