'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SettingsDialog = require('./SettingsDialog');

var _SettingsDialog2 = _interopRequireDefault(_SettingsDialog);

var _ErrorDialog = require('./ErrorDialog');

var _ErrorDialog2 = _interopRequireDefault(_ErrorDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Router = {
  SETTINGS: _SettingsDialog2.default,
  ERROR: _ErrorDialog2.default
};

exports.default = Router;
//# sourceMappingURL=Router.js.map