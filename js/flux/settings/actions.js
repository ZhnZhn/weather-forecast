"use strict";

exports.__esModule = true;
exports["default"] = exports.setApiKey = exports.setSettings = exports.ACTION = void 0;
var ACTION = {
  SETTINGS_SET: 'SETTINGS_SET',
  SETTINGS_SET_APIKEY: 'SETTINGS_SET_APIKEY'
};
exports.ACTION = ACTION;

var setSettings = function setSettings(apiKey) {
  return {
    type: ACTION.SETTINGS_SET,
    apiKey: apiKey
  };
};

exports.setSettings = setSettings;

var setApiKey = function setApiKey() {
  return {
    type: ACTION.SETTINGS_SET_APIKEY
  };
};

exports.setApiKey = setApiKey;
var actions = {
  setSettings: setSettings,
  setApiKey: setApiKey
};
var _default = actions;
exports["default"] = _default;
//# sourceMappingURL=actions.js.map