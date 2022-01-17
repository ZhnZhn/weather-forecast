"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _LegendCellCircle = _interopRequireDefault(require("./LegendCellCircle"));

var _Label = _interopRequireDefault(require("./Label.Style"));

var _jsxRuntime = require("react/jsx-runtime");

var _crLabelStyle = function _crLabelStyle(is, style) {
  if (style === void 0) {
    style = _Label["default"].SERIA;
  }

  return is ? (0, _extends2["default"])({}, style, _Label["default"].FILTERED) : style;
};

var LegendRowCircle = function LegendRowCircle(_ref) {
  var style = _ref.style,
      configs = _ref.configs,
      filtered = _ref.filtered,
      onFilter = _ref.onFilter;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: style,
    children: configs.map(function (_ref2) {
      var id = _ref2.id,
          title = _ref2.title,
          tStyle = _ref2.tStyle,
          cStyle = _ref2.cStyle;
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendCellCircle["default"], {
        title: title || id.toUpperCase(),
        titleStyle: _crLabelStyle(filtered[id], tStyle),
        circleStyle: cStyle,
        onClick: function onClick() {
          return onFilter(id);
        }
      }, id);
    })
  });
};

var _default = LegendRowCircle;
exports["default"] = _default;
//# sourceMappingURL=LegendRowCircle.js.map