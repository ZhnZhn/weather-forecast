"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _LegendCellSvg = _interopRequireDefault(require("./LegendCellSvg"));

var _Label = _interopRequireDefault(require("./Label.Style"));

var _jsxRuntime = require("react/jsx-runtime");

var _crLabelStyle = function _crLabelStyle(is, style) {
  if (style === void 0) {
    style = _Label["default"].SERIA;
  }

  return is ? (0, _extends2["default"])({}, style, _Label["default"].FILTERED) : style;
};

var _crTitle = function _crTitle(id) {
  return id.length < 4 ? id.toUpperCase() : id[0].toUpperCase() + id.substring(1);
};

var DF_NOT_IS = Object.create(null);

var LegendRowSvg = function LegendRowSvg(_ref) {
  var style = _ref.style,
      configs = _ref.configs,
      _ref$notIs = _ref.notIs,
      notIs = _ref$notIs === void 0 ? DF_NOT_IS : _ref$notIs,
      filtered = _ref.filtered,
      onFilter = _ref.onFilter;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: style,
    children: configs.map(function (_ref2) {
      var id = _ref2.id,
          title = _ref2.title,
          titleStyle = _ref2.titleStyle,
          svgType = _ref2.svgType,
          svgStyle = _ref2.svgStyle;
      return notIs[id] ? null : /*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendCellSvg["default"], {
        title: title || _crTitle(id),
        titleStyle: _crLabelStyle(filtered[id], titleStyle),
        svgType: svgType,
        svgStyle: svgStyle,
        onClick: function onClick() {
          return onFilter(id);
        }
      }, id);
    })
  });
};

var _default = LegendRowSvg;
exports["default"] = _default;
//# sourceMappingURL=LegendRowSvg.js.map