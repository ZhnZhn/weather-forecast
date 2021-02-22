"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("../_react"));

var _ThemeContext = _interopRequireDefault(require("../hoc/ThemeContext"));

var useContext = _react["default"].useContext;

var useTheme = function useTheme(styleConfig) {
  return useContext(_ThemeContext["default"]).createStyle(styleConfig);
};

var _default = useTheme;
exports["default"] = _default;
//# sourceMappingURL=useTheme.js.map