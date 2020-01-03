"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _SettingsDialog = _interopRequireDefault(require("./SettingsDialog"));

var _ErrorDialog = _interopRequireDefault(require("./ErrorDialog"));

var Router = {
  SETTINGS: _SettingsDialog["default"],
  ERROR: _ErrorDialog["default"]
};
var _default = Router;
exports["default"] = _default;
//# sourceMappingURL=Router.js.map